<template>
    <div class="show-info">
        <!-- <span class="show-info-title primary-color" >
            <v-icon color="primary">el-icon-tickets</v-icon> 演出信息管理
        </span> -->
        <show-info-container/>
    </div>
</template>

<script>
import ShowInfoContainer from '../components/ShowsComponents/ShowInfoContainer.vue'
export default {
    name: 'ShowInfoManagement',
    created(){
        this.$store.dispatch('alterTopNavTitle',{title:'演出信息管理'})
    },
    components:{
       ShowInfoContainer,
    },methods:{
        routerGo(x){
            this.$router.push(x);
        }
    }
  
}
</script>
<style scoped lang="scss">
    .show-info{
        margin-top:10px;
    }
    .show-info-title{
        font-size:23px;
        font-weight: bold;
        letter-spacing: 1px;
    }
</style>