<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu"
             :default-active="onRoutes"
             :collapse="collapse"
             background-color="#334256"
             text-color="#ffffff"
             active-text-color="#20a0ff"
             router  >
      <template v-for="item in items">
        <template>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            {{item.title}}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
  import bus from '../assets/js/bus'
    export default {
        name: "TheAside",
        data:function () {
            return{
                collapse:false,//菜单折叠属性，默认不是折叠
                items:[
                    {
                        icon:'el-icon-document',
                        index:'info',
                        title:'系统首页'
                    },
                    {
                        icon:'el-icon-document',
                        index:'consumer',
                        title:'用户管理'
                    },
                    {
                        icon:'el-icon-document',
                        index:'singer',
                        title:'歌手管理'
                    },
                    {
                        icon:'el-icon-document',
                        index:'song_list',
                        title:'歌单管理'
                    },
                ],
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','')
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
  .sidebar{
    display: block;
    position:absolute;
    left: 0;
    top: 70px;
    bottom:0;
    background-color: #334256;
    overflow-y: scroll;
  }
  .sidebar::-webkit-scrollbar{
    width: 0;
  }
  .sidebar >ul{
    height: 100%;
  }
  .sidebar-el-menu:not(.el-menu--collapse){
    width: 150px;
  }
</style>
