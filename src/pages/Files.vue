<template> </template>

<script>
import OcCheckbox from "../elements/OcCheckbox"
import OcApplicationMenu from "../patterns/OcApplicationMenu"
import OcSidebarNavDivider from "../elements/_OcSidebarNavDivider"
import OcButton from "../elements/OcButton"
import OcNav from "../elements/OcNav"
/**
 * Shows how to layout and structure the files app.
 */
export default {
  name: "Files",
  components: { OcNav, OcButton, OcSidebarNavDivider, OcApplicationMenu, OcCheckbox },
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

<style lang="scss" scoped></style>

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
        <router-link
          tag="div"
          to="/personal"
          class="oc-topbar-personal"
          uk-tooltip="title: Personal setting; pos: bottom-right;"
        >
          <oc-avatar
            class="oc-topbar-personal-avatar"
            src="https://picsum.photos/64/64?image=1027"
          /><span class="oc-topbar-personal-label">Alice Habanero</span>
        </router-link>
      </oc-navbar-item>
    </oc-navbar>



    <oc-application-menu v-model="leftMenuOpen" name="leftMenu" @close="leftMenuOpen = false">
      <oc-sidebar-nav-item text="Files" active icon="folder" target="home">
        <oc-sidebar-nav-item text="All files"/>
        <oc-sidebar-nav-item text="Favorites"/>
        <oc-sidebar-nav-item text="Shared with me"/>
        <oc-sidebar-nav-item text="Shared public"/>
        <oc-sidebar-nav-item text="External files"/>
        <oc-sidebar-nav-item text="Tags" />
        <oc-sidebar-nav-item text="Deleted files" />
      </oc-sidebar-nav-item>

      <oc-sidebar-nav-item text="Personal settings" icon="account_circle" :isolate="true"/>
      <oc-sidebar-nav-divider />
      <oc-sidebar-nav-item text="Administration" icon="application" />

      <oc-sidebar-nav-item text="Exit ownCloud" icon="exit_to_app" target="login" :isolate="true"/>
    </oc-application-menu>

    <oc-app-layout :rightHidden="rightHidden">

      <template slot="center">
        <div class="uk-background-muted uk-padding-small">
          <oc-grid flex gutter="small">
            <div class="uk-width-expand">
               <oc-breadcrumb :items="[{text:'Home',to:'/'},{text:'Folder',to:{path:'folder'}},{text:'Subfolder'}]"></oc-breadcrumb>
            </div>
            <div class="uk-width-auto uk-visible@m">
              <oc-search-bar label="Search"></oc-search-bar>
            </div>
            <div class="uk-width-auto">
              <div class="uk-button-group">
                <oc-button id="_new">+ New</oc-button>
                <oc-button id="_filter" icon="filter_list" />
              </div>
            </div>
          </oc-grid>
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

        <oc-table middle divider>
          <oc-table-group>
            <oc-table-row>
              <oc-table-cell shrink type="head">
                <oc-checkbox />
              </oc-table-cell>
              <oc-table-cell type="head" class="uk-text-truncate" v-text="'Name'"/>
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
              <oc-table-cell>
                <!-- FIXME dont register a click handler for every file. register it on the table and get the filename from the event -->
                <oc-file @click="selectFile(file)" :name="file.name" :extension="file.extension" :icon="file.icon"/>
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
            <oc-text-input placeholder="New Folder Name"/>
          </template>
          <template slot="footer">
            <oc-button @click="createFolder = false" class="uk-modal-close" text="Create" variation="primary" type="button"></oc-button>
            <oc-button @click="createFolder = false" class="uk-modal-close" text="Cancel" variation="secondary" type="button"></oc-button>
          </template>
        </oc-dialog>
        <oc-dialog name="createFile" title="Create File" v-model="createFile">
          <template slot="content">
            <oc-text-input placeholder="New File Name"/>
          </template>
          <template slot="footer">
            <oc-button @click="createFile = false" class="uk-modal-close" text="Create" variation="primary" type="button"></oc-button>
            <oc-button @click="createFile = false" class="uk-modal-close" text="Cancel" variation="secondary" type="button"></oc-button>
          </template>
        </oc-dialog>

        <oc-file-actions />

      </template>
      <template slot="right">
        Selected: <span v-text="selectedFile"/>
        <oc-button @click="rightHidden=true" text="close" />
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
    },
  }
</script>
```
</docs>
