<template>
  <div v-if="open" class="dialog-container">
    <div class="dialog">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  props: {
    open: Boolean,
  },
  setup() {},
};
</script>

<style scoped>
.dialog-container {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}
.dialog {
  width: 400px;
  height: 400px;
  border: 1px solid grey;
  border-radius: 10px;
  background-color: white;
  padding: 10px;
}
</style>
