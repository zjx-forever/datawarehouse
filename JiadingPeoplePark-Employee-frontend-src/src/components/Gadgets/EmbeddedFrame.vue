<template>
  <div class="widget">
      <iframe :src="path" scrolling="no" allowtransparency="true"  style="background-color:transparent;"/>
  </div>
</template>

<script>

export default {
    components: {  },
    name: 'EmbeddedFrame',
    props:{
        path:String,
    },
    methods:{
        
    }
};
</script>

<style scoped lang="scss">
    .widget{
        z-index: 999999999;
        position: absolute;
        right:0px;
        bottom:0px;
        width: 300px;
        height:300px;
        iframe{
            border:none;
            width:300px;
            height: 300px;
            //background: cyan;
            height: 100%;
            width:100%;
            overflow: hidden;
        }
    }
</style>