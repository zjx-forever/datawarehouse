<template>
    <v-card class="rounded pointer" >
        <div class=" ql-title" :class="btnNightClass" @click="routerGo(route)">
            <div class="ql-icon">
                <v-icon x-large class="ql-icon-xl">{{icon}}</v-icon>
            </div>
            <span class="ql-title-text">{{title}}</span>
            <span class="ql-title-text-sub">{{info}}</span>
        </div>
    </v-card>
  
</template>

<script>

export default {
    components: {  },
    name: 'HomepageQLButton',
    props:{
        title:String,
        info:String,
        icon:String,
        route:String,
    },
    methods:{
        routerGo(x){
            this.$router.push(x);
        }
    },computed:{
        btnNightClass(){
            return{
                'background-wg':!this.$vuetify.theme.dark,
                'background-wg-dark':this.$vuetify.theme.dark,
                
            }
        }
    }
};
</script>

<style scoped lang="scss">
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
    
</style>