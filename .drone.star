OWNCLOUDCI_ALPINE = "owncloudci/alpine:latest"
OWNCLOUDCI_NODEJS = "owncloudci/nodejs:16"

def main(ctx):
    stages = [
        changelog(ctx),
        build_stages(ctx),
    ]

    return stages

def build_stages(ctx):
    sonar_env = {
        "SONAR_TOKEN": {
            "from_secret": "sonar_token",
        },
    }
    if ctx.build.event == "pull_request":
        sonar_env.update({
            "SONAR_PULL_REQUEST_BASE": "%s" % (ctx.build.target),
            "SONAR_PULL_REQUEST_BRANCH": "%s" % (ctx.build.source),
            "SONAR_PULL_REQUEST_KEY": "%s" % (ctx.build.ref.replace("refs/pull/", "").split("/")[0]),
        })

    repo_slug = ctx.build.source_repo if ctx.build.source_repo else ctx.repo.slug

    lint_test_build = [
        {
            "name": "clone",
            "image": OWNCLOUDCI_ALPINE,
            "commands": [
                "git clone https://github.com/%s.git ." % (repo_slug),
                "git checkout $DRONE_COMMIT",
            ],
        },
        {
            "name": "dependencies",
            "image": OWNCLOUDCI_NODEJS,
            "commands": [
                "yarn install --immutable",
            ],
            "depends_on": ["clone"],
        },
        {
            "name": "eslint",
            "image": OWNCLOUDCI_NODEJS,
            "commands": [
                "yarn lint:eslint",
            ],
            "depends_on": ["dependencies"],
        },
        {
            "name": "stylelint",
            "image": OWNCLOUDCI_NODEJS,
            "commands": [
                "yarn lint:stylelint",
            ],
            "depends_on": ["dependencies"],
        },
        {
            "name": "unit tests",
            "image": OWNCLOUDCI_NODEJS,
            "commands": [
                "yarn run tokens",
                "yarn test",
            ],
            "depends_on": ["eslint", "stylelint"],
        },
        {
            "name": "sonarcloud",
            "image": "sonarsource/sonar-scanner-cli:latest",
            "environment": sonar_env,
            "depends_on": ["unit tests"],
        },
        {
            "name": "build docs",
            "image": OWNCLOUDCI_NODEJS,
            "commands": [
                "yarn build:docs",
            ],
            "depends_on": ["unit tests"],
        },
        {
            "name": "build system",
            "image": OWNCLOUDCI_NODEJS,
            "commands": [
                "yarn build:system",
            ],
            "depends_on": ["unit tests"],
        },
    ]

    release_steps = [
        {
            "name": "publish-docs",
            "image": "plugins/gh-pages:1",
            "settings": {
                "username": {
                    "from_secret": "github_username",
                },
                "password": {
                    "from_secret": "github_token",
                },
                "pages_directory": "dist/docs",
            },
            "depends_on": ["build docs", "build system"],
        },
        {
            "name": "publish-system",
            "image": "plugins/npm:1",
            "settings": {
                "username": {
                    "from_secret": "npm_username",
                },
                "email": {
                    "from_secret": "npm_email",
                },
                "token": {
                    "from_secret": "npm_token",
                },
            },
            "depends_on": ["build docs", "build system"],
        },
        {
            "name": "changelog",
            "image": "toolhippie/calens:latest",
            "commands": [
                "mkdir tmp",
                "calens --version %s -o tmp/CHANGELOG.md" % ctx.build.ref.replace(
                    "refs/tags/v",
                    "",
                ).split("-")[0],
            ],
            "depends_on": ["publish-docs", "publish-system"],
        },
        {
            "name": "release",
            "image": "plugins/github-release:1",
            "settings": {
                "api_key": {
                    "from_secret": "github_token",
                },
                "files": [],
                "title": ctx.build.ref.replace("refs/tags/v", ""),
                "note": "tmp/CHANGELOG.md",
                "overwrite": True,
                "prerelease": len(ctx.build.ref.split("-")) > 1,
            },
            "depends_on": ["publish-docs", "publish-system"],
        },
    ]

    final_steps = lint_test_build
    name = "test, build"

    if ctx.build.event == "tag":
        final_steps += release_steps
        name += ", release"

    return {
        "kind": "pipeline",
        "type": "docker",
        "name": name,
        "platform": {
            "os": "linux",
            "arch": "amd64",
        },
        "clone": {
            # The default drone clone step "internally auto-merges" the PR branch to master.
            # That confuses SonarCloud. The analysis report does not come from the actual
            # real commit at the tip of the branch.
            "disable": True,
        },
        "steps": final_steps,
        "trigger": {
            "ref": [
                "refs/heads/master",
                "refs/tags/**",
                "refs/pull/**",
            ],
        },
    }

def changelog(ctx):
    repo_slug = ctx.build.source_repo if ctx.build.source_repo else ctx.repo.slug
    return {
        "kind": "pipeline",
        "type": "docker",
        "name": "changelog",
        "platform": {
            "os": "linux",
            "arch": "amd64",
        },
        "clone": {
            "disable": True,
        },
        "steps": [
            {
                "name": "clone",
                "image": "plugins/git-action:1",
                "settings": {
                    "actions": [
                        "clone",
                    ],
                    "remote": "https://github.com/%s" % (repo_slug),
                    "branch": ctx.build.source if ctx.build.event == "pull_request" else "master",
                    "path": "/drone/src",
                    "netrc_machine": "github.com",
                    "netrc_username": {
                        "from_secret": "github_username",
                    },
                    "netrc_password": {
                        "from_secret": "github_token",
                    },
                },
            },
            {
                "name": "generate",
                "image": "toolhippie/calens:latest",
                "commands": [
                    "calens >| CHANGELOG.md",
                ],
            },
            {
                "name": "diff",
                "image": OWNCLOUDCI_ALPINE,
                "commands": [
                    "git diff",
                ],
            },
            {
                "name": "output",
                "image": OWNCLOUDCI_ALPINE,
                "commands": [
                    "cat CHANGELOG.md",
                ],
            },
            {
                "name": "publish",
                "image": "plugins/git-action:1",
                "settings": {
                    "actions": [
                        "commit",
                        "push",
                    ],
                    "message": "Automated changelog update [skip ci]",
                    "branch": "master",
                    "author_email": "devops@owncloud.com",
                    "author_name": "ownClouders",
                    "netrc_machine": "github.com",
                    "netrc_username": {
                        "from_secret": "github_username",
                    },
                    "netrc_password": {
                        "from_secret": "github_token",
                    },
                },
                "when": {
                    "ref": {
                        "exclude": [
                            "refs/pull/**",
                        ],
                    },
                },
            },
        ],
        "depends_on": [],
        "trigger": {
            "ref": [
                "refs/heads/master",
                "refs/pull/**",
            ],
        },
    }
