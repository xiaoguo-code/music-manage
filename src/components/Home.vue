<template>
  <div>
    <the-header></the-header>
    <the-aside></the-aside>
    <div class="content-box" :class="{'content-collapse':collapse}">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
  import bus from '../assets/js/bus'
  import TheHeader from "./TheHeader";
  import TheAside from "./TheAside";
    export default {
        name: "Home",
        components:{
            TheAside,
            TheHeader
        },
        data(){
            return{
                collapse:false,
            }
        },
        //页面创建时
        created() {
            //通过bus进行组件间的通信，来折叠侧边栏
            bus.$on('collapse',msg =>{
                this.collapse=msg;
            })
        }
    }
</script>

<style scoped>

</style>
