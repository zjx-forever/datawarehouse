<template>
  <div class="home-notice">
      <v-card  :ripple="{ class: null }" elevation="10" class="card-noborder" :class="cardNightClass">
            <div class="home-title2 home-body2">
                <v-icon>mdi-bell-alert</v-icon> {{$t('home.faclNotice')}}
            </div>
            <div class="home-body">
                <div class="notice" v-for="item in notice" :key="item.id"> 
                    <v-chip class="ma-2" :color="getNoticeTag(item).color" :ripple="false" label text-color="white">
                        <v-icon left>{{getNoticeTag(item).icon}}</v-icon>{{getNoticeTag(item).capt}}
                    </v-chip>
                    <v-dialog  width="700">
                        <template v-slot:activator="{ on, attrs }">
                            <span v-bind="attrs" v-on="on">
                                {{item.title}}
                            </span>
                            <span v-bind="attrs" v-on="on">
                                {{item.time}}  &nbsp;&nbsp;&nbsp;
                            </span>
                        </template>
                        <v-card :ripple="{class:null}" v-show="item.openStat=true">
                            <v-card-title class=" strip-bg text-h5 text--white primary " color="warning">
                                    <v-icon color="white">mdi-pen</v-icon>&nbsp;<span class="text--white" style="color:#ffffff !important;">
                                        园区通知
                                    </span>
                                </v-card-title>
                            <v-divider/>
                            <v-card-text>
                                <span class="poptip-body poptip-bodyx">
                                <b class="poptip-bodyxa"><span class="sharp primary--text">#</span> {{item.title}}</b> 
                                <br/>{{item.time}} - {{item.initiator}}<br/>
                                <v-divider/>
                                <br/>
                                {{item.content}}</span>
                            </v-card-text>
                            <v-divider></v-divider>
                            <!-- <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn  class="fullwidth"  light color="primary" @click="item.openStat=false;">
                                    <v-icon>mdi-check</v-icon>{{$t('common.confirm')}}
                                </v-btn>
                            </v-card-actions> -->
                        </v-card>
                    </v-dialog>
                </div>
            </div>
      </v-card>
  </div>
</template>

<script>
import {getNotice} from '../../apis/homepage'
export default {
    components: {  },
    name: 'HomepageNotice',
    data:()=>{
        return{
            notice:[]
        }
    },
    props:{
        
    },
    computed:{
        cardNightClass(){
            return{
                'cardcolor-light':!this.$vuetify.theme.dark,
                'cardcolor-dark':this.$vuetify.theme.dark,
            }
        }
    },
    methods:{
        fetchNotice(){
            getNotice().then(response => {
                this.notice = response.data.pageInfo.list
                this.notice.forEach(Element=>{
                    Element.time=Element.time.substring(0,10)
                })
                console.log('@response',this.notice)
            }).catch(err=>{
                console.log('@err',err)
            })
        },
        getNoticeTag(x){
            if(x.level=='top'){
                return {
                    'icon':'mdi-format-vertical-align-top',
                    'capt':'置顶',
                    'color':'error',
                }
            }else{
                return {
                    'icon':'mdi-information',
                    'capt':'通知',
                    'color':'primary',
                }
            }
        }
    },
    created(){
        this.fetchNotice();
    }
};
</script>

<style scoped lang="scss">
    .poptip-bodyx{
        //color:#111111;
        padding-top:20px;
        padding-bottom: 40px;
        line-height: 150%;
    }
    .notice{
        overflow:hidden  ;
        white-space:nowrap;    
        text-overflow:ellipsis;     
    }
    .home-notice{
        margin:0px 20px 0px 20px;
        padding-top:10px;
        padding-bottom: 10px;
        }
    .home-center{
        text-align: center;
    }
    .card-noborder{
        border-width: 0px;
        //background:-webkit-repeating-linear-gradient( 135deg, rgba(245, 245, 245, 0.98), rgba(245, 245, 245, 0.98) 45px, rgba(255, 255, 255, 0.9) 45px, rgba(255, 255, 255, 0.9) 90px ) !important;
    
    }
    .home-title2{
        font-size:18px;
        font-weight: bold;
        display:block;
    }
    .home-body{
        margin-left:7%;
        margin-right: 7%;
        padding-top:10px;
        padding-bottom: 30px;
        //color:#111111;

    }
    .poptip-bodyxa{
        font-size:20px !important;
    }
    .home-body2{
        margin-left:5%;
        margin-right: 5%;
        padding-top:20px;
        padding-bottom: 10px;
        //color:#111111;
    }
    .sharp{
        font-weight: bold;
        font-size:25px;
    }
</style>