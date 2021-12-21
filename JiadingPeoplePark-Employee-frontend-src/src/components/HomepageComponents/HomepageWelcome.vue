<template>
  <div class="home-notice">
      <v-card :ripple="{ class: null }" elevation="10"
       class="card-noborder" :class="cardNightClass"
        color="transparent" >
            <div :style="getBg" class="home-welcome-wrapper">
            </div>
            <div :class="cardNightClassX">
            </div>
            <div class="home-body">
                <div class="home-centerx">
                    <v-img contain :src="avatarImg" aspect-ratio="16/9" height="150px" width="150px" class="img imgx"></v-img>
                </div>
                <div class="home-title">
                    <span class="primary--text sharp">#</span>
                    {{$t('home.greeting')}}
                </div>
                <div class="home-description">
                    嘉定人民公园——嘉定校区与周边普通居民沟通的桥梁，我们目标是将同济大学嘉定校区打造一个集演出参观、
                    活动预约、动植物保护、领养管理于一体，提供校园参观服务的活泼有爱的人民公园。
                    让周边居民领略同济兼具自然景观和人文气息的绝美风光，
                    在嘉定校区的朗朗书声和蝶飞蜂舞中感受到同济人身上兼具的理工科的严谨与文科的浪漫。
                    让嘉定校区成为一个不仅属于同济人的同济，也是天下人的同济。
                    <br/>祝工作顺利，生活愉快！
                </div>
            </div>
      </v-card>
  </div>
</template>
<script>
export default {
    components: {  },
    name: 'HomepageWelcome',
    props:{
        drawer:Boolean,
    },
     created(){
        let urlTemp = this.$store.state.sAsset_WelcomeIcon;
        this.avatarImg = require("@/"+urlTemp)
        let urlTemp2 = this.$store.state.sAsset_PageBackground2;
        this.welcomeBg = require("@/"+urlTemp2)
    },data:()=>{
        return{
            avatarImg:null,
            welcomeBg:null,
        }
    },
    methods:{
        
    },
    computed:{
        cardNightClass(){
            return{
                'cardcolor-light':!this.$vuetify.theme.dark,
                'cardcolor-dark':this.$vuetify.theme.dark,
            }
        },
        cardNightClassX(){
            return{
                'home-welcome-wrapperx':!this.$vuetify.theme.dark,
                'home-welcome-wrapperx-dark':this.$vuetify.theme.dark,
            }
        },
        getBg(){
            return{
                background:'url('+this.welcomeBg+')  no-repeat center center ',
                'background-size':'cover',
            }
        },
    }
};
</script>

<style scoped lang="scss">
    .sharp{
        font-size:30px;
    }
    .img{
        filter:grayscale(100%) contrast(200%)
    }
    .home-welcome-wrapper{
        z-index: 0;
        position:absolute;
        width:100%;
        height:100%;
    //    opacity:0.3 ;filter:alpha(opacity=80)

    }
    .home-welcome-wrapperx {
        z-index: 1;
        position:absolute;
        width:100%;
        height:100%;
        background-color:#ffffffcc;
        opacity:0.99;filter:alpha(opacity=80)

    }
    .home-welcome-wrapperx-dark {
        z-index: 1;
        position:absolute;
        width:100%;
        height:100%;
        background-color:#000000cc;
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
        padding-top:0px;
        height:400px;
    }
    .home-title{
        font-size:25px;
        font-weight: bold;
        display:block;
    }
    .home-body{
        padding-top:20px;
        position:absolute;
        margin-left:7%;
        margin-right: 7%;
        z-index:32;
    }
    .home-description{
        z-index: 32;
    }
    .home-welcome{
        display:inline-block;
        vertical-align: top;
        margin-bottom:20px;
        background:transparent;
    }
    /* Overriding Vuetify Img Style */
    .v-image__image{
        background-position-x: 0 !important;
    }
</style>