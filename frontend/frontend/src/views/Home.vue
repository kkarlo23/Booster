<template>
  <div>
    <div class="search">
      <div class="input-box">
        <input
          type="text"
          placeholder="Try to search for a vehicle..."
          v-model="state.query"
          @input="componentMethods.inputHandler(true, true)"
        />
        <div class="loader" :class="state.loading ? '' : 'hidden'"></div>
      </div>
    </div>
    <div class="rows-per-page">
      <div>Rows per page:</div>
      <select
        class="select"
        v-model="state.rows"
        @change="componentMethods.inputHandler(false, true)"
      >
        <option v-for="option in state.options" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
    <div class="create-new">
      <button class="button create-button" @click="state.dialogOpened = true">
        CREATE NEW VEHICLE TYPE
      </button>
    </div>
    <VehicleType
      v-for="vehicleType in state.vehicleTypes"
      :key="vehicleType._id"
      :vehicleType="vehicleType"
      @delete="componentMethods.deleteVehicleType"
    />

    <div class="pages">
      <span
        class="pagination"
        :class="state.page === 1 ? 'hidden' : ''"
        @click="componentMethods.pageHandler(-1)"
        >Previous</span
      >
      <span class="separator">-</span>
      <span class="page">{{ state.page }}</span>
      <span class="separator">-</span>
      <span
        class="pagination"
        :class="state.page === state.count ? 'hidden' : ''"
        @click="componentMethods.pageHandler(1)"
        >Next</span
      >
    </div>
    <Dialog :open="state.dialogOpened">
      <div>
        <div class="dialog-header">
          <div>New Vehicle Type</div>
        </div>
        <div>Make:</div>
        <div class="input-box form">
          <input
            type="text"
            placeholder="eg. AUDI"
            v-model="state.newVehicleType.make"
          />
        </div>
        <div>Model:</div>
        <div class="input-box form">
          <input
            type="text"
            placeholder="eg. A6"
            v-model="state.newVehicleType.model"
          />
        </div>
        <div>Year:</div>
        <div class="input-box form">
          <input
            type="number"
            placeholder="eg. 2004"
            v-model="state.newVehicleType.year"
          />
        </div>
        <div class="buttons">
          <button class="button" @click="componentMethods.closeDialog()">
            CANCEL
          </button>
          <button
            class="button create-button"
            @click="componentMethods.createVehicleType()"
          >
            CREATE
          </button>
        </div>
      </div>
    </Dialog>
    <Notification
      :message="state.notificationMessage"
      @closed="state.notificationMessage = ''"
    ></Notification>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import VehicleType from "../components/VehicleType.vue";
import Dialog from "../components/Dialog.vue";
import Notification from "../components/Notification.vue";
import {
  apiGetVehicleTypes,
  apiDeleteVehicleType,
  apiCreateVehicleType,
} from "../../api/requests";
export default {
  name: "VehicleTypes",
  components: { VehicleType, Dialog, Notification },
  setup() {
    //value in ms
    let debounce = 500;
    let debounceTimeout;

    const fetchVehicleTypes = () => {
      state.loading = true;
      apiGetVehicleTypes(state.rows, state.page, state.query)
        .then((response) => response.json())
        .then((data) => {
          state.vehicleTypes = data.vehicleTypes.data;
          state.count = data.vehicleTypes.count;
          state.loading = false;
        })
        .catch((error) => {
          console.error(error);
        });
    };
    const deleteVehicleType = (vehicleTypeID) => {
      apiDeleteVehicleType(vehicleTypeID)
        .then((response) => response.json())
        .then((data) => {
          state.notificationMessage = `${data.error ? "ERR: " : ""}${
            data.message
          }`;
          if (!data.error) {
            fetchVehicleTypes();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    const createVehicleType = () => {
      apiCreateVehicleType(state.newVehicleType)
        .then((response) => response.json())
        .then((data) => {
          state.notificationMessage = `${data.error ? "ERR: " : ""}${
            data.message
          }`;
          if (!data.error) {
            state.vehicleTypes.unshift(data.newVehicleType);
            componentMethods.closeDialog();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    onMounted(() => {
      fetchVehicleTypes();
    });

    const state = reactive({
      notificationMessage: "",
      loading: true,
      query: "",
      rows: 10,
      page: 1,
      options: [5, 10, 20, 50],
      count: 0,
      vehicleTypes: [],
      dialogOpened: false,
      newVehicleType: {
        make: "",
        model: "",
        year: 0,
      },
    });

    const componentMethods = {
      inputHandler: (useDebounce, resetPage) => {
        clearTimeout(debounceTimeout);
        state.page = resetPage ? 1 : state.page;
        state.loading = true;
        if (!useDebounce) {
          fetchVehicleTypes();
          return;
        }
        debounceTimeout = setTimeout(() => {
          fetchVehicleTypes();
        }, debounce);
      },
      pageHandler: (val) => {
        state.page += val;
        componentMethods.inputHandler(false);
      },
      deleteVehicleType: (vehicleTypeID) => {
        deleteVehicleType(vehicleTypeID);
      },
      createVehicleType: () => {
        createVehicleType();
      },
      closeDialog() {
        state.newVehicleType = {
          make: "",
          model: "",
          year: 0,
        };
        state.dialogOpened = false;
      },
    };

    return { state, componentMethods };
  },
};
</script>

<style scoped>
.hidden {
  visibility: hidden;
}
.search {
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.select {
  margin: 0 5px;
}
.rows-per-page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
}
.pages {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.create-new {
  margin-bottom: 20px;
  display: flex;
  justify-content: end;
  align-items: center;
  width: 100%;
}
.page {
  font-weight: bold;
}
.pagination {
  margin: 0 5px;
  cursor: pointer;
}
.pagination:hover {
  color: rgb(73, 73, 255);
}

.separator {
  margin: 0 5px;
}
.input-box {
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  border: 1px solid rgb(110, 110, 110);
  background-color: white;
  align-items: center;
}
input {
  border: none;
  outline: none;
  width: 100%;
  height: 30px;
  padding: 10px;
  margin: 5px;
}

.form {
  margin: 10px 0;
}

.loader {
  margin: 0 5px;
  border: 4px solid #a7a7a7;
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 20px;
  height: 18px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

.dialog-header {
  font-size: large;
  font-weight: bold;
  border-bottom: 1px solid grey;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
.button {
  cursor: pointer;
  border: 1px solid rgb(110, 110, 110);
  border-radius: 5px;
  outline: none;
  padding: 5px;
  font-weight: bold;
}
.button:active {
  background-color: grey;
}
.create-button {
  background-color: rgb(83, 170, 83);
}
.buttons {
  display: flex;
  justify-content: end;
}
.buttons > * {
  margin-left: 10px;
}
/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
