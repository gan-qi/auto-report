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
        <el-form-item label="建议/帮助" :label-width="formLabelWidth">
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
            :file-list="fileList"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选取文件</el-button
            >
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过3MB
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="明日任务" :label-width="formLabelWidth">
          <todo-list />
        </el-form-item>
      </el-form>
      <div class="drawer__footer">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-button @click="cancelForm">取 消</el-button>
          </el-col>
          <el-col :span="12">
            <el-button
              type="primary"
              @click="$refs.drawer.closeDrawer()"
              :loading="loading"
              >{{ loading ? "提交中 ..." : "提 交" }}</el-button
            >
          </el-col>
        </el-row>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import todoList from "./todoList";

export default {
  props: {
    dialog: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    advice: {
      type: String,
      default: function() {
        return "建议...";
      }
    }
  },
  components: {
    todoList
  },
  data() {
    return {
      localDialog: this.dialog,
      loading: false,
      formLabelWidth: "80px",
      timer: null,
      fileList: [],
      form: {}
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
        .then(() => {
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
        .catch(() => {});
    },
    cancelForm() {
      this.loading = false;
      this.localDialog = false;
      clearTimeout(this.timer);
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    // submitUpload() {
    //   // 点击上传图片
    //   this.$refs.upload.submit();
    // },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  }
};
</script>

<style scoped>
.drawer__content {
  padding: 30px 20px;
}
.drawer__footer {
  position: absolute;
  bottom: 10px;
  width: 90%;
}
.drawer__footer button {
  width: 100%;
}
</style>
