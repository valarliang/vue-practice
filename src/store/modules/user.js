import router, { createRouter, routes} from '@/router'

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('token'),
    name: localStorage.getItem('token'),
    roles: [] // 用户角色
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
      state.name = token;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    RESET_TOKEN(state) {
      localStorage.removeItem('token')
      state.token = null
      state.name = null
      state.roles = []
}
  },
  actions: {
    // 模拟用户登录
    login({ commit, dispatch }, userInfo) {
      const { username } = userInfo;
      return new Promise((resolve, reject) => {
        setTimeout(async() => {
          if (username) {
            commit("SET_TOKEN", username)
            localStorage.setItem('token', username)
            resolve()
          } else {
            reject("用户名、密码错误");
          }
        }, 1000);
      });
    },
    // 模拟获取用户信息，角色和令牌内容一致
    getInfo({ commit, state }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const roles = state.token === 'admin' ? ['administrator'] : ['passersby']
          commit("SET_ROLES", roles);
          resolve(roles);
        }, 1000)
      })
    },
    resetToken({ commit }) {
      commit("RESET_TOKEN")
    }
  }
}