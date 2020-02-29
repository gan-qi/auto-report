<template>
  <div class="bg">
    <ul>
      <li>
        <a class="imgLogo">
          <img src="@/assets/logo.png" class="imgLogo" alt="logo" />
        </a>
      </li>
      <li>
        <router-link to="/" exact>首页</router-link>
      </li>
      <li>
        <router-link to="/uploads">
          手动发送
        </router-link>
      </li>
      <li>
        <router-link to="/mailconfig">
          设置
        </router-link>
      </li>
      <span class="right">
        <li>
          <a class="avatar">
            <el-dropdown class="avatar">
              <span>
                {{ username }}<i class="el-icon-arrow-down avatar"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <div @click="logout">
                  <el-dropdown-item>登出</el-dropdown-item>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </a>
        </li>
      </span>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: this.$store.getters.username || "username"
    };
  },
  methods: {
    async logout() {
      await this.$store.dispatch("user/logout");
      await this.$router.push(`/login?redirect=${ this.$route.fullPath }`);
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (this.$store.state.active.home) {
      this.active.home = true;
    }
    if (this.$store.state.active.uploads) {
      this.active.uploads = true;
    }
    if (this.$store.state.active.mailconfig) {
      this.active.mailconfig = true;
    }
    next();
  }
};
</script>

<style scoped>
div.bg {
  background-color: white;
}

img.imgLogo {
  width: 32px;
  height: 32px;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

li {
  float: left;
}

li a {
  padding: 15px 16px;
  display: block;
  text-align: center;
  text-decoration: none;
  color: #606266;
}

li a:not(.imgLogo) {
  padding: 24px 16px;
}

li a:hover {
  cursor: pointer;
  color: #303133;
}

li a:hover:not(.avatar):not(.imgLogo) {
  background-color: #f2f2f2;
}

.router-link-active {
  color: #303133;
  background-color: #f2f2f2;
}

.right {
  float: right;
}

a.avatar {
  padding: 8px 16px;
}
</style>
