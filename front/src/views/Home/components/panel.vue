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
            >
              {{ loading ? "保存中 ..." : "保 存" }}
            </el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import todoList from "./todoList";
import { getAdvice, postAdvice } from "../../../api/other";

export default {
  props: {
    dialog: {
      type: Boolean,
      default: false
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
      form: {},
      advice: ""
    };
  },
  watch: {
    dialog(val) {
      this.localDialog = val;
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getAdvice(this.$store.getters.token).then(response => {
        this.advice = response.data;
      });
    },
    handleClose(done) {
      if (this.loading) {
        return;
      }
      this.$confirm("确定要保存表单吗？")
        .then(() => {
          this.loading = true;
          this.timer = setTimeout(() => {
            done();
            // 动画关闭需要一定的时间
            setTimeout(() => {
              postAdvice(this.$store.getters.token, {
                advice: this.advice
              }).then(() => {
                this.$emit("dialogchange", this.localDialog);
                this.loading = false;
                this.$message({
                  type: "success",
                  message: "又立下一堆flag。。。"
                });
              });
            }, 40);
          }, 200);
        })
        .catch(() => {
          this.$message.error("好像出了点错，你去找写代码的问问吧...");
        });
    },
    cancelForm() {
      this.loading = false;
      this.localDialog = false;
      clearTimeout(this.timer);
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
