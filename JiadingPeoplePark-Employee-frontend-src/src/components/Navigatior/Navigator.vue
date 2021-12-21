<template>
  <div class="navigator-container" style="transition:all .5s">
      <slidebar-head-icon></slidebar-head-icon>
      <v-divider></v-divider>
      <div class="navigator-body">
        <v-list dense nav class="bold">
          <v-list-item app link nav @click="routerGo('/')" class="vlist-item">
              <v-list-item-icon><v-icon>mdi-home</v-icon> </v-list-item-icon>
              <v-list-item-content><v-list-item-title><span class="font-weight-bold nav-font">{{$t('common.homepage')}}</span></v-list-item-title>
            </v-list-item-content>
            
          </v-list-item>
          <v-list-group v-for="item in navList" :key="item.name" app link nav class="vlist-group">
            <template v-slot:activator   app link nav>
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content >
                  <v-list-item-title class="font-weight-bold nav-font"><span class=".nav-font">{{ $t(item.name) }}</span></v-list-item-title>
                </v-list-item-content>
            </template>
            <!-- <template v-if="item.roles.includes(localStorage.getItem('userRole'))"> -->
            <router-link v-for="item2 in item.child" :key="item2.name" :to="(item2.route==undefined)?'/':item2.route" style="text-decoration:none;">
              <v-list-item  app link nav class="vlist-item">
                  <v-list-item-content>
                    <v-list-item-title><span class="nav-padding nav-font">{{ $t(item2.name) }}</span></v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-icon>
                    <v-icon>{{ item2.icon }}</v-icon>
                  </v-list-item-icon>
              </v-list-item>
            </router-link>

          </v-list-group>
        </v-list>
        <hr/>
        <div class="halfwidth inlb">
          <v-btn outlined block class="fullwidth"  color="" style="border-color:#AAAAAA" @click="reloadPage">
            <v-icon>mdi-refresh</v-icon>重载
          </v-btn>
        </div>
        
        <div class="halfwidth inlb">
          <v-btn outlined block  class="fullwidth" style="border-color:#AAAAAA" v-bind="attrs" v-on="on"  color="" @click="dialog_setting=true">
            <v-icon>mdi-cog</v-icon>设置
          </v-btn>
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
        </div>
        
      </div>
  </div>
</template>

<script>
import SettingCard from '../CommonComponents/SettingCard.vue';
import SlidebarHeadIcon from './SlidebarHeadIcon.vue';
import {mapState} from 'vuex'
export default {
  components: { SlidebarHeadIcon, SettingCard ,mapState},
  name: 'Navigator',
  props:{
      drawer:Boolean,
      lock:Boolean
  },
  data: () => {
    return {
      navList:[],
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' },
      ],
      placeholders:[SlidebarHeadIcon],
      dialog_setting:false,
    }
  },
  computed:{
    getNavigatorPrimaryItems(){
      return this.$store.state.sProjectFunctions;
    },
   
  },
  created(){
    this.createNavList()
  },
  methods:{
    createNavList(){
      var List=this.$store.state.sProjectFunctions;
      var finalList=[]
      if(localStorage.getItem('userRole')=='admin'){
        this.navList=List
        console.log('admin,this.navList==',this.navList)
        return;
      }else{
        List.forEach(element => {
          // console.log(element.roles)
          var roleList=element.roles
          roleList.forEach(role=>{
            // console.log(role)
            if(role==='employee'){
              finalList.push(element)
            }
          })
        });
        console.log('List==',List)
        console.log('finalList=',finalList)
        this.navList=finalList
        console.log('employee,this.navList==',this.navList)

      }
      
    },
    reloadPage(){
      window.location.reload();
    },
    routerGo(x){
      this.$router.push(x);
    }
  }
};
</script>

<style scoped lang="scss">
  .navigator-container{
    //height:100%;
    overflow:overlay;
    padding-bottom:200px;
  }
  .navigator-pri-item{
    border-radius:15px;
    font-size:17px;
    font-weight: bold;
  }
</style>