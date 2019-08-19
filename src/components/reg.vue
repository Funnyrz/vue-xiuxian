<template>
  <div class="container-fluid">
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group id="input-group-1" label="用户名(登录使用):" label-for="input-1">
        <b-form-input id="input-1" v-model="form.userName" required placeholder="用户名,登录时使用"></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-1" label="角色名称:" label-for="input-1">
        <b-form-input id="input-1" v-model="form.nickName" required placeholder="角色名称(游戏里面角色的名字)"></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="密码:" label-for="input-2">
        <b-form-input id="input-2" v-model="form.password" required placeholder="密码"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="确认密码:" label-for="input-3">
        <b-form-input id="input-2" v-model="form.repasswd" required placeholder="确认密码"></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary" class="btn btn-primary btn-lg btn-block btn-sm">注册</b-button>
      <div class="text-center">
        已有账号?
        <b-badge variant="secondary">
          <router-link to="/login">点击登录</router-link>
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
        nickName: "",
        password: "",
        repasswd: ""
      },
      show: true
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      if (this.form.password != this.form.repasswd) {
        alert("2次密码不一致");
      }
      this.$post("user/reg", this.form).then(response => {
        if (response.code == "200") {
          alert("注册成功,前去登录");
          this.$router.push({
            path: "/login"
          });
        }
      });
    }
  }
};
</script>
<style scoped>
a {
  color: aliceblue;
}
</style>