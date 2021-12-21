<template>
    <div class="home">
        <error-404/>
        <el-button
                class="fileParent"
               type="success"
               icon="el-icon-plus"
                style="background:#273C48"
               @change="uploadFile"
             >
               <input class="file" type="file" @change="uploadFile" multiple="multiple" />//上传框
               <img :src="tempImg" v-if="tempImg" alt />//缩略图
             </el-button>
    </div>
</template>

<script>
import  Error404 from  '../components/ErrorPage/404.vue'
export default {
    name: 'ErrorPage404',
    components:{
        Error404,
    }, created(){
        this.$store.dispatch('alterTopNavTitle',{title:'ErrorPage404'})
    }
}
</script>
<style scoped lang="scss">

</style>