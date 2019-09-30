<template>
  <div id="app">
    <Toggle />
  </div>
</template>

<script>
import Toggle from "./1_toggle/Toggle.vue";

export default {
  name: "app",
  components: {
    //HelloWorld,
    Toggle
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
