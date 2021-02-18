import Layout from "@/views/layout";

export default [{
  path:'/about',
  component: Layout,
  redirect: '/about/index',
  children: [{
    path: 'index',
    component: () => import('@/views/about.vue'),
    name: 'about',
    meta: {
      title: "About",
      icon: "qq",
      roles: ['administrator']
    },
  }]
}]