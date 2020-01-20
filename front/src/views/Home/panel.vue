<template>
  <el-drawer
    title="设置"
    :before-close="handleClose"
    :visible.sync="localDialog"
    direction="ltr"
    custom-class="drawer"
    ref="drawer"
  >
    <div class="drawer__content">
      <el-form :model="form">
        <el-form-item label="建议/需要帮助" :label-width="formLabelWidth">
          <el-input
            v-model="advice"
            autocomplete="off"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item label="添加图片" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            ref="upload"
            action="..."
            :on-preview="handlePreview"
            :file-list="fileList"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选取文件</el-button
            >
            >
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div class="drawer__footer">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button
          type="primary"
          @click="$refs.drawer.closeDrawer()"
          :loading="loading"
          >{{ loading ? "提交中 ..." : "确 定" }}</el-button
        >
      </div>
    </div>
  </el-drawer>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    advice: {
      type: String,
      default: function() {
        return "建议...";
      }
    }
  },
  data() {
    return {
      localDialog: false,
      loading: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "80px",
      timer: null,
      fileList: []
    };
  },
  watch: {
    dialog(val) {
      this.localDialog = val;
    }
  },
  methods: {
    handleClose(done) {
      if (this.loading) {
        return;
      }
      this.$confirm("确定要提交表单吗？")
        .then(_ => {
          this.loading = true;
          this.timer = setTimeout(() => {
            done();
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.$emit("dialogchange", this.localDialog);
              this.loading = false;
            }, 40);
          }, 200);
        })
        .catch(_ => {});
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    submitUpload() {
      // 点击上传图片
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  }
};
</script>
