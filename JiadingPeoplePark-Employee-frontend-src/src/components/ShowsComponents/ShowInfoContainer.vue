<template>
    <div class="show">
        <show-info-query/>
    </div>
</template>
<script>
import ShowInfoQuery from './ShowInfoQuery.vue'
export default {
    name: 'ShowInfoContainer',
    created(){
    },
    methods:{
    },
    components:{
        ShowInfoQuery,
    },data:()=>{
        return{
            tab:null,
        }
    }
}
</script>
<style scoped lang="scss">

</style>
