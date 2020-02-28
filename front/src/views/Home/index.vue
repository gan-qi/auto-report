<template>
  <div class="container">
    <!--添加任务-->
    <div @keyup.enter="addTask">
      <el-input
        v-model="input"
        placeholder="添加任务"
        prefix-icon="el-icon-plus"
        clearable
      >
      </el-input>
    </div>
    <!--添加任务 结束-->

    <!--任务列表-->
    <div v-if="lists.length === 0" class="nothingTip">
      <i class="el-icon-question" />
      哦豁?! 真是轻松的一天呀 !
    </div>
    <el-card
      shadow="hover"
      class="box-card"
      v-for="(item, index) in lists"
      :key="index"
    >
      <el-row :gutter="20">
        <el-col :span="2">
          <div
            @click="finishTask(item, 1)"
            @click.middle="finishTask(item, 2)"
            class="flag"
          >
            <span v-if="item.status === 0">
              <i class="el-icon-s-flag" />
            </span>
            <span v-else-if="item.status === 1">
              <i class="el-icon-lollipop" />
            </span>
            <span v-else-if="item.status === 2">
              <i class="el-icon-hot-water" />
            </span>
          </div>
        </el-col>
        <el-col :span="21">
          <!--可编辑-->
          <div v-if="item.edit">
            <el-input v-model="item.title" class="editInput">
              <el-button
                slot="append"
                icon="el-icon-check"
                @click="editTask2(item)"
              />
            </el-input>
          </div>
          <div v-else>
            <div :class="{ finishIt: item.status }">
              <span @dblclick="editTask(item.title)">{{ item.title }}</span>
            </div>
          </div>
          <!--可编辑 结束-->
        </el-col>
        <el-col :span="1">
          <div @click="deleteTask(item)" class="hiddenDelete">
            <i class="el-icon-remove" />
          </div>
        </el-col>
      </el-row>
    </el-card>
    <!--任务列表 结束-->

    <!--提交按钮-->
    <div class="footerBtn">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-button
            type="info"
            class="optionBtn"
            icon="el-icon-setting"
            @click="dialogchange"
            :loading="addImgBtn"
            :disabled="lists.length === 0"
          >
            其他设置
          </el-button>
        </el-col>
        <el-col :span="8">
          <el-button
            type="primary"
            class="optionBtn"
            icon="el-icon-download"
            @click="downloadReport"
            :loading="downloadReportBtn"
            :disabled="lists.length === 0"
          >
            下载日报表
          </el-button>
        </el-col>
        <el-col :span="8">
          <el-button
            type="success"
            class="optionBtn"
            icon="el-icon-switch-button"
            @click="submitReport"
            :loading="submitReportBtn"
            :disabled="lists.length === 0"
          >
            提交报表
          </el-button>
        </el-col>
      </el-row>
    </div>
    <!--提交按钮 结束-->

    <!-- 设置面板 -->
    <panel :dialog="dialog" @dialogchange="dialogchange" :advice="advice" />
    <!-- 设置面板 结束 -->
  </div>
</template>

<script>
import { addTask, changeTask, deleteTask, getTask } from "../../api/task.js";
import { downloadFile } from "../../api/download.js";
import { sendMail } from "../../api/sendMail.js";
import panel from "./components/panel";

