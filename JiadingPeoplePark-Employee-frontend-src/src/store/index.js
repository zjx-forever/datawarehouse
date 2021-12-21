import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
let store= new Vuex.Store({
    state: {
        //资源路径
        sAsset_HamburgerImg:'assets/top-navigation-bar-hamburger.png',

        sAsset_SlidebarHeadIcon:'assets/slide-bar-head-icon-new.png',

        sAsset_WelcomeIcon:'assets/welcome-icon-new.png',
        sAsset_Login_picture:'assets/welcome-icon-new.png',
        sAsset_PageBackground:'assets/login_bg.jpg',
        sAsset_PageUserImage:'assets/user-image.png',
        sAsset_PageBackground2:'assets/background-trial-2-new.jpeg',

        //项目常量
        sProjectName:"嘉定人民公园管理系统",
        sTopBarTitle:'嘉定人民公园管理系统',
        sPageName:{
            login:'登录',
            mainPage:'嘉定人民公园管理系统——首页',

        },
        sProjectFunctions:[
          //{name:'组件示例',route:'',icon:'mdi-puzzle',child:[
          //  {name:'组件示例',route:'/componentView',icon:'mdi-puzzle',child:[]}
          //]},
          {name:'navbar.activityManagement',route:'',icon:'mdi-radio',roles: ['employee', 'admin'],child:[
            {name:'navbar.showinfoManage',route:'/showInformationManagement',icon:'mdi-information-outline',roles: ['employee', 'admin'],child:[]},
          ]},


        ],


        //CSS相关定义
        scSlideBarLeft:300,
        scSlideBarLeftInitial:0,
        scSlideBarCalloutStat:0,

        //CSS相关变量
        sSlideBarLeft:0,

        bUseL2D:false,
        langOpts:[
          {sw:'简体中文(zh-CN)',cd:'zh-CN',id:0},
          {sw:'English(en-US)',cd:'en-US',id:1}
        ],
        defaultLang:0,
    },
    mutations: {
        calloutSlideBar(){
            this.state.scSlideBarCalloutStat=1-this.state.scSlideBarCalloutStat;
            if(this.state.scSlideBarCalloutStat===1){
                this.state.sSlideBarLeft=this.state.scSlideBarLeftInitial+this.state.scSlideBarLeft;
            }else{
                this.state.sSlideBarLeft=this.state.scSlideBarLeftInitial;
            }
        },
        alterTopNavTitle(state,param){
            state.sTopBarTitle=param.title;
        },
        showToastNotify(state,param){
            let toastConfig={
              position: "top-center",
              timeout: 1400,
              closeOnClick: true,
              pauseOnFocusLoss: true,
              pauseOnHover: true,
              draggable: true,
              draggablePercent: 0.6,
              showCloseButtonOnHover: true,
              hideProgressBar: false,
              closeButton: true,
              icon: true,
              rtl: false
            };
            if(param.type=="error"){
              this._vm.$toast.error(param.info,toastConfig);
            }
            if(param.type=="success"){
              this._vm.$toast.success(param.info,toastConfig);
            }
            if(param.type=="warning"){
              this._vm.$toast.warning(param.info,toastConfig);
            }
            if(param.type=="default"){
              this._vm.$toast(param.info,toastConfig);
            }
        }
    },
    actions: {
        alterTopNavTitle({commit},param){
            commit('alterTopNavTitle',param)
        },
        showToastNotify({commit},param){
            commit('showToastNotify',param)
        }
    },
    modules: {
    }
})
export default store;
