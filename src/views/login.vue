<template>
  <div class="Login">
    <div class="outbox">
      <p>Login</p>
      <el-input
        ref="userRef"
        placeholder="用户名"
        v-model.trim="user"
        clearable
      ></el-input>
      <el-input
        ref="passRef"
        style="margin: 30px 0"
        placeholder="密码"
        v-model.trim="pass"
        type="password"
        clearable
      ></el-input>
      <el-button
        :loading="btnLoading"
        type="primary"
        style="width: 100%"
        @click="confirm"
      >
        <font>登录</font>
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      user: "",
      pass: "",
      btnLoading: false
    }
  },
  props: {},
  components: {},
  methods: {
    confirm() {
      if (!this.user) {
        this.$refs.userRef.focus()
        this.$message.warning("请填写用户名")
      } else if (!this.pass) {
        this.$refs.passRef.focus()
        this.$message.warning("请填写密码")
      } else {
        if (this.user === "admin" && this.pass === "admin") {
          this.btnLoading = true
          setTimeout(() => {
            this.btnLoading = false
            this.$notify.success({ title: "登录成功" })
            this.$router.push({ name: "select-table" })
          }, 1500)
        } else {
          this.$message.error("用户名或密码错误")
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.Login {
  width: 100%;
  height: 100%;
  // background-color: rgba(#409eff, 0.1);
  background: linear-gradient(135deg, #ea5c54 0%, #bb6dec 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  .outbox {
    width: 500px;
    min-height: 300px;
    border-radius: 6px;
    padding: 20px 20px;
    // box-shadow: inset 0 0 10px #666;
    // background: #eee;
    p {
      text-align: center;
      font-weight: bold;
      color: #fff;
      margin: 10px auto 30px;
      letter-spacing: 1.2px;
      font-size: 30px;
    }
  }
}
/deep/.el-input__inner {
  font-size: 16px;
  color: #fff;
  background-color: transparent;
  &::placeholder {
    color: #ccc;
    font-size: 14px;
  }
}
/deep/.el-input.is-active .el-input__inner,
/deep/.el-input__inner:focus {
  // border-color: #67c23a;
}
</style>
