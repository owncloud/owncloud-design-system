<script>
import OcCheckbox from "../elements/OcCheckbox"
import OcSidebarNavDivider from "../elements/_OcSidebarNavDivider"
import OcButton from "../elements/OcButton"
import OcAppBar from "../patterns/OcAppBar"
import OcNav from "../elements/OcNav"
/**
 * Shows how to layout and structure the files app.
 */
export default {
  name: "Files V2",
  components: { OcNav, OcButton, OcAppBar, OcSidebarNavDivider, OcCheckbox },
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
  <div style="background-color: white; overflow: auto;"><!-- top container to fill the whole screen/area -->
    <oc-dialog name="OcDialog" title="Not implemented">
      <template slot="content">
        This feature is not implemented yet.
      </template>
    </oc-dialog>

    <oc-navbar tag="header" class="oc-topbar">
      <oc-navbar-item position="left">
        <router-link to="/" class="oc-topbar-icon">ownCloud X</router-link>
      </oc-navbar-item>
      <oc-navbar-item position="right">
        <div
          class="oc-topbar-personal"
        >
          <oc-icon name="menu" variation="inverted" id="_apps"/>
          <oc-avatar
            class="oc-topbar-personal-avatar"
            src="https://picsum.photos/64/64?image=1027"
            :loading="loading"
            id="_account"
          />
          </div>
      </oc-navbar-item>
    </oc-navbar>

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
          width="128"
        />
        <h3 class="uk-card-title">Alice Wonderland</h3>
        <span>alice@wonder.land</span>
        <oc-button>Manage your account</oc-button>
        <br/>
        <oc-button>Sign out</oc-button>
      </div>
      <div class="uk-card-footer uk-flex uk-flex-middle uk-flex-column">
        <span>version: 0.2.6</span>
      </div>
    </oc-drop>

    <oc-app-layout :rightHidden="rightHidden" :leftHidden="false">

      <template slot="left">
        <ul class="oc-main-menu" uk-nav="multiple: true">
          <oc-sidebar-nav-item icon="folder">All files</oc-sidebar-nav-item>
          <oc-sidebar-nav-item icon="star">Favorites</oc-sidebar-nav-item>
          <oc-sidebar-nav-item icon="share">Shared with me</oc-sidebar-nav-item>
          <oc-sidebar-nav-item icon="link">Shared public</oc-sidebar-nav-item>
          <oc-sidebar-nav-item icon="folder-external">External files</oc-sidebar-nav-item>
          <oc-sidebar-nav-item icon="style">Tags</oc-sidebar-nav-item>
          <oc-sidebar-nav-item icon="delete">Deleted files</oc-sidebar-nav-item>
        </ul>
      </template>

      <template slot="center">
        <oc-app-bar id="files-app-bar">
          <div class="uk-width-expand">
              <oc-breadcrumb :home="goHome" :items="[{text:'Folder',to:{path:'folder'}},{text:'Subfolder'}]"></oc-breadcrumb>
          </div>
          <div class="uk-width-auto uk-visible@m">
            <oc-search-bar label="Search"></oc-search-bar>
          </div>
          <div class="uk-width-auto">
            <div class="uk-button-group">
              <oc-button variation="primary" id="_new" icon="add" />
              <oc-button id="_filter" icon="filter_list" />
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
              <oc-table-cell type="head" class="uk-text-truncate"/>
              <oc-table-cell shrink type="head"/>
            </oc-table-row>
          </oc-table-group>
          <oc-table-group>
            <oc-table-row @click="selectRow(file)"  v-for="(file,o) in files" :key="o">
              <oc-table-cell>
                <oc-checkbox />
              </oc-table-cell>
              <oc-table-cell>
                <!-- FIXME dont register a click handler for every file. register it on the table and get the filename from the event -->
                <oc-file @click="selectFile(file)" :name="file.name" :extension="file.extension" :icon="file.icon">
                  <oc-star v-if="o % 3 === 0" shining="true" style="width:20px; height:20px"/>
                  <span> {{(++o * 128) + ' Kb'}} - {{'modified ' + ++o + ' days ago'}} </span>
                </oc-file>
              </oc-table-cell>
              <oc-table-cell style="display: inline-flex">
                <oc-icon type="div" name="edit" aria-label="Edit Picture" />
                <oc-icon type="div" name="file_download" aria-label="Download Picture" />
                <oc-icon type="div" name="delete" aria-label="Delete Picture" />
              </oc-table-cell>
            </oc-table-row>
          </oc-table-group>
        </oc-table>

        <oc-dialog name="createFolder" title="Create Folder" v-model="createFolder">
          <template slot="content">
            <oc-text-input placeholder="New Folder Name"/>
          </template>
          <template slot="footer">
            <oc-button @click="createFolder = false" class="uk-modal-close" variation="primary" type="button">Create</oc-button>
            <oc-button @click="createFolder = false" class="uk-modal-close" variation="secondary" type="button">Cancel</oc-button>
          </template>
        </oc-dialog>
        <oc-dialog name="createFile" title="Create File" v-model="createFile">
          <template slot="content">
            <oc-text-input placeholder="New File Name"/>
          </template>
          <template slot="footer">
            <oc-button @click="createFile = false" class="uk-modal-close" variation="primary" type="button">Create</oc-button>
            <oc-button @click="createFile = false" class="uk-modal-close" variation="secondary" type="button">Cancel</oc-button>
          </template>
        </oc-dialog>

        <oc-file-actions />

      </template>
      <template slot="right">
        Selected: <span v-text="selectedFile"/>
        <oc-button @click="rightHidden=true" >close</oc-button>
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
          {name: "Private", extension: "", icon:'folder'},
          {name: "Project", extension: "", icon:'folder-shared'},
          {name: "Document", extension: "pdf", icon:'application-pdf'},
          {name: "Picture", extension: "png", icon:'image'},
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
      goHome () {
        alert('Going home')
      },
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
