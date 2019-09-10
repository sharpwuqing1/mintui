import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import ToplistDetail from '@/components/toplistDetail'
import Play from '@/components/play'
import Recom from '@/components/sub/Recom'
import Search from '@/components/sub/Search'
import Top from '@/components/sub/Top'
import Ele from '@/components/Ele'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/index/recom'
    },
    {
      path: '/toplist/:topid',
      name:'toplist',
      component: ToplistDetail
    },
    {
      path: '/play/:data',
      name:'play',
      component: Play
    },
    {
      path: '/index',
      component: Index,
       children:[
      		{
      		    path:'/',
      		    component: Recom,
       		},
       		{
       			path:'recom',
      		    component: Recom,
       		},
       		{
       			path:'search',
      		    component: Search,
       		},
       		{
       			path:'top',
       			component:Top
       		}   
       ]
    },
    {
      path: '/ele',
      component: Ele
    }
  ]
})
