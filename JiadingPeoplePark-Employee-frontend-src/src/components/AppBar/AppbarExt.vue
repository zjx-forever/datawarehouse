<template>
  <div class="appbar-ext">
      <alert-messagebox
        :alertTitle="`退出登录`"
        :alertBody="`是否退出嘉定人民公园管理系统？`"
        :alertLevel="`warning`"
        ref="error_done"
        @alertConfirm="exitLogin"
      />
      <span class="appbar-acc">{{userInfo.realName}} ({{userInfo.username}})</span>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="margin-rt" color="primary" text v-bind="attrs"
            v-on="on" >
            <v-icon color="white" class="float-right" @click="goBack">mdi-arrow-left</v-icon>
          </v-btn>
        </template>
        上一页
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="margin-rt" color="primary" text v-bind="attrs"
            v-on="on">
            <v-icon color="white" class="float-right" @click="switchLock">mdi-lock</v-icon>
          </v-btn>
        </template>
        锁定
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="margin-rt" color="primary" text @click="exitLoginCall" v-bind="attrs"
            v-on="on">
            <v-icon color="white" class="float-right" >mdi-exit-to-app</v-icon>
          </v-btn>
        </template>
        退出
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn stclass="margin-rt" color="primary" text @click="switchNightMode" v-bind="attrs"
            v-on="on">
            <v-icon color="white" class="float-right" >mdi-weather-night</v-icon>
          </v-btn>
        </template>
        切换夜间模式
      </v-tooltip>
      
  </div>
</template>

<script>
import DisintegrateButton from '../Gadgets/DisintegrateButton.vue';
import AlertMessagebox from '../CommonComponents/AlertMessagebox.vue'
import {getEmployeeInfo} from '@/apis/login'
export default {
    name: 'AppbarExt',
    components:{DisintegrateButton,AlertMessagebox},
    data(){
      return{
        locked:false,
        userInfo:{
                username:'',
                readName:'',
                position:'',
                userRole:'',
            }
      }
    },
    methods:{
      goBack(){
        this.$router.back()
      },
      exitLogin(){
        localStorage.setItem('Token','')
        localStorage.setItem('username','')
        localStorage.setItem('userRole','')
        localStorage.setItem('id','')
        localStorage.setItem('position','')
        localStorage.setItem('realName','')
        window.location.href='/Login'
      },
      exitLoginCall(){
        this.$refs.error_done.showAlert()
      },
      switchNightMode(){
        this.$vuetify.theme.dark=!this.$vuetify.theme.dark
        localStorage.setItem('Appearance.darkMode',this.$vuetify.theme.dark)
      },
      switchLock(){
        this.$emit('lockPress')
      },
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
    },
    computed:{
      Lock(){
        return{
          'hidden':this.locked==false
        }
      },
    },created(){
        this.getCurrentUserInfo()  
    },
};
</script>

<style scoped lang="scss">
    .hidden{
      display:none;
    }
    .margin-rt{
      margin-right:10px;
    }
    .appbar-acc{
      font-weight: bold;
      color:#ffffff;
      margin-right:15px;
    }
    .lock-screen{
      position:fixed;
      left:0px;
      right:0px;
      top:0px;
      bottom:0px;
    }
</style>