<template>
  <div>
    <div v-if="fixedHeader">
      <Navbar />
    </div>
    <app-main />
  </div>
</template>

<script>
import { AppMain, Navbar } from "./components";
export default {
  name: "Layout",
  components: {
    AppMain,
    Navbar
  },
  data() {
    return {
      fixedHeader: true
    };
  }
};
</script>

<style>
div.container {
  padding: 20px;
}
</style>
