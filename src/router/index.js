import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'HelloWorld',
      // component: HelloWorld
      component: resolve => require(['../pages/login.vue'],resolve)
    },
    {
      path: '/home',
      component: resolve => require(['../components/Home.vue'],resolve),
      children:[
        {
          path: '/info',
          component: resolve => require(['../pages/InfoPage.vue'],resolve)
        },
        {
          path: '/consumer',
          component: resolve => require(['../pages/ConsumerPage.vue'],resolve)
        },
        {
          path: '/singer',
          component: resolve => require(['../pages/SingerPage.vue'],resolve)
        },
        {
          path: '/song_list',
          component: resolve => require(['../pages/SongListPage.vue'],resolve)
        },

      ]
    },

  ]
})
