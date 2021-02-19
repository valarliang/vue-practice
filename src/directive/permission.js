import store from '@/store';

export default {
  inserted(el, binding) {
    const roles = store.getters?.roles
    const { value } = binding
    if (value && value instanceof Array) {
      const hasPermission = value.some(e => roles.includes(e))
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error(`需要指定按钮要求角色数组，如v-permission="['administrator','passersby']"`)
    }
  }
}