export default {
  name: "home",
  components: {
    panel
  },
  data() {
    return {
      input: "",
      loading: false,
      addImgBtn: false,
      addCommentBtn: false,
      downloadReportBtn: false,
      submitReportBtn: false,
      lists: [
        // {
        //   id: 1,
        //   title: "task1",
        //   time: "2019-01-06",
        //   status: 0, // 0 未完成 1 已完成 2 进行中
        //   edit: false
        // }
      ],
      dialog: false,
      advice: ""
    };
  },
  methods: {
    getCurrentTime() {
      // 获取时间并且返回
      var date = new Date();
      this.year = date.getFullYear();
      this.month = date.getMonth() + 1;
      this.date = date.getDate();
      this.day = new Array(
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      )[date.getDay()];
      this.hour =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      this.minute =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      this.second =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      var currentTime =
        "现在是:" + this.year + "年" + this.month + "月" + this.date + "日 ";
      return currentTime;
    },
    addTask() {
      // 添加任务
      if (this.input != "") {
        var data = {
          title: this.input
        };
        addTask(data, this.$store.getters.token)
          .then(response => {
            this.lists.push({
              id: response.data,
              title: this.input,
              status: false,
              edit: false
            });
            this.$message({
              message: `哦豁?!你刚刚立下Flag: ${ this.input }`,
              type: "success"
            });
            this.input = "";
          })
          .catch(() => {
            this.$message.error("好像出了点错，你去找写代码的问问吧...");
          });
      } else {
        this.$message({
          message: "所添加的任务不可为空 !",
          type: "warning"
        });
      }
    },
    finishTask(task, val) {
      // 完成任务, 转换任务的status
      if (!task.status) {
        var toServerTask = task;
        toServerTask.status = val;
        changeTask(task.id, toServerTask, this.$store.getters.token)
          .then(() => {
            this.lists.forEach(item => {
              if (item == task) item.status = val;
            });
            this.$message({
              message: "哦豁?! 奖励一个棒棒糖!",
              type: "success"
            });
          })
          .catch(() => {
            this.$message.error("好像出了点错，你去找写代码的问问吧...");
          });
      } else {
        this.$message("拜托～要不棒棒糖还我先...?!");
      }
    },
    deleteTask(task) {
      // 删除任务
      deleteTask(task.id, this.$store.getters.token)
        .then(() => {
          for (let i = 0; i < this.lists.length; i++) {
            if (this.lists[i] == task) {
              this.lists.splice(i, 1);
              this.$message("你居然违背了你立下的Flag...");
            }
          }
        })
        .catch(() => {
          this.$message.error("好像出了点错，你去找写代码的问问吧...");
        });
    },
    addExtImg() {
      // 添加额外的图片
      this.$message("功能暂未开发...");
    },
    addComment() {
      // 留言或者需要帮助
      this.$message("功能暂未开发...");
    },
    downloadReport() {
      // 下载日报表
      this.downloadReportBtn = true;
      downloadFile(this.$store.getters.token).then(res => {
        const blob = new Blob([ res.data ]);
        let url = window.URL.createObjectURL(blob);

        //创建一个a标签元素，设置下载属性，点击下载，最后移除该元素
        let link = document.createElement("a");
        link.href = url;
        link.style.display = "none";
        //res.headers.fileName 取出后台返回下载的文件名
        // const downlaodFileName = decodeURIComponent(res.headers.filename);
        const downlaodFileName = decodeURIComponent("日报表.xlsx");
        link.setAttribute("download", downlaodFileName);
        link.click();
        window.URL.revokeObjectURL(url);
        // 取消加载状态
        this.downloadReportBtn = false;
      });
    },
    submitReport() {
      // 提交日报表
      this.submitReportBtn = true;
      sendMail(this.$store.getters.token)
        .then(() => {
          this.$message({
            message: "下班咯~~~~~~",
            type: "success"
          });
          this.submitReportBtn = false;
        })
        .catch(() => {
          // this.$message.error("好像除了点问题，下载日报表手动上传试试呢...");
        });
    },
    editTask(title) {
      // 开启编辑任务
      this.lists.forEach((item, index) => {
        if (item.title === title) {
          this.lists[index].edit = !this.lists[index].edit;
        }
      });
    },
    editTask2(task) {
      // 除了更改编辑状态，还要和后端同步数据
      this.editTask(task.title);
      changeTask(task.id, task, this.$store.getters.token)
        .then(() => {
          this.$message({
            message: "偷偷改一下Flag..."
          });
        })
        .catch(() => {
          this.$message.error("好像出了点错，你去找写代码的问问吧...");
        });
    },
    fetchData() {
      getTask(this.$store.getters.token)
        .then(response => {
          this.lists = response.data;
        })
        .catch(() => {
          this.$message.error("好像出了点错，你去找写代码的问问吧...");
        });
    },
    dialogchange(val) {
      this.dialog = val;
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style scoped>
.box-card {
  margin: 30px 80px;
  padding: 20px 24px;
}

.container {
  padding: 30px 400px;
}

.box-card {
  padding: 8px 20px;
  margin: 10px 0;
}

.flag {
  cursor: pointer;
}

.hiddenDelete {
  display: none;
  cursor: pointer;
}

.box-card:hover .hiddenDelete {
  display: block;
}

.finishIt {
  text-decoration: line-through;
}

.footerBtn {
  margin-top: 50px;
  text-align: center;
}

.optionBtn {
  width: 80%;
}

.box-card:hover {
  position: relative;
  right: 10px;
}

.nothingTip {
  font-size: 30px;
  color: #909399;
  text-align: center;
  font-style: italic;
  margin: 80px 30px;
}
</style>
