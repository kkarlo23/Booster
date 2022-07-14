<template>
  <div>
    <div class="header">
      <div>Vehicle Types</div>
    </div>
  </div>

  <div class="router-view">
    <RouterView />
  </div>
</template>

<script>
export default {
  name: "App",
  setup() {},
};
</script>

<style scoped>
.header {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  background-color: lightblue;
  display: flex;
  justify-content: center;
  font-size: 25px;
  font-weight: bold;
  padding: 5px;
  font-family: "Courier New", monospace;
}
.router-view {
  padding: 20px;
}
</style>
