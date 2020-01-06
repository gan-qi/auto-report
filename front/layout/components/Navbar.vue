<template>
  <div class="bg">
    <ul>
      <li>
        <a class="imgLogo">
          <img src="@/assets/logo.png" class="imgLogo" />
        </a>
      </li>
      <li>
        <router-link to="/" :class="{ active: this.$store.state.active.home }"
          >首页</router-link
        >
      </li>
      <li>
        <router-link
          to="/uploads"
          :class="{ active: this.$store.state.active.uploads }"
          >手动发送</router-link
        >
      </li>
      <li>
        <router-link
          to="/mailconfig"
          :class="{ active: this.$store.state.active.mailconfig }"
          >设置</router-link
        >
      </li>
      <span class="right">
        <li>
          <a class="avatar">
            <p class="username">Username</p>
          </a>
        </li>
      </span>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$router.push("/login");
    }
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
li a:not(.imgLogo):not(.avatar) {
  padding: 24px 16px;
}

li a:hover {
  cursor: pointer;
  color: #303133;
}

li a:hover:not(.avatar):not(.imgLogo):not(.active) {
  background-color: #f2f2f2;
}
li a.active {
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
