<template>
  <div class="container">
    <!-- 添加任务 -->
    <div>
      <el-input
        v-model="input"
        placeholder="立下明天的flag"
        clearable
      >
        <el-button
          slot="append"
          icon="el-icon-plus"
          @click="addTask"
        ></el-button>
      </el-input>
    </div>
    <!-- 添加任务 结束 -->

    <!-- 任务列表 -->
    <el-card
      shadow="hover"
      class="box-card"
      v-for="(item, index) in lists"
      :key="index"
    >
      <el-row :gutter="20">
        <el-col :span="2">
          <div class="flag">
            <i class="el-icon-s-flag" />
          </div>
        </el-col>
        <el-col :span="19">
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
        <el-col :span="3">
          <div @click="deleteTask(item)" class="hiddenDelete">
            <i class="el-icon-remove" />
          </div>
        </el-col>
      </el-row>
    </el-card>
    <!-- 任务列表 卡片 -->
  </div>
</template>

<script>
import {
  addTomorrowTask,
  changeTomorrowTask,
  deleteTomorrowTask,
  getTomorrowTask
} from "../../../api/tomorrow_task.js";

export default {
  data() {
    return {
      input: "",
      lists: []
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
          let data = {
            title: this.input
          };
          addTomorrowTask(data, this.$store.getters.token)
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
        }
      } else {
        this.$message({
          message: "所添加的任务不可为空 !",
          type: "warning"
        });
      }
    },
    deleteTask(task) {
      // 删除任务
      deleteTomorrowTask(task.id, this.$store.getters.token)
        .then(() => {
          for (let i = 0; i < this.lists.length; i++) {
            if (this.lists[i] === task) {
              this.lists.splice(i, 1);
              this.$message("把明天的Flag也偷偷删掉...");
            }
          }
        })
        .catch(() => {
          this.$message.error("好像出了点错，你去找写代码的问问吧...");
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
      changeTomorrowTask(task.id, task, this.$store.getters.token)
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
      getTomorrowTask(this.$store.getters.token)
        .then(response => {
          this.lists = response.data;
        })
        .catch(() => {
          this.$message.error("好像出了点错，你去找写代码的问问吧...");
        });
    },
  },
  created() {
    this.fetchData();
  }
};
</script>

<style scoped>
.box-card {
  margin-top: 5px;
  padding: 0;
}
</style>
