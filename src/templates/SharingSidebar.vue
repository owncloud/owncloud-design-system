<template> </template>
import { objectMethod } from '@babel/types';

<script>
/**
 * Shows how to layout and structure the files app.
 */
export default {
  name: "SharingSidebar",
  components: {},
  status: "proposed",
  release: "1.0.0",
}
</script>

<style lang="scss" scoped></style>

<docs>
  ```jsx
<template>
  <div class="js-layout" uk-grid>

    <div  class="uk-width-expand">

    <oc-table>
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
        <oc-table-row uk-toggle="target: #sidebar"  v-for="(i,o) in new Array(50)" :key="o">
          <oc-table-cell>
            <oc-checkbox />
          </oc-table-cell>
          <oc-table-cell>
            <oc-file :name="'Picture ' + ++o + '.png'"/>
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

    </div>

    <div id="sidebar" class="uk-card" hidden>
      <div class="uk-card-header">
        <div class="uk-inline">
          <oc-icon name="x-office-spreadsheet" size="large" />
        </div>
        <div class="uk-inline">
          <div>
            TimeSeries1751_2011.csv <oc-icon name="folder-public" aria-label="Close"/>
          </div>
          <div>
            <oc-star class="uk-inline"/> 7 KB, a month ago
          </div>
        </div>
        <div>
          <oc-text-input placeholder="Collaborative tags"/>
        </div>
      </div>
      <div class="uk-card-body">
        <oc-tabs>
          <oc-tab-item title="Activities"/>
          <oc-tab-item title="Comments"/>
          <oc-tab-item active title="Sharing"/>
          <oc-tab-item title="Versions"/>
        </oc-tabs>
        <div>
          <oc-accordion uk-accordion="collapsible: false; multiple: true">
            <oc-accordion-item class="uk-open" title="Owner(s)">
              <template slot="content">
                <div class="uk-inline">
                  <oc-avatar src="https://picsum.photos/64/64?image=1074" title="I'm a Lion"/>
                </div>
                <div class="uk-inline">
                  <div>
                    <strong>Simba (simba@djungle.com)</strong>
                  </div>
                  <div>
                    Owner | Expires: July 4, 2019
                  </div>
                </div>
                <div class="uk-inline uk-align-right">
                  <oc-icon name="delete"/>
                </div>
                <div class="uk-inline uk-align-right">
                  <oc-icon name="edit"/>
                </div>
              </template>
            </oc-accordion-item>
            <oc-accordion-item class="uk-open" title="Invite Collaborators">
              <template slot="content">
                <oc-text-input placeholder="Add name(s), email(s) or federation ID's"/>
          
                <div><!-- start list of collaborators -->

                  <div class="uk-margin-medium-top"><!-- start collaborator being edited -->
                    <div>
                      <div class="uk-inline">
                        <oc-avatar src="https://picsum.photos/64/64?image=1075" title="I'm a Lion"/>
                      </div>
                      <div class="uk-inline">
                        <div>
                          <strong>Radio Tower (tower@megacity.com)</strong>
                        </div>
                        <div/>
                      </div>
                      <div class="uk-inline uk-align-right">
                        <oc-icon name="delete"/>
                      </div>
                    </div>

                    <div class="uk-margin-small-top">
                      <div class="uk-inline">
                        <oc-radio label=""/>
                      </div>
                        <div class="uk-inline">
                        <div><strong>Viewer</strong></div>
                        <div>Download and preview</div>
                      </div>
                    </div>

                    <div>
                      <div class="uk-inline">
                        <oc-radio label=""/>
                      </div>
                        <div class="uk-inline">
                        <div><strong>Editor</strong></div>
                        <div>Upload, edit, delete, download and preview</div>
                      </div>
                    </div>

                    <div>
                      <div class="uk-inline">
                        <oc-radio label=""/>
                      </div>
                        <div class="uk-inline">
                        <div><strong>Co-owner</strong></div>
                        <div>Share, upload, edit, delete, download and preview</div>
                      </div>
                    </div>

                    <div>
                      <div class="uk-inline">
                        <oc-radio label=""/>
                      </div>
                        <div class="uk-inline">
                        <div><strong>MC Hammer</strong></div>
                        <div>U Can't touch this</div>
                      </div>
                    </div>

                    <div class="uk-margin-small-top">
                      Expiration Date
                      <oc-text-input placeholder="TODO make me a datepicker!" />
                    </div>

                    <div class="uk-container uk-padding-remove uk-margin-small-top">
                      <oc-button class="uk-align-right" text="Save" />
                    </div>

                  </div><!-- end collaborator being edited -->

                  <div class="uk-margin-medium-top"><!-- start collaborator -->
                    <div>
                      <div class="uk-inline">
                        <oc-avatar src="https://picsum.photos/64/64?image=1076" title="I'm a Lion"/>
                      </div>
                      <div class="uk-inline">
                        <div>
                          <strong>Artsy Tower (artsy@bauhaus.com)</strong>
                        </div>
                        <div>
                          Owner | Expires: July 4, 2019
                        </div>
                      </div>
                      <div class="uk-inline uk-align-right">
                        <oc-icon name="delete"/>
                      </div>
                      <div class="uk-inline uk-align-right">
                        <oc-icon name="edit"/>
                      </div>
                    </div>
                  </div><!-- end collaborator -->

                </div><!-- end list of collaborators -->
                
              </template>
            </oc-accordion-item>
            
          </oc-accordion>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
  }
</script>
```
</docs>
