<template>
  <div class="vehicle-type">
    <div class="vehicle-info">
      <div class="make-model">
        {{ vehicleType.make }} - {{ vehicleType.model }}
      </div>
      <div class="year">({{ vehicleType.year }})</div>
    </div>
    <div>
      <button class="remove-button" @click="componentMethods.delete()">
        REMOVE
      </button>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";

export default {
  name: "VehicleType",
  props: {
    vehicleType: {
      type: Object,
      required: true,
    },
  },
  setup(props, context) {
    const state = reactive({});

    const componentMethods = {
      delete: () => {
        context.emit("delete", props.vehicleType._id);
      },
    };

    return { state, componentMethods };
  },
};
</script>

<style scoped>
.vehicle-type {
  width: 100%;
  height: 50px;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid rgb(110, 110, 110);
  background-color: rgb(255, 255, 255);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.vehicle-info {
  justify-content: start;
  display: flex;
  align-items: center;
}

.make-model {
  font-weight: bold;
  margin-right: 10px;
}

.remove-button {
  cursor: pointer;
  border: 1px solid rgb(110, 110, 110);
  border-radius: 5px;
  outline: none;
  padding: 5px;
  font-weight: bold;
  background-color: rgb(255, 101, 101);
}
.remove-button:active {
  background-color: grey;
}
</style>
