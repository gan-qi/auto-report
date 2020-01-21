<template>
  <div class="container">
    <!-- 添加任务 -->
    <div @keyup.enter="addTask">
      <el-input
        v-model="input"
        placeholder="添加任务"
        prefix-icon="el-icon-plus"
        clearable
      >
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
          <div
            @click="finishTask(item, 1)"
            @click.middle="finishTask(item, 2)"
            class="flag"
          >
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
                @click="editTask(item)"
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
      if (this.input != "") {
        var data = {
          title: this.input
        };
        this.lists.push({
          title: this.input,
          status: false,
          edit: false
        });
        this.$message({
          message: `哦豁?!你刚刚立下Flag: ${this.input}`,
          type: "success"
        });
        this.input = "";
      } else {
        this.$message({
          message: "所添加的任务不可为空 !",
          type: "warning"
        });
      }
    },
    deleteTask(task) {
      // 删除任务
      for (let i = 0; i < this.lists.length; i++) {
        if (this.lists[i] == task) {
          this.lists.splice(i, 1);
          this.$message("你居然违背了你立下的Flag...");
        }
      }
    },
    editTask(title) {
      // 开启编辑任务
      this.lists.forEach((item, index) => {
        if (item.title === title) {
          this.lists[index].edit = !this.lists[index].edit;
        }
      });
      this.$message({
        message: "偷偷改一下Flag..."
      });
    }
  }
};
</script>
