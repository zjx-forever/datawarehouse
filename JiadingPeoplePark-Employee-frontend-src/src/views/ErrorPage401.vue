<template>
    <div class="home">
        <error-401/>
    </div>
</template>

<script>
import  Error401 from  '../components/ErrorPage/401.vue'
export default {
    name: 'ErrorPage401',
    components:{
        Error401,
    }, created(){
        this.$store.dispatch('alterTopNavTitle',{title:'ErrorPage401'})
    }
}
</script>
<style scoped lang="scss">

</style>