<template>
    <div>
        <alert-messagebox
        :alertTitle="`无法解锁`"
        :alertBody="`在解锁时发生错误。请检查密码输入是否有效。`"
        :alertLevel="`error`"
        :alertOnlyConfirm="true"
        ref="error_done" />

    <ParticleEffectButton :visible.sync="btnOps.visible" :animating.sync="btnOps.animating"
    :options="btnOps" cls="btn-cls" style="height:100%;width:100%"
    ref="particle_btn_body">
        
        <div @click="allowProp" ref="parent_prop">
            <div @click="forbiddenEventPropagation" class="strip-bg-s lock-screen">
                <div class="lock-wrapper lock-wrapper-dbtn">
                    <particles-bg 
                    class="particle-bg particle-bg-dbtn"
                    type="lines"
                    color="#000000"
                    :bg="true"
                    :canvas.sync="canvasObject"/>

                    <div class="lock-wrapper2">
                        <v-icon
                            x-large
                            color="white"
                            class="magnify"
                        >mdi-lock</v-icon>
                        <br/>
                        <span class="lock-title">
                            {{$t('lock.locked')}}
                        </span>
                        <span>
                            {{$t('lock.lockedDesc')}}

                        </span><br/><br/>
                        <div style="text-align:center;padding-left:30%;padding-right:30%">
                            <v-text-field  v-model="Unlock" type="password" outlined dark filled solo color="white" />
                            <v-btn color="primary" @click="unl">解锁</v-btn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </ParticleEffectButton>
  </div>
</template>

<script>
import ParticleEffectButton from "vue-particle-effect-buttons"
import AlertMessagebox from '../CommonComponents/AlertMessagebox.vue'
import {userAuth} from "../../apis/login"
export default {
    name:'DisintegrateButton',
    methods:{
        unl(){
            userAuth(
            {
                username:localStorage.getItem('username'),
                password:this.Unlock
            }
            ).then(response=>{
                console.log('success')
                localStorage.setItem('Token',response.data.token)
                localStorage.setItem('Token2','0')
                this.gohome();
            }).catch(err=>{
                console.log(localStorage.getItem('username'))
                console.log(this.Unlock)
                console.log('login fails')
                this.$refs.error_done.showAlert()
            })
        },
        switchState(){
            if(!this.btnOps.visible){
                this.btnOps.visible=!this.btnOps.visible
            }else{
                //I wonder if there is a way to avoid performing operations to DOMs
                let x=document.getElementsByClassName('particles-button')
                x[0].click();
            }
        },
        forbiddenEventPropagation(){
            event.stopImmediatePropagation()
        },
        allowProp(){
            console.log('Hl')
        },
        flushCanvas(){
            let x=document.getElementsByClassName('particle-bg-dbtn')
            let y=document.getElementsByClassName('lock-wrapper-dbtn')
            let i=0;
            for(;i<x.length;i++){
                if(x[i].tagName.toLowerCase()=='canvas'){
                    x[i].width=y[0].offsetWidth;
                    x[i].height=y[0].offsetHeight
                }
            }
            let myEvent = new Event('resize');
            window.dispatchEvent(myEvent)
            //End of Operating DOMs
        },
        gohome() {
            window.location.href='/'
        },
    },
    data() {
        return {
            canvasObject:null,
            colorPreset:{
                cl:'#44cef6'
            },
            Unlock:'',
            btnOps: {
                duration:1500,
                type: "triangle",
                easing: "easeOutQuart",
                size: 6,
                particlesAmountCoefficient: 7,
                oscillationCoefficient: 0,
                color:'#44cef6',
                
                onComplete: () => {
                    console.log("Complete")
                    console.log(this.btnOps.visible)
                    if(this.btnOps.visible===false)
                    {
                        console.log("ACTIVATE")
                        this.$emit('disbtn_complete')
                    }
                    this.$emit('disbtn_complete_all')
                    this.flushCanvas();
                },
                onBegin: () => {
                    console.log("begin");
                    console.log("=")
                    console.log(this.btnOps.visible)
                },
                visible: false,
                animating: false
            },
        }
    },
    components: {
        ParticleEffectButton,
        AlertMessagebox,
    }
};
</script>
<style scoped lang="scss">
    .lock-screen {
      position:absolute;
      left:0px;
      right:0px;
      top:0px;
      bottom:0px;
      z-index:6;
      //background-color:#000000;
      cursor:default;
    }
    .lock-wrapper{
        text-align: center;
        position:fixed;
        left:0px;
        right:0px;
        top:0px;
        bottom:0px;
        width:100%;
        height:100%;
        overflow: hidden;
    }
    .magnify{
        transform: scaleX(300%) scaleY(300%) scaleZ(300%);
        margin-top:150px;
        margin-bottom:50px;
    }
    .lock-title{
        font-size:30px;
        display: block;
        font-family: "benderregular";
    }
    .lock-wrapper2{
        z-index: -999;
    }
    .particle-bg{
        position: "absolute";
        z-index: 999;
        top: 0;
        left: 0
    }
</style>