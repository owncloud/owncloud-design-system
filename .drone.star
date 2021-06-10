def main(ctx):
    before = [
        testing(ctx),
    ]

    stages = [
        changelog(ctx),
        build(ctx),
    ]

    return before + stages


def testing(ctx):
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

    return {
        'kind': 'pipeline',
        'type': 'docker',
        'name': 'testing',
        'platform': {
            'os': 'linux',
            'arch': 'amd64',
        },
        'steps': [
            {
                'name': 'dependencies',
                'image': 'owncloudci/nodejs:14',
                'pull': 'always',
                'commands': [
                    'yarn install'
                ]
            },
            {
                'name': 'eslint',
                'image': 'owncloudci/nodejs:14',
                'pull': 'always',
                'commands': [
                    'yarn lint:eslint',
                ],
                'depends_on': ['dependencies']
            },
            {
                'name': 'stylelint',
                'image': 'owncloudci/nodejs:14',
                'pull': 'always',
                'commands': [
                    'yarn lint:stylelint',
                ],
                'depends_on': ['dependencies']
            },
            {
                'name': 'build docs',
                'image': 'owncloudci/nodejs:14',
                'pull': 'always',
                'commands': [
                    'yarn install',
                    'yarn build:docs',
                ],
                'depends_on': ['eslint', 'stylelint']
            },
            {
                'name': 'build system',
                'image': 'owncloudci/nodejs:14',
                'pull': 'always',
                'commands': [
                    'yarn install',
                    'yarn build:system',
                ],
                'depends_on': ['eslint', 'stylelint']
            },
            {
                'name': 'unit tests',
                'image': 'owncloudci/nodejs:14',
                'pull': 'always',
                'commands': [
                    'yarn install',
                    'yarn test',
                ],
                'depends_on': ['build system']
            },
            {
              "name": "sonarcloud",
              "image": "sonarsource/sonar-scanner-cli:latest",
              "pull": "always",
              "environment": sonar_env
            },
        ],
        'trigger': {
            'ref': [
                'refs/heads/master',
                'refs/tags/**',
                'refs/pull/**',
            ],
        },
    }


def build(ctx):
    return {
        'kind': 'pipeline',
        'type': 'docker',
        'name': 'build and publish',
        'platform': {
            'os': 'linux',
            'arch': 'amd64',
        },
        'steps': [
            {
                'name': 'build-docs',
                'image': 'owncloudci/nodejs:14',
                'pull': 'always',
                'commands': [
                    'yarn install',
                    'yarn build:docs',
                ],
            },
            {
                'name': 'build-system',
                'image': 'owncloudci/nodejs:14',
                'pull': 'always',
                'commands': [
                    'yarn install',
                    'yarn build:system',
                ],
            },
            {
                'name': 'publish-docs',
                'image': 'plugins/gh-pages:1',
                'pull': 'always',
                'settings': {
                    'username': {
                        'from_secret': 'github_username',
                    },
                    'password': {
                        'from_secret': 'github_token',
                    },
                    'pages_directory': 'dist/docs',
                },
            },
            {
                'name': 'publish-system',
                'image': 'plugins/npm:1',
                'pull': 'always',
                'settings': {
                    'username': {
                        'from_secret': 'npm_username',
                    },
                    'email': {
                        'from_secret': 'npm_email',
                    },
                    'token': {
                        'from_secret': 'npm_token',
                    },
                },
            },
            {
                'name': 'changelog',
                'image': 'toolhippie/calens:latest',
                'pull': 'always',
                'commands': [
                    'mkdir tmp',
                    'calens --version %s -o tmp/CHANGELOG.md' % ctx.build.ref.replace(
                        "refs/tags/v", "").split("-")[0],
                ],
            },
            {
                'name': 'release',
                'image': 'plugins/github-release:1',
                'pull': 'always',
                'settings': {
                    'api_key': {
                        'from_secret': 'github_token',
                    },
                    'files': [],
                    'title': ctx.build.ref.replace("refs/tags/v", ""),
                    'note': 'tmp/CHANGELOG.md',
                    'overwrite': True,
                    'prerelease': len(ctx.build.ref.split("-")) > 1,
                },
            },
        ],
        'trigger': {
            'ref': [
                'refs/tags/**',
            ],
        },
        'depends_on': [
            'changelog',
            'testing',
        ],
    }


def changelog(ctx):
    repo_slug = ctx.build.source_repo if ctx.build.source_repo else ctx.repo.slug
    return {
        'kind': 'pipeline',
        'type': 'docker',
        'name': 'changelog',
        'platform': {
            'os': 'linux',
            'arch': 'amd64',
        },
        'clone': {
            'disable': True,
        },
        'steps': [
            {
                'name': 'clone',
                'image': 'plugins/git-action:1',
                'pull': 'always',
                'settings': {
                    'actions': [
                        'clone',
                    ],
                    'remote': 'https://github.com/%s' % (repo_slug),
                    'branch': ctx.build.source if ctx.build.event == 'pull_request' else 'master',
                    'path': '/drone/src',
                    'netrc_machine': 'github.com',
                    'netrc_username': {
                        'from_secret': 'github_username',
                    },
                    'netrc_password': {
                        'from_secret': 'github_token',
                    },
                },
            },
            {
                'name': 'generate',
                'image': 'toolhippie/calens:latest',
                'pull': 'always',
                'commands': [
                    'calens >| CHANGELOG.md',
                ],
            },
            {
                'name': 'diff',
                'image': 'owncloudci/alpine:latest',
                'pull': 'always',
                'commands': [
                    'git diff',
                ],
            },
            {
                'name': 'output',
                'image': 'owncloudci/alpine:latest',
                'pull': 'always',
                'commands': [
                    'cat CHANGELOG.md',
                ],
            },
            {
                'name': 'publish',
                'image': 'plugins/git-action:1',
                'pull': 'always',
                'settings': {
                    'actions': [
                        'commit',
                        'push',
                    ],
                    'message': 'Automated changelog update [skip ci]',
                    'branch': 'master',
                    'author_email': 'devops@owncloud.com',
                    'author_name': 'ownClouders',
                    'netrc_machine': 'github.com',
                    'netrc_username': {
                        'from_secret': 'github_username',
                    },
                    'netrc_password': {
                        'from_secret': 'github_token',
                    },
                },
                'when': {
                    'ref': {
                        'exclude': [
                            'refs/pull/**',
                        ],
                    },
                },
            },
        ],
        'depends_on': [],
        'trigger': {
            'ref': [
                'refs/heads/master',
                'refs/pull/**',
            ],
        },
    }
