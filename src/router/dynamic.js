import Layout from "@/views/layout";

export default [{
  path:'/about',
  component: Layout,
  redirect: '/about/index',
  children: [{
    path: 'index',
    component: () => import('@/views/about.vue'),
  },{
    path: 'articles',
    component: () => import('@/views/articles.vue'),
    meta: {
      roles: ['administrator']
    }
  }]
}]