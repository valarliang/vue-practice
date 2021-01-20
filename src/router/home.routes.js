export default [{
  path:'/',
  name:'Home',
  component: () => import('../views/home.vue'),
  children: [
    {
      path:'/compile',
      name:'Compile',
      component: () => import('@/views/compile.vue'), // 懒加载式引入，当跳转到时才进行引入chunk
    },{
      path:'/defineProperty',
      name:'DefineProperty',
      component: () => import('@/views/defineProperty.vue'),
    },{
      path:'/proxy',
      name:'Proxy',
      component: () => import('@/views/proxy.vue'),
    }    
  ]
}]