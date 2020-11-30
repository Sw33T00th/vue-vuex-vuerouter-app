<template>
  <div id="app">
    <navbar />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import navbar from "@/components/Navbar";
export default {
  name: "Create",
  components: {
    navbar,
  },
};
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min";

body {
  background-color: #e3f2fd;
}
</style>
