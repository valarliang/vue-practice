export default [
  {
    path:'/article1',
    name:'Article1',
    component: () => import('@/views/article1.vue')
  },
  {
    path:'/article2',
    name:'Article2',
    component: () => import('@/views/article2.vue')
  }
]