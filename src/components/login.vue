<template>
  <div class="container-fluid">
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group id="input-group-1" label="用户名:" label-for="input-1">
        <b-form-input id="input-1" v-model="form.userName" required placeholder="用户名"></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="密码:" label-for="input-2">
        <b-form-input id="input-2" v-model="form.pwd" required placeholder="密码"></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary" class="btn btn-primary btn-lg btn-block btn-sm">登录</b-button>
      <div class="text-center">
        没有账号?
        <b-badge variant="secondary">
          <router-link to="/reg">点击注册</router-link>
        </b-badge>
      </div>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        userName: "",
        pwd: ""
      },
      show: true
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.$post("user/login", this.form).then(response => {
        if ("200" == response.code) {
          this.$cookies.set("userInfo", response.data.loginSysUser);
          this.$cookies.set("token", response.data.token);
          this.$router.push({
            path: "/xiuxian"
          });
        } else {
          alert(response.msg);
        }
        window.console.log(response);
      });
    }
  },
  mounted() {
    this.$post("xian/getRouter").then(response => {
      if ("200" == response.code) {
        this.$cookies.set("levelRouter", response.data);
      } else {
        // alert(response.msg);
      }
    });
  }
};
</script>
<style scoped>
a {
  color: aliceblue;
}
</style>