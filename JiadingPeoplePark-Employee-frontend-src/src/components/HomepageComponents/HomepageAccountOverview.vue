<template>
  <div class="home-notice">
      <alert-messagebox
        :alertTitle="`退出登录`"
        :alertBody="`是否退出  嘉定人民公园管理系统？`"
        :alertLevel="`warning`"
        ref="error_done"
        @alertConfirm="exitLogin"
        />
      <v-card  :ripple="{ class: null }" elevation="10" class="card-noborder" :class="cardNightClass">
            <div class="home-title2 home-body2">
                <v-icon>mdi-account-circle</v-icon> 账户状态
            </div>
            <div class="home-body">
                <v-container>
                    <v-row>
                        <v-col cols="3" style="padding-right:10px">
                            <v-avatar size="120" >
                                <!-- <v-img contain :src="avatarImg" aspect-ratio="16/9" height="100px" class="img img-demo"></v-img> -->
                                <v-img contain :src="avatarImg" aspect-ratio="16/9" height="500px" class="img"></v-img>
                            </v-avatar>
                        </v-col>
                        <v-col cols="9">
                          <span style="font-size:20px">  工号: {{userInfo.username}}</span> 
                          <span style="font-size:20px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;姓名: {{userInfo.realName}}</span><br/>
                          <span style="font-size:20px">   职务: {{userInfo.position}}</span><br/><br/>
                            <v-btn  class="fullwidth"  light color="primary"  @click="dialog_setting=true" >
                                <v-icon>mdi-cog</v-icon>设置
                            </v-btn>&nbsp;&nbsp;&nbsp;&nbsp;
                        <v-dialog v-model="dialog_setting" width="700">
                            <v-card :ripple="{class:null}">
                                <v-card-title class=" strip-bg text-h5 text--white darken-3 blue" color="warning">
                                <v-icon color="white">mdi-cog</v-icon>&nbsp;
                                <span class="text--white" style="color:#ffffff !important;">
                                    设置
                                </span>
                                </v-card-title>
                                <v-card-text>
                                    <setting-card/>
                                </v-card-text>
                                <v-divider></v-divider>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn  class="fullwidth"  light color="primary" @click="dialog_setting=false;">
                                        <v-icon>mdi-close</v-icon>{{$t('common.close')}}
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                           <v-btn  class="fullwidth" color="error" @click="exitLoginCall">
                                <v-icon>mdi-exit-to-app</v-icon>退出
                            </v-btn>
                            
                        </v-col>
                    </v-row>
                </v-container>
                
            </div>
      </v-card>
  </div>
</template>

<script>
import AlertMessagebox from '../CommonComponents/AlertMessagebox.vue'
import SettingCard from '../CommonComponents/SettingCard.vue';
import {getEmployeeInfo} from '@/apis/login'

export default {
    components: { AlertMessagebox,SettingCard },
    name: 'HomepageAccountOverview',
    props:{
        drawer:Boolean,
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
        getCurrentUserInfo(){
            getEmployeeInfo({
                    id:  localStorage.getItem('id')
            }).then(response=>{
                localStorage.setItem('position',response.data.position)
                localStorage.setItem('realName',response.data.realName)
                this.userInfo.username=localStorage.getItem('username')
                this.userInfo.realName=response.data.realName,
                this.userInfo.position=response.data.position,
                this.userInfo.userRole=localStorage.getItem('userRole')
            }).catch(err=>{
                console.log(err)
            })
        },

        exitLogin(){
            localStorage.setItem('Token','')
            localStorage.setItem('username','')
            localStorage.setItem('userRole','')
            localStorage.setItem('id','')
            localStorage.setItem('position','')
            localStorage.setItem('realName','')
            console.log('exitLogin is called')
            window.location.href='/Login'
        },
        exitLoginCall(){
            this.$refs.error_done.showAlert()
      },
        exitLoginEmit(){
            this.$emit('exitLogin');
        }
    },created(){
        let urlTemp = this.$store.state.sAsset_PageUserImage;
        this.avatarImg = require("@/"+urlTemp)
        this.getCurrentUserInfo()  
    },data:()=>{
        return{
            avatarImg:null,
            dialog_logout:false,
            dialog_setting:false,
            userInfo:{
                username:'',
                readName:'',
                position:'',
                userRole:'',
            }
        }
    },
};
</script>

<style scoped lang="scss">
    
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
        padding-bottom: 10px;
    }
    .home-body2{
        margin-left:5%;
        margin-right: 5%;
        padding-top:20px;
        padding-bottom: 10px;
    }
    .img-demo{
        filter:brightness(19200%)  saturate(0%)
    }
</style>