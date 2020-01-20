<template>
  <div class="container">
    <el-card shadow="always" class="box-card">
      <div slot="header">
        邮箱设置
      </div>
      <el-form
        ref="ruleForm"
        :rules="rules"
        :model="ruleForm"
        label-width="120px"
      >
        <el-form-item label="发件人姓名" required prop="fromName">
          <el-input v-model="ruleForm.fromName"></el-input>
        </el-form-item>
        <el-form-item label="发送邮箱" required prop="fromEmail">
          <el-input v-model="ruleForm.fromEmail"></el-input>
        </el-form-item>
        <el-form-item label="发送邮箱密令" required prop="fromEmailKey">
          <el-input v-model="ruleForm.fromEmailKey"></el-input>
        </el-form-item>
        <el-form-item label="收件人姓名" required prop="toName">
          <el-input v-model="ruleForm.toName"></el-input>
        </el-form-item>
        <el-form-item label="收件人邮箱" required prop="toEmail">
          <el-input v-model="ruleForm.toEmail"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('ruleForm')"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getConfig, mailConfig } from "../../api/mailConfig";

export default {
  data() {
    return {
      ruleForm: {
        fromName: "",
        toName: "",
        fromEmail: "",
        fromEmailKey: "",
        toEmail: ""
      },
      rules: {
        fromName: [
          { required: true, message: "请输入发件人姓名", trigger: "blur" }
        ],
        toName: [
          { required: true, message: "请输入收件人姓名", trigger: "blur" }
        ],
        fromEmail: [
          { required: true, message: "请输入发送邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        fromEmailKey: [
          { required: true, message: "请输入发件邮箱密令", trigger: "blur" }
        ],
        toEmail: [
          { required: true, message: "请输入收件人邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var data = {
            fromName: this.ruleForm.fromName,
            toName: this.ruleForm.toName,
            fromEmail: this.ruleForm.fromEmail,
            fromEmailKey: this.ruleForm.fromEmailKey,
            toEmail: this.ruleForm.toEmail
          };
          mailConfig(data, this.$store.getters.token)
            .then(() => {
              this.$message({
                message: "很好.../鼓掌/鼓掌/鼓掌",
                type: "success"
              });
            })
            .catch(() => {
              this.$message.error("好像出了点错，你去找写代码的问问吧...");
            });
        } else {
          return false;
        }
      });
    },
    fetchData() {
      getConfig(this.$store.getters.token).then(response => {
        this.ruleForm = response.data;
      });
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style scoped>
.container {
  padding: 30px 300px;
}
.box-card {
  padding: 50px 60px;
  min-width: 500px;
}
</style>
