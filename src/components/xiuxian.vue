<template>
  <b-container class="bv-example-row">
    <b-row class="bg-head">
      <b-col cols="3" class="col-head-left">
        <img alt="xianren" src="../assets/head.png" class="head-img" />
      </b-col>
      <b-col cols="3" class="col-head-center">
        <h6>{{userBuffer.nickName}}</h6>
        <h6>{{userBuffer.menpai}}</h6>
        <h6>{{userBuffer.levelName}}</h6>
      </b-col>
      <b-col cols="6" class="col-head-right text-right">
        <h6>原石:{{userBuffer.yuanshi}}</h6>
        <h6>威望:{{userBuffer.weiwang}}</h6>
        <h6>修炼:{{userBuffer.xiulian}}</h6>
      </b-col>
    </b-row>
    <img alt="xianren" src="../assets/xian.png" />
    <div class="progress-info">
      <b-row>
        <b-col></b-col>
        <b-col cols="6" class="text-center">
          <h6></h6>
          <h6>总经验:{{userBuffer.exp}}</h6>
          <h6>当前修炼效率:({{fiveExp}}/5)</h6>
          <b-progress height="0.2rem" :value="value" :variant="variant" :animated="animate"></b-progress>
        </b-col>
        <b-col></b-col>
      </b-row>
    </div>
    <b-row style="padding-top:10px">
      <b-col></b-col>
      <b-col cols="6" class="text-center">
        <b-button type="button" size="sm" @click="tupo">突破</b-button>
      </b-col>
      <b-col></b-col>
    </b-row>
    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="warning"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      <p>成功突破</p>
    </b-alert>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      animate: true,
      variant: "dark",
      value: 0,
      timer: null,
      userBuffer: {
        levelName: "",
        nickName: "",
        menpai: "",
        yuanshi: 0,
        weiwang: 0,
        xiulian: 0,
        exp: 0
      },
      fiveExp: 0,
      dismissSecs: 10,
      dismissCountDown: 0,
      showDismissibleAlert: false
    };
  },
  methods: {
    toast(toaster, append = false) {
      this.counter++;
      this.$bvToast.toast(`Toast ${this.counter} body content`, {
        title: `Toaster ${toaster}`,
        toaster: toaster,
        solid: true,
        appendToast: append
      });
    },
    tupo() {
      let userInfock = this.$cookies.get("userInfo");
      this.$post("xian/tupo", {
        userId: userInfock.userId
      }).then(response => {
        if (response.code == "200") {
          window.console.log(response);
          var userInfock = this.$cookies.get("userInfo");
          userInfock.levelNo = response.data.levelNo;
          userInfock.exp = response.data.exp;
          window.console.log(userInfock);
          this.$cookies.set("userInfo", userInfock);

          let levelRouter = this.$cookies.get("levelRouter");
          let levelInfo = levelRouter["" + response.data.levelNo + ""];
          this.userBuffer.levelName = levelInfo.levelName;
          this.userBuffer.nickName = userInfock.nickName;
          this.userBuffer.exp = userInfock.exp;
          this.fiveExp = levelInfo.fiveExp;
        } else {
          alert(response.msg);
        }
      });
    }
  },
  mounted() {
    let levelRouter = this.$cookies.get("levelRouter");
    let userInfock = this.$cookies.get("userInfo");
    let levelNo = userInfock.levelNo;
    let levelInfo = levelRouter["" + levelNo + ""];
    this.userBuffer.levelName = levelInfo.levelName;
    this.userBuffer.nickName = userInfock.nickName;
    this.userBuffer.exp = userInfock.exp;
    this.fiveExp = levelInfo.fiveExp;
    window.console.info(userInfock.nickName);
    this.timer = setInterval(() => {
      if (this.value < 100) {
        this.value = this.value + 20;
      } else if (this.value == 100) {
        this.value = 20;
        let newExp = Number(this.userBuffer.exp) + Number(this.fiveExp);
        // this.exp = this.exp + this.fiveExp;
        var userInfock = this.$cookies.get("userInfo");
        userInfock.exp = newExp;
        this.$cookies.set("userInfo", userInfock);
        this.$post("xian/expAdd", {
          exp: newExp,
          userId: userInfock.userId
        }).then(response => {
          if (response.code == "200") {
            this.userBuffer.exp =
              Number(this.userBuffer.exp) + Number(this.fiveExp);
          }
        });
      }
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  }
};
</script>
  
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
img {
  max-width: 100%;
}
.head-img {
  width: 4rem;
  height: 4rem;
}
.col-head-center {
  margin-top: 5px;
  margin-left: -20px;
}
.col-head-right {
  margin-top: 5px;
  margin-left: 30px;
}
.col-head-left {
  margin-left: -10px;
}
.bv-example-row h6 {
  color: #d33302;
  font-size: 11px;
}
.bg-head {
  background: darkgrey;
}
</style>
