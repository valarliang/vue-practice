import Layout from "@/views/layout";
import Home from '@/views/home';

export default [{
  path: "/",
  component: Layout,
  redirect: "/home",
  children: [{
    path:'/home',
    name:'home',
    component: Home,
    children: [
      {
        path:'compile',
        name:'compile',
        component: () => import('@/views/compile.vue'), // 懒加载式引入，当跳转到时才进行引入chunk
      },{
        path:'defineProperty',
        name:'jsdefineProperty',
        component: () => import('@/views/defineProperty.vue'),
      },{
        path:'proxy',
        name:'jsproxy',
        component: () => import('@/views/proxy.vue'),
      },{
        path:'visualize',
        name:'visualize',
        component: () => import('@/views/visualize.vue'),
      },{
        path:'setKeyWithIndex',
        name:'setKeyWithIndex',
        component: () => import('@/views/setKeyWithIndex.vue'),
      }
    ]
  }]
},{
  path:'/G6graph',
  name:'G6graph',
  component: () => import('@/views/G6graph.vue'),
}]