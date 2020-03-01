<template>
  <div class="container">
    <!--添加任务-->
    <el-row :gutter="5">
      <el-col :span="4">
        <el-tooltip :content="show_selected" placement="top">
          <el-button
            icon="el-icon-user"
            @click="mult_dialog = true"
            style="width: 100%;"
          >
            {{ selected_list_computed }}
          </el-button>
        </el-tooltip>
      </el-col>
      <el-col :span="20">
        <div @keyup.enter="addTask">
          <el-input
            v-model="input"
            placeholder="立下flag"
            prefix-icon="el-icon-plus"
            clearable
          >
          </el-input>
        </div>
      </el-col>
    </el-row>
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
            @click="dialog = !dialog"
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
    <panel :dialog="dialog" @dialogchange="dialogchange" />
    <!-- 设置面板 结束 -->

    <!-- 设置多选用户 -->
    <mult-user
      :dialog="mult_dialog"
      @dialogchange="multdialogchange"
      :user_list="user_list"
      :selected_list="selected_list"
      @multselected="multselected"
    />
    <!-- 设置多选用户 结束 -->
  </div>
</template>

<script>
import { addTask, changeTask, deleteTask, getTask } from "../../api/task.js";
import { downloadFile } from "../../api/download.js";
import { sendMail } from "../../api/sendMail.js";
import { getUserList } from "../../api/user";
import panel from "./components/panel";
import multUser from "./components/multUser";
import fileDownload from "js-file-download";

export default {
  name: "home",
  components: {
    multUser,
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
      role: this.$store.getters.role,
      mult_dialog: false,
      user_list: [],
      selected_list: []
    };
  },
  methods: {
    addTask() {
      // 添加任务
      if (this.input !== "") {
        // 首先检测是否已存在该任务
        let haven = false;
        this.lists.forEach(item => {
          if (item.title === this.input) haven = true;
        });
        if (haven) {
          this.$message({
            message: "flag已立下，请不要重复立flag !",
            type: "warning"
          });
        } else {
          // 开始添加任务
          let data = {
            user_list: this.selected_list,
            title: this.input
          };
          addTask(data, this.$store.getters.token)
            .then(response => {
              this.lists.push({
                id: response.data,
                title: this.input,
                status: 0,
                edit: false
              });
              if (this.selected_list.length === 1) {
                this.$message({
                  message: `哦豁?!你刚刚立下Flag: ${ this.input }`,
                  type: "success"
                });
              } else {
                this.$message({
                  message: `哦豁?!大家一起立Flag啊: ${ this.input }`,
                  type: "success"
                });
              }
              this.input = "";
            })
            .catch(() => {
              this.$message.error("好像出了点错，你去找写代码的问问吧...");
            });
        }
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
        let toServerTask = task;
        toServerTask.status = val;
        changeTask(task.id, toServerTask, this.$store.getters.token)
          .then(() => {
            this.lists.forEach(item => {
              if (item === task) item.status = val;
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
            if (this.lists[i] === task) {
              this.lists.splice(i, 1);
              this.$message("趁人不注意赶紧偷偷删掉个Flag...");
            }
          }
        })
        .catch(() => {
          this.$message.error("好像出了点错，你去找写代码的问问吧...");
        });
    },
    downloadReport() {
      // 下载日报表
      this.downloadReportBtn = true;
      downloadFile(this.$store.getters.token).then(response => {
        fileDownload(response.data, "日报表.xlsx");
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
      // 获取今日任务
      getTask(this.$store.getters.token)
        .then(response => {
          this.lists = response.data;
        })
        .catch(() => {
          this.$message.error("好像出了点错，你去找写代码的问问吧...");
        });
      // 获取用户列表
      getUserList(this.$store.getters.token).then(response => {
        this.user_list = response.data;
      });
      // 起始值加入用户信息
      this.selected_list.push({
        id: this.$store.getters.id,
        username: this.$store.getters.username
      });
    },
    dialogchange(val) {
      this.dialog = val;
    },
    multdialogchange(val) {
      this.mult_dialog = val;
    },
    multselected(val) {
      this.selected_list = val;
    }
  },
  created() {
    this.fetchData();
  },
  computed: {
    selected_list_computed() {
      if (this.selected_list.length === 1) {
        return this.selected_list[0].username;
      } else {
        return `已选中${ this.selected_list.length }人`;
      }
    },
    show_selected() {
      let local_selcted = "";
      if (this.selected_list.length !== 1) {
        this.selected_list.forEach(item => {
          local_selcted += `${ item.username } `;
        });
      } else {
        local_selcted = this.selected_list[0].username;
      }
      return local_selcted;
    }
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
