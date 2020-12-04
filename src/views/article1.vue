<template>
  <div>
    <h1>Article1</h1>
    <Form :model="model" :rules="rules" ref="form">
      <FormItem label="用户名" prop="username">
        <Input v-model="model.username" />
      </FormItem>
      <FormItem label="密码" prop="password">
        <Input v-model="model.password" type="password" />
      </FormItem>
    </Form>
    <div class="btn"><button @click.prevent="go">Go to Article2</button></div>
  </div>
</template>

<script>
import create from '@/utils/create.js'
import Notice from '@/components/notice.vue'
export default {
  data() {
    return {
      model: {
        username: "",
        password: "",
      },
      rules: {
        username: { required: true, message: "请输入用户名" },
        password: { required: true, message: "请输入密码" },
      },
    };
  },
  methods: {
    go() {
      this.$refs.form.validate((valid) => {
        const notice = create(Notice, {
          title: "Here we go!",
          message: valid ? "登录" : "校验失败!",
          duration: 1000,
        });
        notice.show();
        if (valid) this.$router.push('/article2')
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
.btn
  margin-top: 30px;
</style>