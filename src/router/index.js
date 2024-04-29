import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Container from '@/components/Container'
import Flightline from '@/components/Flightline'
import Home from '@/components/Home'
import Food from '@/components/Food'
import Chat from '@/components/Chat'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/test',
      name: 'Container',
      component: Container
    },{
      path:'/home',
      name:'Home',
      component:Home
    },{
      path:'/Flightline',
      name:'Flightline',
      component:Flightline
    },
    {
      path:'/Food',
      name:'Food',
      component:Food
    },
    {
      path:'/Chat',
      name:'Chat',
      component:Chat
    }
  ]
})
