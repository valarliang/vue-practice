export default {
  path:'/home',
  name:'Home',
  component: () => import('../views/home.vue'),  // 懒加载式引入，当跳转到时才进行引入chunk
}