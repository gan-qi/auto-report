<template>
  <div class="loginContainer">
    <el-card shadow="always" class="boxCard">
      <el-row>
        <el-col :span="12">
          <div class="cardLeft">
            <img src="../../assets/logo.png" alt="login" class="logo" />
            <span>Auto Report</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="cardRight">
            <span>登陆</span>
            <el-form ref="ruleForm" :model="form" :rules="rules">
              <el-form-item prop="username">
                <el-input
                  v-model="form.username"
                  placeholder="用户名"
                  v-focus
                />
              </el-form-item>
              <el-form-item prop="password">
                <span @keyup.enter="submitForm('ruleForm')">
                  <el-input
                    v-model="form.password"
                    type="password"
                    placeholder="密码"
                  />
                </span>
              </el-form-item>
              <!-- <el-form-item>
                <el-checkbox v-model="form.checked">记住我</el-checkbox>
              </el-form-item> -->
              <el-form-item>
                <el-button
                  type="primary"
                  @click="submitForm('ruleForm')"
                  class="loginBtn"
                  :loading="loading"
                >
                  登 陆
                </el-button>
                <!-- <div class="tip" @click="register">
                  还没账号？注册
                </div> -->
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
      loading: false,
      form: {
        username: "",
        password: "",
        checked: false
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.form)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
    // register() {
    //   this.$router.push("/register");
    // }
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
  padding: 100px 300px;
  border-radius: 40px;
}
.boxCard {
  /* height: calc(100vh - 150px); */
  min-height: 600px;
}
div.cardLeft {
  padding: 180px 180px;
  text-align: center;
  height: 100%;
}
div.cardLeft span {
  display: block;
  font-size: 50px;
  margin-top: 25px;
}
div.cardRight {
  padding: 180px 180px;
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
  width: 50%;
  height: 50%;
}
</style>
