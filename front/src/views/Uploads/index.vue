<template>
  <div class="uploadsContainer">
    <el-card shadow="always" class="box-card">
      <el-upload
        class="upload-demo"
        drag
        :action="action"
        :before-upload="beforeUpload"
        :on-success="handleReportSuccess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          手动发送日报，将文件在此上传即可<br />
          只能上传xlsx文件，且不超过2MB
        </div>
      </el-upload>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      action: `${ process.env.VUE_APP_BASE_API }/uploads?token=${ this.$store.getters.token }`
    };
  },
  methods: {
    handleReportSuccess() {
      this.$message({
        message: "哦耶! 提交成功!",
        type: "success"
      });
    },
    beforeUpload(file) {
      const isXLSX =
        file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isXLSX) {
        this.$message.error("上传文件只能是 XLSX 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 2MB!");
      }
      return isXLSX && isLt2M;
    }
  }
};
</script>

<style scoped>
div.uploadsContainer {
  text-align: center;
  padding: 30px;
}

.box-card {
  margin: 100px calc(100vh - 300px);
  padding: 50px 40px;
}

.el-upload__tip {
  margin-top: 15px;
}
</style>
