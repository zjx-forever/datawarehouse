<template>
  <v-app>
    <v-fab-transition>
      <div class="wrap" v-if="showLoadingComponent">
        <dynamic-title/>
      </div>
    </v-fab-transition>
    <v-navigation-drawer :class="rejectMouse" v-model="drawer" absolute temporary app style="width:350px">
      <navigator :lock="locked"></navigator>
    </v-navigation-drawer>

    <v-app-bar app color="primary" v-if="showTopNavbar" transition="slide-x-transition"> 
      <v-app-bar-nav-icon color="white"  @click="switchDrawer"></v-app-bar-nav-icon>
        <vue-typing 
              :text="$t(getAppbarTitle)" 
              :rewrite="true"  
              class="wider-letterspacing app-barx"  
              :class="getAppbarStyleClass"  
              :framerate="2" :cursorOptions="VueTypingCursor" />

        <appbar-ext @lockPress="switchLock()"
        class="v-right"></appbar-ext>
      </v-app-bar>

    <v-main>
      <div class="wrap" :class="Lock">
        <disintegrate-button 
        @disbtn_complete_all="unlockLockBtn"
        @disbtn_complete="switchLock2"
        ref="disint_btn" class="lock-screen " />
      </div>
        <v-container fluid>
          <page-container/>
        </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppbarExt from './components/AppBar/AppbarExt.vue';
import EmbeddedFrame from './components/Gadgets/EmbeddedFrame.vue';
import Navigator from './components/Navigatior/Navigator.vue';
import PageContainer from './components/PageContainer.vue';
import DisintegrateButton from './components/Gadgets/DisintegrateButton.vue';
import DynamicTitle from './components/Gadgets/DynamicTitle.vue';
import VueTyping from 'vue-typing'
export default {
  name: 'App',
  components:{
    Navigator,
    AppbarExt,
    PageContainer,
    EmbeddedFrame,
    DynamicTitle,
    DisintegrateButton,
    VueTyping
  },
    EmbeddedFrame,
  data: () =>{
    return{
      drawer: false,
      locked:false,
      lockStatus:false,
      showLoadingComponent:true,
      VueTypingCursor:{ blinking: true, cursor: "|", color: "black", framerate: 5},
    }
  },
  computed:{
    rejectMouse(){
      return{
        'reject-mouse':this.locked
      }
    },
    Lock(){
        return{
          'hidden':this.locked==false
        }
      },
    getAppbarTitle(){
      return this.$store.state.sTopBarTitle;
    },
    getAppbarStyleClass(){
      return {
        'V-white':true
      }
    },
    showTopNavbar(){
      if(this.$route.path.toLowerCase()!='/login'){
        return true;
      }
      return false
    }
  },
  created(){
    //Apply Dark Mode
    let darkMode = localStorage.getItem('Appearance.darkMode')
    if(isNaN(darkMode)||darkMode==''||darkMode==='false'){
      this.$vuetify.theme.dark=false;
    }
    if(darkMode==='true'){
      this.$vuetify.theme.dark=true
    }
    //Hide Loading Wrapper
    if(localStorage.getItem('SkipAniT')==='1'){
        this.showLoadingComponent=false
        localStorage.setItem('SkipAniT','0')
    }else{
      setTimeout(
        ()=>{
          this.showLoadingComponent=false
        },1000
      )
    }
    
    //Lock
    
  },
  methods:{
    switchDrawer(){
      if(this.locked){
        return 0;
      }
      this.drawer=!this.drawer;
    },
    switchLock(){
      if(this.lockStatus){
        return;
      }
      localStorage.setItem('Token2','1')
      this.lockStatus=true
      if(this.locked===false){
        console.log("CALL A")
        this.locked=!this.locked;
        this.$refs.disint_btn.switchState()
      }else{
        console.log("CALL B")
        this.$refs.disint_btn.switchState()
      }
    },
    switchLock2(){
      this.locked=!this.locked;
      console.log("Changed Lock")
    },
    unlockLockBtn(){
      //this.lockStatus=false;
    }
    
  },
  mounted(){
    //getList();
    this.$nextTick(()=>{
      setTimeout(
        ()=>{
          if(localStorage.getItem('Token2')==='1'){
            this.switchLock()
          }
        },500
      )
      
    })
    
  }
};
</script>
<style scoped lang="scss">
  $body-font-family: 'PTSans','HanSans';
  .v-application {
      font-family: $body-font-family, sans-serif !important;
  }
  .v-right{
    position: fixed;
    right:20px;
  }
  .hidden{
    display: none;
  }
  .wrap{
    position: absolute;
    bottom:0px;
    top:0px;
    left:0px;
    right:0px;
    z-index: 99999999;
    overflow: hidden;
  }
  #app{
    user-select: none;
  }
  .app-barx{
    font-size:21px;
  }
  .V-white{
    color:white;
}
</style>
