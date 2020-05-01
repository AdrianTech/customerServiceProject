<template>
  <div class="dashboard-details" v-if="data !== null">
    <div class="client-details">
      <div class="name">
        <h2>{{ data.fullname }}</h2>
        <span class="material-icons removeClient" @click="removeClient(data._id)">highlight_off</span>
        <Modal v-if="double">
          <UpdateClient :data="data" @update="updateForm" />
        </Modal>
        <span @click="openModal('double')" class="material-icons removeClient">update</span>
      </div>
      <div class="data">
        <div class="item">
          <span class="material-icons">mail_outline</span>
          {{data.email}}
        </div>
        <div class="item">
          <span class="material-icons">phone</span> 675 555 234
        </div>
        <div class="item">
          <button @click="clientNotes">Show me notes</button>
        </div>
      </div>
    </div>
    <h3>Active services ({{ data.typeOfService.length }})</h3>
    <div
      v-if="data.typeOfService.length > 0"
      class="active-services"
      :class="[data.typeOfService.length < 2 ? extraWidth : '']"
    >
      <Service
        v-for="service in data.typeOfService"
        :key="service._id"
        :clientId="id"
        :service="service"
      />
    </div>
    <button @click="openModal(true)" class="addService">
      <span>+</span>
    </button>
    <Modal v-if="isOpen">
      <AddNewServiceToClient :id="id" />
    </Modal>
  </div>
</template>

<script>
import Service from "@/components/services/Services";
import { mapGetters, mapActions } from "vuex";
import AddNewServiceToClient from "../components/client/AddNewService";
import Modal from "../components/events/Modal";
import UpdateClient from "../components/client/UpdateClient";
import { setClientData } from "../shared/sharedFunctions";
export default {
  components: { Service, AddNewServiceToClient, UpdateClient, Modal },
  name: "ClientDetails",
  data() {
    const { id } = this.$route.params;
    return {
      extraWidth: "extraWidth",
      id,
      data: null,
      show: false,
      update: false
    };
  },
  mounted() {
    this.data = setClientData(this.id, this.clientData);
  },
  computed: {
    ...mapGetters(["clientData", "isOpen", "double"])
  },
  watch: {
    clientData() {
      this.data = setClientData(this.id, this.clientData);
    }
  },
  methods: {
    ...mapActions(["deleteClient", "openModal"]),
    clientNotes() {
      this.$router.push({
        name: "ClientNotes",
        params: { id: this.id }
      });
    },
    removeClient(id) {
      const confirm = window.confirm(`Remove ${this.data.fullname} ?`);
      if (confirm) this.deleteClient(id);
    },
    updateForm() {
      this.update = !this.update;
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard-details {
  padding: 70px 12px 12px 12px;
  width: 100%;
  color: $dark-blue;
}
.active-services {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 15px 5px;
  padding-top: 15px;
  justify-content: space-evenly;
}
.data {
  display: flex;
  padding: 15px 10px;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  text-align: center;
  width: 100%;
  border-bottom: 1px solid $db-light;
  margin-bottom: 15px;
  .item {
    margin: 10px;
    font-size: 16px;
    @include flexCentered;
    span {
      margin-right: 8px;
    }
    button {
      @include primary-btn;
    }
  }
}
.name,
.active-services,
h3 {
  text-align: center;
}
.name,
.actions {
  padding: 10px 0;
  text-align: center;
}
.client-details {
  .name {
    h2 {
      display: inline-block;
    }
    .removeClient {
      color: red;
      font-size: 22px;
      opacity: 0;
      margin-left: 8px;
      top: 4px;
      position: relative;
      cursor: pointer;
      transition: opacity 0.35s;
      will-change: opacity;
    }
  }
  &:hover .removeClient {
    opacity: 1;
  }
}
.actions {
  display: flex;
  margin: 10px auto;
  border-top: 1px solid $db-light;
  border-bottom: 1px solid $db-light;
  justify-content: space-around;
  span {
    cursor: pointer;
  }
}
@media (min-width: 768px) {
  .dashboard-details {
    width: 80%;
    margin: auto;
  }
  .data {
    flex-direction: row;
    .item {
      font-size: 19px;
      button {
        font-size: 17px;
      }
    }
  }
  .client-details .name h2,
  .client-details .name .removeClient {
    font-size: 26px;
  }
  .active-services {
    grid-template-columns: repeat(auto-fit, minmax(250px, 300px));
    // width: 80%;
    // margin: auto;
  }
  // .client-details {
  //   // width: 80%;
  // }
  .extra-width {
    width: 60%;
  }
}
</style>
