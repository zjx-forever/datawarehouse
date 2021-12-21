<template>
    <v-dialog persistent v-model="Show" width="400">
        <v-card >
            <v-card-title>
                <span class="pending-title">
                    {{$t('pendingProg.Submitting')}}
                </span>
            </v-card-title>
            <v-divider/>
            <br/>
            <v-card-text>
                {{$t('pendingProg.PleaseWait')}}
                <span v-if="PendingList!=null&&PendingList!=undefined&&PendingList.length>0">
                    <br/><br/>
                    <span v-for="i in PendingList.length" :key="i-1" class="block">
                        <span v-if="getStatus(i-1)" :key="'p'+i+'xa'">
                            <v-progress-circular :size="15" :width="1" indeterminate color="black"
                            class="right-padding-adjust">
                            </v-progress-circular>
                        </span>
                        <span  v-else :key="'p'+i+'xb'">
                            <v-icon>mdi-check</v-icon>
                        </span>
                        <span>
                            {{PendingList[i-1]}}
                        </span><br/>
                    </span>
                    
                </span>
                <br/><br/>
                <v-progress-linear indeterminate striped color="primary" class="mb-0"></v-progress-linear>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    components: {  },
    name: 'PendingProgressCard',
    beforeCreate(){
    },
    created(){
        let i=0
        for(;i<this.PendingList.length;i++){
            this.PendingStatus.push(0);
        }
    },
    computed:{
        getStatus(){
            return(x)=>{
                return this.PendingStatus[x]===0;
            }
        }
    },
    props:{
        Show:Boolean,
        PendingList:{
            type:Array,
            default:()=>[]
        }
        
    },
    data(){
        return{
            PendingStatus:[]
        }
    },
    methods:{
        show(){
            this.Display=true;
            let i=0
        },
        reset(){
            let i=0
            for(;i<this.PendingList.length;i++){
                this.$set(this.PendingStatus,i,0)
                console.log('RESET')
            }
        },
        complete(x){
            this.$set(this.PendingStatus,x,1);
        }
    }
};
</script>
<style scoped>
    .block{
        display:block !important;
    }
    .right-padding-adjust{
        margin-right:10px;
    }
</style>