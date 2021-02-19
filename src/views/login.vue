<template>
  <div>
    <h1 class="title">Sign in</h1>
    <Form :model="model" :rules="rules" ref="form">
      <FormItem label="用户名" prop="username">
        <Input v-model="model.username" />
      </FormItem>
      <FormItem label="密&emsp;码" prop="password">
        <Input v-model="model.password" type="password" />
      </FormItem>
    </Form>
    <button class="btn" @click.prevent="go">login Home</button>
  </div>
</template>

<script>
import Notice from '@/components/notice';
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
        this.$store.dispatch("user/login", { username: this.model.username })
        .then(() => {
          if (valid) {
            // this.$create(Notice,{
            //   title: "Here we go!",
            //   message: "登录成功",
            // })
            this.$router.push({ path: this.$route.query.redirect || "/" })
          }
        }).catch(error => {
          alert(error);
        })
      })
    },
  },
};
</script>

<style lang="stylus" scoped>
.title
  margin 20px
  font-size 2em
.btn
  margin-top 30px
  padding 5px 10px
  background #027368
  border-radius 6px
  color white
</style>