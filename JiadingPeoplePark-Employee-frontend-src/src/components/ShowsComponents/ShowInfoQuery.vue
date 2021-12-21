<template>
  <div
    class="show-info"
    :class="nmNightClass"
  >
    <div class="query-filter">
      <v-icon color="primary">
        mdi-filter-plus
      </v-icon> <span class="query-title">查询条件</span>
      <div>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <v-text-field
                v-model="selectedItem.id"
                label="演出编号"
                placeholder="请输入演出编号"
                prepend-icon="mdi-music-accidental-sharp"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <v-text-field
                v-model="selectedItem.name"
                label="演出名称"
                placeholder="请输入演出名称"
                prepend-icon="el-icon-view"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <v-text-field
                v-model="selectedItem.principalId"
                label="负责人编号"
                placeholder="请输入负责人编号"
                prepend-icon="el-icon-s-custom"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="selectedItem.showDate"
                    label="演出日期"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="selectedItem.showDate"
                  color="primary"
                  width="400"
                  @input="menu2 = false"
                />
              </v-menu>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <v-menu
                v-model="menu3"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="selectedItem.startTime"
                    label="开始时间"
                    prepend-icon="el-icon-sort-up"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-time-picker
                  v-model="selectedItem.startTime"
                  format="24hr"
                  color="primary"
                  width="400"
                  @input="menu3 = false"
                />
              </v-menu>
            </v-col>
            <!-- <v-col cols="12" sm="6" md="3">
                             <v-menu v-model="menu4" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="selectedItem.endTime" label="结束时间"   prepend-icon="el-icon-sort-up" readonly v-bind="attrs" v-on="on" >
                                    </v-text-field>
                                </template>
                                <v-time-picker format="24hr" color="primary" width="400" v-model="selectedItem.endTime" @input="menu4 = false"></v-time-picker>
                            </v-menu>
                        </v-col> -->
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <v-text-field
                v-model="selectedItem.site"
                label="地点"
                placeholder="请输入地点"
                prepend-icon="el-icon-position"
              />
            </v-col>
            <!-- <v-col cols="12" sm="6" md="3">
                            <v-text-field label="道具" v-model="selectedItem.props" placeholder="请输入道具" prepend-icon="el-icon-box"  />
                        </v-col> -->
          </v-row>
        </v-container>

        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="3"
            />
            <v-col
              cols="12"
              sm="6"
              md="3"
            >
              <v-btn
                v-ripple
                :disabled="queryLoaderDialog===true"
                block
                class="width"
                color="error"
                @click="deleteFilter"
              >
                <v-icon>mdi-filter-minus</v-icon>&nbsp;&nbsp;删除过滤条件
              </v-btn>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="3"
            >
              <v-btn
                v-ripple
                :disabled="queryLoaderDialog===true"
                block
                class="width"
                color="primary"
                @click="fetchItemInfo(1)"
              >
                <v-icon>mdi-filter</v-icon>&nbsp;&nbsp;按条件查找
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
    <v-divider />
    <div class="query-result">
      <v-icon color="primary">
        mdi-note-search
      </v-icon> <span class="query-title">查询结果</span>
      <div class="query-result-table">
        <v-data-table
          :headers="headers"
          :items="queryData"
          :page.sync="page"
          :items-per-page="5"
          show-expand
          hide-default-footer
          class="elevation-1"
          @page-count="pageCount = $event"
        >
          <!--展开行-->
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-img
                    :aspect-ratio="4/3"
                    :src="item.picture"
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="125"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <br>
                  <v-text color="primary">
                    主题:{{ item.theme }}<br>
                    <br>
                  </v-text>
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <br>
                  <v-text color="primary">
                    简介:{{ item.intro }}<br>
                    <br>
                  </v-text>
                </v-col>
              </v-row>
            </td>
          </template>

          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>查询结果</v-toolbar-title>
              <v-spacer />
              <v-dialog
                v-model="dialog"
                max-width="600px"
                persistent
              >
                <v-card :ripple="{class:null}">
                  <v-card-title
                    class=" strip-bg text-h5 text--white primary "
                    color="warning"
                  >
                    <v-icon color="white">
                      mdi-pen
                    </v-icon>&nbsp;<span
                      class="text--white"
                      style="color:#ffffff !important;"
                    >
                      修改信息
                    </span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-btn @click="handleAdd">
                            设置照片
                          </v-btn>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.pictureName"
                            label="图片"
                            disabled
                            hide-details="auto"
                          />
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.id"
                            disabled
                            :rules="rules"
                            label="演出编号*"
                            prepend-icon="mdi-music-accidental-sharp"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.name"
                            label="演出名称*"
                            :rules="rules"
                            prepend-icon="mdi-rename-box"
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.principalId"
                            label="负责人编号*"
                            :rules="rules"
                            prepend-icon="mdi-account"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-menu
                            v-model="menu5"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="editedItem.showDate"
                                label="演出日期"
                                readonly
                                v-bind="attrs"
                                prepend-icon="mdi-calendar"
                                v-on="on"
                              />
                            </template>
                            <v-date-picker
                              v-model="editedItem.showDate"
                              color="primary"
                              width="400"
                              @input="menu5 = false"
                            />
                          </v-menu>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-menu
                            v-model="menu6"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="editedItem.startTime"
                                label="开始时间*"
                                :rules="rules"
                                readonly
                                v-bind="attrs"
                                prepend-icon="mdi-clock-time-two-outline"
                                v-on="on"
                              />
                            </template>
                            <v-time-picker
                              v-model="editedItem.startTime"
                              format="24hr"
                              color="primary"
                              width="400"
                              @input="menu6 = false"
                            />
                          </v-menu>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-menu
                            v-model="menu7"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="editedItem.endTime"
                                label="结束时间*"
                                :rules="rules"
                                readonly
                                v-bind="attrs"
                                prepend-icon="mdi-clock-time-three-outline"
                                v-on="on"
                              />
                            </template>
                            <v-time-picker
                              v-model="editedItem.endTime"
                              format="24hr"
                              color="primary"
                              width="400"
                              @input="menu7 = false"
                            />
                          </v-menu>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.site"
                            label="地点"
                            prepend-icon="mdi-map-marker-check-outline"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.props"
                            label="道具"
                            prepend-icon="mdi-baseball-bat"
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.ticketsMaxAmount"
                            label="票最大数量*"
                            :rules="rules"
                            prepend-icon="mdi-ticket-account"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.ticketsCurrentAmount"
                            label="票当前数量*"
                            :rules="rules"
                            prepend-icon="mdi-ticket"
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col
                          cols="12"
                          sm="6"
                          md="12"
                        >
                          <v-text-field
                            v-model="editedItem.theme"
                            label="主题"
                            prepend-icon="mdi-comment-quote-outline"
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col
                          cols="12"
                          sm="6"
                          md="12"
                        >
                          <v-text-field
                            v-model="editedItem.intro"
                            label="简介"
                            prepend-icon="mdi-table-of-contents"
                          />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      class="fullwidth"
                      v-bind="attrs"
                      light
                      color="primary"
                      v-on="on"
                      @click="close()"
                    >
                      <v-icon>mdi-close</v-icon>{{ $t('common.cancel') }}
                    </v-btn>
                    <v-btn
                      class="fullwidth"
                      v-bind="attrs"
                      light
                      color="success"
                      v-on="on"
                      @click="updateItemInfo()"
                    >
                      <v-icon>mdi-check</v-icon>{{ $t('common.confirm') }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              class="mr-2"
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </div>
      <div class="query-pagination">
        <v-pagination
          v-model="page"
          :length="pageCount"
        />
      </div>
    </div>
    <v-dialog
      v-model="queryLoaderDialog"
      persistent
      width="300"
    >
      <v-card color="">
        <v-card-title>正在查找</v-card-title>
        <v-divider />
        <br>
        <v-card-text>
          请稍后<br><br>
          <v-progress-linear
            indeterminate
            striped
            color="primary"
            class="mb-0"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="queryLoaderDialog2"
      persistent
      width="300"
    >
      <v-card color="">
        <v-card-title>正在提交</v-card-title>
        <v-divider />
        <br>
        <v-card-text>
          请稍后<br><br>
          <v-progress-linear
            indeterminate
            striped
            color="primary"
            class="mb-0"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="errorReturn"
      persistent
      width="500"
    >
      <v-card
        color=""
        :ripple="{class:null}"
      >
        <v-card-title
          class=" strip-bg text-h5 text--white red "
          color="warning"
        >
          <v-icon color="white">
            mdi-close-thick
          </v-icon>&nbsp;<span
            class="text--white"
            style="color:#ffffff !important;"
          >{{ errorTitle }}</span>
        </v-card-title>
        <v-divider />
        <br>
        <v-card-text>
          <span class="poptip-body">{{ errorInfo }}</span><br><br>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn
            class="fullwidth"
            v-bind="attrs"
            light
            color="primary"
            v-on="on"
            @click="errorReturn=false;"
          >
            <v-icon>mdi-exclamation</v-icon>{{ $t('common.confirm') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="deleteDialog"
      persistent
      width="600"
    >
      <v-card
        color=""
        :ripple="{class:null}"
      >
        <v-card-title
          class=" strip-bg text-h5 text--white orange darken-3 "
          color="warning"
        >
          <v-icon color="white">
            mdi-close-thick
          </v-icon>&nbsp;<span
            class="text--white"
            style="color:#ffffff !important;"
          >{{ $t('animalShow.delete') }}</span>
        </v-card-title>
        <v-divider />
        <br>
        <v-card-text>
          <span class="poptip-body">{{ $t('animalShow.delete_content') }}</span><br><br>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn
            class="fullwidth"
            v-bind="attrs"
            light
            color="primary"
            v-on="on"
            @click="deleteItemconfirm()"
          >
            <v-icon>mdi-exclamation</v-icon>{{ $t('common.confirm') }}
          </v-btn>
          <v-btn
            class="fullwidth"
            v-bind="attrs"
            light
            color="error"
            v-on="on"
            @click="close()"
          >
            <v-icon>mdi-arrow-left</v-icon>{{ $t('common.cancel') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { getInformation, updateInformation,deleteInformation } from '../../apis/showInfo';
import {loadimg} from '../../apis/common'

export default {
    name: 'ShowInfoQuery',data:()=>{
        return{
            url:'',
            pictureName:'',
            rules: [
            value => !!value || '不能为空',
            ],
            selectedItem:{
                id:null,
                name:null,
                principalId:null,
                site:null,
                showDate:null,
                startTime:null,
                endTime:null,
                props:null,
                theme:null,
                intro:null,
                picture:null,
                ticketsMaxAmount:null,
                ticketsCurrentAmount:null,
            },

        headers:[
            // {text: '图片', value: 'picture'},
            {text: '演出编号', value: 'id'},
            {text: '演出名称', value: 'name',sortable:false},
            {text: '负责人编号', value: 'principalId'},
            {text: '地点', value: 'site',sortable:false},
            {text: '演出日期', value: 'showDate'},
            {text: '开始时间', value: 'startTime'},
            {text: '结束时间', value: 'endTime'},
            {text: '道具', value: 'props',sortable:false},
            // {text: '主题', value: 'theme',sortable:false},
            // {text: '简介', value: 'intro',sortable:false},
            {text: '票最大数量', value: 'ticketsMaxAmount'},
            {text: '票当前数量', value: 'ticketsCurrentAmount'},

            {text: '操作', value: 'actions', sortable: false }
        ],
        queryLoaderDialog:false,
        pageCount:0,
        page:1,
        ID:0,
        dialog:false,
        queryData:[],
        editedIndex: -1,
        delIndex: -1,
        queryLoaderDialog2:false,
        deleteDialog:false,
        errorReturn:false,
        errorTitle:'',
        errorInfo:'',
        editedItem: {
            id:null,
            name:null,
            principalId:null,
            site:null,
            showDate:null,
            startTime:null,
            endTime:null,
            props:null,
            theme:null,
            intro:null,
            ticketsMaxAmount:null,
            ticketsCurrentAmount:null,
            picture:'',
            pictureName:'',
        },
        delId:0,
        }

    },computed:{
        cardNightClass(){
            return{
                'cardcolor-light':!this.$vuetify.theme.dark,
                'cardcolor-dark':this.$vuetify.theme.dark,

            }
        },
        nmNightClass(){
            return{
                'background-nm-dark':this.$vuetify.theme.dark,

            }
        },
    },
    created(){

    },methods:{
        returnData(value){
            this.url=value.data.storePath;
            this.editedItem.pictureName= this.url.substring(this.url.lastIndexOf('/')+1);
            this.pictureName = value.data.storePath.substring(value.data.storePath.lastIndexOf('/')+1);
        },
         handleAdd() {
            this.$refs.fileUploadDialog.show()
        },
        fetchItemInfo(x){
            if(x==1){
                this.queryLoaderDialog=true;
            }
            var reg = new RegExp( '-' , "g" )
            setTimeout(
                ()=>{
                    getInformation(
                        {
                            id:this.selectedItem.id,
                            name:this.selectedItem.name,
                            principalId:this.selectedItem.principalId,
                            site:this.selectedItem.site,
                            showDate:this.selectedItem.showDate!==null?this.selectedItem.showDate.replace(reg,'/'):null,
                            startTime:this.selectedItem.startTime,
                            // endTime:this.selectedItem.endTime,
                            // props:this.selectedItem.props,
                            // theme:this.selectedItem.theme,
                            // intro:this.selectedItem.intro,
                            // ticketsMaxAmount:this.selectedItem.ticketsMaxAmount,
                            // ticketsCurrentAmount:this.selectedItem.ticketsCurrentAmount
                        }
                    ).then(response => {
                        console.log('showQueryResponse==',response);
                        this.queryData = response.data.pageInfo.list;
                        this.queryData.forEach(element=>{
                            loadimg({url:element.picture}).then(res=>{
                                console.log('be',element.picture)
                                element.pictureName=element.picture.substring(element.picture.lastIndexOf('/')+1);
                                if(element.picture.substring(0,5)=="/home"){
                                    element.picture= 'data:image/png;base64,' +btoa(new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), ''))
                                    console.log('af',element.picture)
                                }
                                this.$forceUpdate()
                                }).catch(err=>{
                                    console.log('imgload======',err)
                                })
                        })
                        if(x==1){
                            this.queryLoaderDialog=false;
                            if(this.queryData.length>0){
                                this.$store.dispatch('showToastNotify',{type:'success',info:'信息查询成功'})
                            }else{
                                this.$store.dispatch('showToastNotify',{type:'error',info:'未找到符合条件的选项'})
                            }
                        }
                    }).catch( err =>{
                        if(x==1){
                            this.queryLoaderDialog=false;
                            this.$store.dispatch('showToastNotify',{type:'error',info:'信息查询失败 '+err})
                        }
                        console.log('showQueryerr==',err);
                    })
                },x==1?1000:10
            )
        },
        updateItemInfo(){
            var reg = new RegExp( '-' , "g" )
            if(this.editedItem.ticketsMaxAmount<this.editedItem.ticketsCurrentAmount){
                this.$store.dispatch('showToastNotify',{type:'error',info:'当前票数不可高于最大票数'});
                return;
            }
            var startHour=parseInt(this.editedItem.startTime.split(':')[0])
            var startMinute=parseInt(this.editedItem.startTime.split(':')[1])
            var endHour=parseInt(this.editedItem.endTime.split(':')[0])
            var endMinute=parseInt(this.editedItem.endTime.split(':')[1])
            if(startHour>endHour||startHour==endHour&&startMinute>endMinute){
                this.$store.dispatch('showToastNotify',{type:'error',info:'演出开始时间不可小于结束时间'});
                return;
            }

            this.queryLoaderDialog2=true;
            setTimeout(
                ()=>{
                    updateInformation(
                        {
                            picture:this.url,
                            id:this.editedItem.id,
                            name:this.editedItem.name,
                            principalId:this.editedItem.principalId,
                            site:this.editedItem.site,
                            showDate:this.editedItem.showDate!==null?this.editedItem.showDate.replace(reg,'/'):null,
                            startTime:this.editedItem.startTime,
                            endTime:this.editedItem.endTime,
                            props:this.editedItem.props,
                            theme:this.editedItem.theme,
                            intro:this.editedItem.intro,
                            ticketsMaxAmount:this.editedItem.ticketsMaxAmount,
                            ticketsCurrentAmount:this.editedItem.ticketsCurrentAmount
                        }
                    ).then(response => {
                        this.queryLoaderDialog2=false;
                        if(response.code==200){
                        this.dialog=false;
                        this.$store.dispatch('showToastNotify',{type:'success',info:'信息更新成功'});
                        }else{
                            this.$store.dispatch('showToastNotify',{type:'error',info:'信息更新失败 '+response.message});

                        }
                        this.fetchItemInfo(0);

                    }).catch(err=>{
                        this.queryLoaderDialog2=false;
                        this.$store.dispatch('showToastNotify',{type:'error',info:this.$t('信息更新失败')})
                        console.log(err);
                    })
                },1000
            )
        },
        deleteItem (item) {
            this.delIndex = this.queryData.indexOf(item)
            this.delId = item.id
            this.deleteDialog=true;
        },
        deleteItemconfirm(){
            this.queryLoaderDialog2=true;
            setTimeout(
                ()=>{
                    deleteInformation({
                        id:this.delId,
                    }).then(response=>{
                        this.deleteDialog=false;
                        this.queryLoaderDialog2=false;
                        this.$store.dispatch('showToastNotify',{type:'success',info:'信息删除成功'})
                        this.close();
                        this.fetchItemInfo(0);
                    }).catch(err=>{
                        this.deleteDialog=false;
                        this.queryLoaderDialog2=false;
                        this.$store.dispatch('showToastNotify',{type:'error',info:this.$t('信息删除失败')})
                        console.log(err);
                    })
                },2000
            )
        },
        deleteFilter(){
            this.selectedItem.id=null;
            this.selectedItem.name=null;
            this.selectedItem.principalId=null;
            this.selectedItem.site=null;
            this.selectedItem.showDate=null;
            this.selectedItem.startTime=null;
            this.selectedItem.endTime=null;
            this.selectedItem.props=null;
            this.selectedItem.theme=null;
            this.selectedItem.intro=null;
            this.selectedItem.ticketsMaxAmount=null;
            this.selectedItem.ticketsCurrentAmount=null;

        },
        close () {
            this.dialog = false
            this.deleteDialog=false
            this.$nextTick(() => {
            this.editedIndex = -1
            this.delIndex = -1
            })
        },
        editItem (item) {
            this.editedIndex = this.queryData.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

    }

}
</script>
<style scoped lang="scss">
    .query-pagination{
        margin-top:10px;
        transition: all .5s;
    }
    .query-result{
        margin-top:20px;
    }
    .show-info{
        padding-left:50px;
        padding-right:50px;
        padding-top:20px;
        padding-bottom:20px;
        background-color: #fafafa;
    }
    .query-title{
        font-weight: bold;
        letter-spacing: 1px;
        position:relative;
        top:3px;
    }
    .query-result-table{
        margin-top:10px;
    }
</style>
