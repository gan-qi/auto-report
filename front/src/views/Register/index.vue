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
            <span>注 册</span>
            <el-form ref="ruleForm" :model="form" :rules="rules">
              <el-form-item prop="name" required>
                <el-input v-model="form.name" placeholder="用户名"></el-input>
              </el-form-item>
              <el-form-item prop="password" required>
                <el-input
                  v-model="form.password"
                  type="password"
                  placeholder="密码"
                ></el-input>
              </el-form-item>
              <el-form-item prop="repassword" required>
                <el-input
                  v-model="form.repassword"
                  type="password"
                  placeholder="确认密码"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="submitForm('ruleForm')"
                  class="loginBtn"
                >
                  注 册
                </el-button>
                <div class="tip" @click="login">
                  已有账号？登陆
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
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.repassword !== "") {
          this.$refs.ruleForm.validateField("repassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        name: "",
        password: "",
        repassword: ""
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [
          { validator: validatePass, required: true, trigger: "blur" }
        ],
        repassword: [
          { validator: validatePass2, required: true, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$router.push("/login");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    login() {
      this.$router.push("/login");
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
  padding: 200px 180px;
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
