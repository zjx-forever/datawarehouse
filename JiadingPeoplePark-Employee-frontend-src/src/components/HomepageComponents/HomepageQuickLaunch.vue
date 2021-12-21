<template>
  <div class="home-notice">
      <v-card  :ripple="{ class: null }" elevation="10" class="card-noborder" :class="cardNightClass">
            <div class="home-title2 home-body2">
                <v-icon>mdi-star-shooting</v-icon> {{$t('home.ql')}}
            </div>
            
            <div class="home-body">
                <v-container fluid class="fill-height justify-center">
                    <v-row align="center" class="mx-0">
                        <v-col cols="12" md="6" class="align-self-stretch">
                            <homepage-quick-launch-button icon="mdi-information-outline" route="/showInformationManagement" title="演出管理" info="管理对外演出活动"/>
                        </v-col>
                        <template v-if="userRole ==='admin'">
                        <v-col cols="12" md="6" class="align-self-stretch">
                            <homepage-quick-launch-button icon="mdi-account-edit" route="/employeeManagement/check" title="工作考核" info="检查工作考核安排"/>
                        </v-col>
                        </template>
                        <template v-if="userRole==='employee'">
                        <v-col cols="12" md="6" class="align-self-stretch">
                            <homepage-quick-launch-button icon="mdi-account-edit" route="/plantInfoManagement" title="植物管理" info="园区新增植物记录"/>
                        </v-col>
                        </template>
                        <v-col cols="12" md="6" class="align-self-stretch">
                            <homepage-quick-launch-button icon="mdi-home" route="/bookingReview" title="预约管理" info="对于团队预约参观进行审批"/>
                        </v-col>
                        <v-col cols="12" md="6" class="align-self-stretch">
                            <homepage-quick-launch-button icon="mdi-dog" route="/fundManagement" title="领养审核" info="审核动物领养信息"/>
                        </v-col>
                    </v-row>
                </v-container>
            </div>
      </v-card>
  </div>
</template>

<script>
import HomepageQuickLaunchButton from './HomepageQuickLaunchButton.vue';

export default {
    components: {HomepageQuickLaunchButton  },
    name: 'HomepageQuickLaunch',
    data: () => {
        return {
            userRole:localStorage.getItem('userRole')
        }
    },
    props:{
        drawer:Boolean,
    },
    methods:{
        goto(){

        }
    },computed:{
        cardNightClass(){
            return{
                'cardcolor-light':!this.$vuetify.theme.dark,
                'cardcolor-dark':this.$vuetify.theme.dark,
                
            }
        }
    }
};
</script>

<style scoped lang="scss">
    .home-ql{
        cursor:pointer;
    }
    .ql-title-text-sub{
        margin-top:10px;
    }
    .ql-title-text{
        font-size:20px;
        font-weight: bold;
        margin-top:20px;
        display: block;
    }
    .ql-title{
        padding-top:20px;
        padding-bottom:20px;
        text-align: center;
    }
    .ql-icon-xl{
        transform: scaleX(150%) scaleY(150%)
    }
    .ql-icon{
        text-align: center;
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
        padding-bottom: 10px;
    }
    .home-body2{
        margin-left:5%;
        margin-right: 5%;
        padding-top:20px;
        padding-bottom: 10px;
    }
</style>