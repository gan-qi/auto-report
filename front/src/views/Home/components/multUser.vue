<template>
  <el-dialog title="选择用户" :visible.sync="localDialog" width="30%" center>
    <!--多选表格-->
    <el-table
      ref="multipleTable"
      :data="user_list"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="username" label="姓名"></el-table-column>
    </el-table>

    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    user_list: {
      type: Array,
      default: function() {
        return [];
      }
    },
    selected_list: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      localDialog: this.dialog,
      multipleSelection: this.selected_list
    };
  },
  watch: {
    dialog(val) {
      this.localDialog = val;
    },
    selected_list(val) {
      this.multipleSelection = val;
    }
  },
  methods: {
    close() {
      this.localDialog = false;
      this.$emit('dialogchange', this.localDialog);
    },
    onSubmit() {
      this.close();
      this.$emit('multselected', this.multipleSelection);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>