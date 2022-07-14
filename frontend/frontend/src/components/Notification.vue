<template>
  <div
    v-if="state.open"
    :class="state.error ? 'error' : 'ok'"
    class="notification"
  >
    {{ message }}
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { reactive, watch } from "vue";

export default {
  name: "Notification",
  props: {
    message: String,
  },
  setup(props, context) {
    const state = reactive({
      open: false,
      timeout: undefined,
      error: computed(() => props.message.includes("ERR")),
    });
    watch(
      () => props.message,
      () => {
        clearTimeout(state.timeout);
        if (props.message) {
          state.open = true;
          setTimeout(() => {
            state.open = false;
            context.emit("closed");
          }, 2000);
        }
      }
    );
    return { state };
  },
};
</script>

<style scoped>
.notification {
  position: fixed;
  top: 10px;
  right: 10px;
  width: 200px;
  border: 1px solid grey;
  border-radius: 5px;
  padding: 10px;
}
.error {
  background-color: rgb(255, 101, 101);
}
.ok {
  background-color: rgb(83, 170, 83);
}
</style>
