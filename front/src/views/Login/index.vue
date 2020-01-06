<template>
  <div class="loginContainer">
    <el-card shadow="always" class="boxCard">
      <el-row>
        <el-col :span="12">
          <div class="cardLeft">
            <img src="../../assets/logo.png" alt="login" class="logo" />
            <span>auto report</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="cardRight">
            <span>登陆</span>
            <el-form ref="ruleForm" :model="form" :rules="rules">
              <el-form-item prop="name" required>
                <el-input
                  v-model="form.name"
                  placeholder="用户名"
                  v-focus
                ></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  v-model="form.password"
                  type="password"
                  placeholder="密码"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="submitForm('ruleForm')"
                  class="loginBtn"
                >
                  登 陆
                </el-button>
                <div class="tip" @click="register">
                  还没账号？注册
                </div>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        password: ""
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.form.name === "admin" && this.form.password === "admin") {
            this.$store.commit("changeLoginStatus");
            this.$router.push("/");
          } else {
            this.$message.error("抱歉，登陆失败...");
          }
        } else {
          return false;
        }
      });
    },
    register() {
      this.$router.push("/register");
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.querySelector("input").focus();
      }
    }
  }
};
</script>

<style scoped>
div.loginContainer {
  padding: 50px 200px;
  border-radius: 40px;
}
.boxCard {
  height: calc(100vh - 150px);
}
div.cardLeft {
  padding: 200px 180px;
  text-align: center;
  height: 100%;
}
div.cardLeft span {
  display: block;
  font-size: 50px;
  margin-top: 25px;
}
div.cardRight {
  padding: 230px 180px;
  border: none;
  border-left: 1px solid #dcdfe6;
  height: 100%;
}
div.cardRight span {
  font-size: 30px;
  display: block;
  text-align: center;
  margin-bottom: 30px;
}
.loginBtn {
  width: 100%;
  margin-top: 20px;
}
div.tip {
  font-size: 15px;
  text-align: right;
}
div.tip:hover {
  cursor: pointer;
  color: #409eff;
}
img.logo {
  width: 60%;
  height: 60%;
}
</style>
