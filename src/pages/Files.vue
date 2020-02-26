<script>
import OcCheckbox from "../elements/OcCheckbox"
import OcApplicationMenu from "../patterns/OcApplicationMenu"
import OcSidebarNavDivider from "../elements/_OcSidebarNavDivider"
import OcButton from "../elements/OcButton"
import OcAppBar from "../patterns/OcAppBar"
import OcNav from "../elements/OcNav"
/**
 * Shows how to layout and structure the files app.
 */
export default {
  name: "Files",
  components: { OcNav, OcButton, OcAppBar, OcSidebarNavDivider, OcApplicationMenu, OcCheckbox },
  status: "deprecated",
  release: "1.0.0",
  metaInfo: {
    title: "ownCloud Design System",
    htmlAttrs: {
      lang: "en",
    },
  },
  props: {
    /**
     * The html element name used for the component.
     */
    type: {
      type: String,
      default: "div",
    },
    /**
     * The selected file, Has a `name` and `extension` property.
     */
    selectedFile: {
      type: Object,
    },
  },
}
</script>
<docs>
```jsx
<template>
  <!-- top container to fill the whole screen/area, but with scrollbars  -->
  <div id="oc-content" style="background-color: white; overflow: auto; height: 70vh; ">
    <oc-dialog name="OcDialog" title="Not implemented">
      <template slot="content">
        This feature is not implemented yet.
      </template>
    </oc-dialog>

    <oc-navbar tag="header" class="oc-topbar">
      <oc-navbar-item position="left">
        <button class="oc-topbar-menu-burger" aria-label="Files" @click="leftMenuOpen = true">
          <oc-icon name="menu" class="oc-topbar-menu-burger-icon" /><span
            class="oc-topbar-menu-burger-label"
            >Files</span
          >
        </button>
      </oc-navbar-item>
      <oc-navbar-item position="center">
        <router-link to="/" class="oc-topbar-icon">ownCloud X</router-link>
      </oc-navbar-item>
      <oc-navbar-item position="right">
        <oc-grid
          gutter="small"
          class="oc-topbar-personal"
        >
          <oc-icon
            id="oc-notification-bell"
            class="oc-cursor-pointer uk-padding-small"
            name="bell"
            variation="inverted"
            aria-label="Notifications"
          />
          <oc-button
            id="_apps"
            icon="apps"
            variation="primary"
            class="oc-cursor-pointer uk-padding-small uk-height-1-1"
            aria-label="Application Switcher"
           />
          <div class="padding-small uk-height-1-1">
            <oc-avatar
              class="oc-topbar-personal-avatar oc-cursor-pointer"
              src="https://picsum.photos/64/64?image=1027"
              :loading="loading"
              id="_account"
            />
          </div>
        </oc-grid>
      </oc-navbar-item>
    </oc-navbar>

    <oc-drop
      id="oc-notification-drop"
      toggle="#oc-notification-bell"
      position="bottom-right"
      class="uk-height-large uk-width-3-4 uk-width-large@s"
    >
      <div class="uk-overflow-auto">
        <div class="uk-width-1-1">
          <h5 class="uk-h4">Hello World !</h5>
          <p class="uk-text-small">Welcome to The System</p>
          <div class="uk-button-group uk-width-1-1 uk-flex-right">
            <oc-button
              id="resolve-notification-button"
              size="small"
            >Mark as read</oc-button>
          </div>
          <hr/>
        </div>
        <div class="uk-width-1-1">
          <h5 class="uk-h4">Hello Again !</h5>

          <p class="uk-text-small">Welcome back to The System</p>
          <p>
            <a href="#" class="uk-link" target="_blank">Link</a>
          </p>
          <div class="uk-button-group uk-width-1-1 uk-flex-right">
            <oc-button
              id="resolve-notification-button"
              size="small"
            >Mark as read</oc-button>
          </div>
        </div>
      </div>
    </oc-drop>

    <oc-drop toggle="#_apps" mode="click" :options="{pos:'bottom-right'}" class="uk-width-large">
      <div class="uk-grid-small uk-text-center" uk-grid>
        <div class="uk-width-1-3">
          <oc-icon name="folder" size="large"/>
          <div>Files</div>
        </div>
        <div class="uk-width-1-3">
          <oc-icon name="movie_filter" size="large"/>
          <div>Video</div>
        </div>
        <div class="uk-width-1-3">
          <oc-icon name="group" size="large"/>
          <div>Contacts</div>
        </div>
      </div>
      <div class="uk-grid-small uk-text-center" uk-grid>
        <div class="uk-width-1-3">
          <oc-icon name="linked_camera" size="large"/>
          <div>Album</div>
        </div>
        <div class="uk-width-1-3">
          <oc-icon name="lock" size="large"/>
          <div>Passwords</div>
        </div>
        <div class="uk-width-1-3">
          <oc-icon name="timer" size="large"/>
          <div>Run Tracker</div>
        </div>
      </div>
    </oc-drop>

    <oc-drop toggle="#_account" mode="click" :options="{pos:'bottom-right'}" class="uk-width-large">
      <div class="uk-card-body uk-flex uk-flex-middle uk-flex-column">
        <oc-avatar
          src="https://picsum.photos/128/128?image=1027"
          :width="128"
        />
        <h3 class="uk-card-title">Alice Wonderland</h3>
        <span>alice@wonder.land</span>
        <br />
        <oc-button>Manage your account</oc-button>
        <br/>
        <oc-button>Sign out</oc-button>
      </div>
      <div class="uk-card-footer uk-flex uk-flex-middle uk-flex-column">
        <span>version: 0.2.6</span>
      </div>
    </oc-drop>

    <oc-application-menu v-model="leftMenuOpen" name="leftMenu" @close="leftMenuOpen = false">
      <oc-sidebar-nav-item active icon="folder" target="home">
        Files
        <template slot="subnav">
          <oc-sidebar-nav-item>All files</oc-sidebar-nav-item>
          <oc-sidebar-nav-item>Favorites</oc-sidebar-nav-item>
          <oc-sidebar-nav-item>Shared with me</oc-sidebar-nav-item>
          <oc-sidebar-nav-item>Shared public</oc-sidebar-nav-item>
          <oc-sidebar-nav-item>External files</oc-sidebar-nav-item>
          <oc-sidebar-nav-item>Tags</oc-sidebar-nav-item>
          <oc-sidebar-nav-item>Deleted files</oc-sidebar-nav-item>
        </template>
      </oc-sidebar-nav-item>
    </oc-application-menu>

    <oc-app-layout :rightHidden="rightHidden" :leftHidden="true">


      <template slot="center">
        <oc-app-bar id="files-app-bar">
          <div class="uk-width-expand">
              <oc-breadcrumb :home="true" :items="[{text:'Folder',to:{path:'folder'}},{text:'Subfolder'}]"></oc-breadcrumb>
          </div>
          <div class="uk-width-auto uk-visible@m">
            <oc-search-bar label="Search"></oc-search-bar>
          </div>
          <div class="uk-width-auto">
            <div class="uk-button-group">
              <oc-button variation="primary" id="_new" icon="add" />
            </div>
            <oc-drop toggle="#_new" mode="hover" :options="{pos:'bottom-right'}">
              <oc-nav>
                  <oc-nav-item icon="create_new_folder">New folder …</oc-nav-item>
                  <oc-nav-item icon="save">New file …</oc-nav-item>
              </oc-nav>
            </oc-drop>
            <oc-drop toggle="#_filter" mode="hover" :options="{pos:'bottom-right'}">
              <ul class="uk-list">
                <li>
                  <label><oc-checkbox /> <span class="uk-text-meta">Show Files</span></label>
                </li>
                <li>
                  <label><oc-checkbox /> <span class="uk-text-meta">Show Folders</span></label>
                </li>
                <li>
                  <oc-search-bar small placeholder="Filter by name" :icon="false" :button="false" />
                </li>
              </ul>
            </oc-drop>
          </div>
        </oc-app-bar>

        <oc-table middle divider>
          <oc-table-group>
            <oc-table-row>
              <oc-table-cell shrink type="head">
                <oc-checkbox />
              </oc-table-cell>
              <oc-table-cell type="head" class="uk-text-truncate" v-text="'Name'"/>
              <oc-table-cell shrink type="head" />
              <oc-table-cell shrink type="head" v-text="'Size'"/>
              <oc-table-cell shrink type="head" class="uk-text-nowrap uk-visible@s" v-text="'Modification Time'"/>
              <oc-table-cell shrink type="head" v-text="'Actions'"/>
            </oc-table-row>
          </oc-table-group>
          <oc-table-group>
            <oc-table-row @click="selectRow(file)"  v-for="(file,o) in files" :key="o">
              <oc-table-cell>
                <oc-checkbox />
              </oc-table-cell>
              <oc-table-cell class="uk-text-truncate uk-text-meta uk-width-expand">
                <!-- FIXME dont register a click handler for every file. register it on the table and get the filename from the event -->
                <oc-file @click="selectFile(file)" :name="file.name" :extension="file.extension" :icon="file.icon"/>
              </oc-table-cell>
              <oc-table-cell class="uk-text-muted uk-text-nowrap">
                <template v-for="icon in file.indicators">
                  <oc-icon :name="icon.name" size="small" :variation="icon.active ? 'active' : 'passive' " />
                </template>
              </oc-table-cell>
              <oc-table-cell class="uk-text-muted uk-text-nowrap" v-text=" (++o * 128) + ' Kb'" />
              <oc-table-cell class="uk-text-muted uk-text-nowrap uk-visible@s" v-text=" ++o + ' days ago'" />
              <oc-table-cell>
                <div class="uk-button-group">
                  <oc-button icon="edit" aria-label="Edit Picture" />
                  <oc-button icon="file_download" aria-label="Download Picture" />
                  <oc-button icon="delete" aria-label="Delete Picture" />
                </div>
              </oc-table-cell>
            </oc-table-row>
          </oc-table-group>
        </oc-table>

        <oc-dialog name="createFolder" title="Create Folder" v-model="createFolder">
          <template slot="content">
            <oc-text-input label="New Folder Name" placeholder="New Folder Name"/>
          </template>
          <template slot="footer">
            <oc-button @click="createFolder = false" class="uk-modal-close" variation="primary" type="button">Create</oc-button>
            <oc-button @click="createFolder = false" class="uk-modal-close" variation="secondary" type="button">Cancel</oc-button>
          </template>
        </oc-dialog>
        <oc-dialog name="createFile" title="Create File" v-model="createFile">
          <template slot="content">
            <oc-text-input label="New File Name" placeholder="New File Name"/>
          </template>
          <template slot="footer">
            <oc-button @click="createFile = false" class="uk-modal-close" variation="primary" type="button">Create</oc-button>
            <oc-button @click="createFile = false" class="uk-modal-close" variation="secondary" type="button">Cancel</oc-button>
          </template>
        </oc-dialog>

        <!-- <oc-file-actions /> -->

      </template>
      <template slot="right">
        Selected: <span v-text="selectedFile"/>
        <oc-button @click="rightHidden=true">close</oc-button>
      </template>
    </oc-app-layout>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        selectedFile: "",
        createFile: false,
        createFolder: false,
        leftMenuOpen: false,
        rightHidden: true,
        loading: true,
        files: [
          {name: "Document", extension: "pdf", icon:'application-pdf'},
          {name: "Picture", extension: "png", icon:'image'},
          {name: "Private", extension: "", icon:'folder'},
          {name: "Project shared both directly", extension: "", icon:'folder', indicators: [{name:'group', active:true}, {name:'link', active:true}]},
          {name: "Project shared both from parent", extension: "", icon:'folder', indicators: [{name:'group'}, {name:'link'}]},
          {name: "Project shared by link directly", extension: "", icon:'folder', indicators: [{name:'link', active:true}]},
          {name: "Project shared by link through parent", extension: "", icon:'folder', indicators: [{name:'link'}]},
          {name: "Project received directly", extension: "", icon:'folder', indicators: [{name:'group'}]},
          {name: "Project received through parent", extension: "", icon:'folder', indicators: [{name:'group'}]},
          {name: "Presentation", extension: "odp", icon:'x-office-presentation'},
          {name: "README", extension: "md", icon:'text'},
          {name: "Spreadsheet", extension: "ods", icon:'x-office-spreadsheet'},
          {name: "Textdocument", extension: "odt", icon:'x-office-document'},
          {name: "Video", extension: "mp4", icon:'video'},
          {name: "Welcome", extension: "txt", icon:'text'},
        ],
        actions: {
          "pdf": [{
            label:'PDF Viewer',
            icon:'application-pdf',
            onClick: function(){
              alert("PDF")
            }
          }],
          "txt": [{
            label:'Text editor',
            icon:'text',
            onClick: function(){
              alert("TXT")
            }
          },{
            label:'Markdown editor',
            icon:'text',
            onClick: function(){
              alert("MD")
            }
          }],
          "md": [{
            label:'Markdown editor',
            icon:'text',
            onClick: function(){
              alert("MD")
            }
          },{
            label:'Text editor',
            icon:'text',
            onClick: function(){
              alert("TXT")
            }
          }],
          "odt": [{
            label:'Office documents',
            icon:'x-office-document',
            onClick: function(){
              alert("ODT")
            }
          }],
          "odp": [{
            label:'Office presentation',
            icon:'x-office-presentation',
            onClick: function(){
              alert("ODP")
            }
          }],
          "ods": [{
            label:'Office spreadsheet',
            icon:'x-office-spreadsheet',
            onClick: function(){
              alert("ODS")
            }
          }],
          "mp4": [{
            label:'Media player',
            icon:'video',
            onClick: function(){
              alert("MP4")
            }
          }]
        }
      }
    },
    methods: {
      selectFile(file) {
        this.$root.$emit('oc-file-actions:open', {
          filename: file.name + "." + file.extension,
          actions: this.actions[file.extension]
        })
      },
      selectRow(file) {
        console.log(file)
        this.selectedFile = file.name + "." + file.extension
        this.rightHidden = false
      },
      endLoading () {
      this.loading = false
      }
    },
    mounted: function () {
    setTimeout(() => {
      this.endLoading()
    }, 1000)
  },
  }
</script>
```
</docs>
