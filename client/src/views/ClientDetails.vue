<template>
  <div class="dashboard-details" v-if="data.typeOfService !== undefined">
    <div class="client-details">
      <div class="name">
        <h2>{{ data.fullname }}</h2>
        <span class="material-icons removeClient" @click="removeClient(id)">highlight_off</span>
        <Modal v-if="updateOpen" :modalID="updateID">
          <UpdateClient :data="data" @update="updateForm" />
        </Modal>
        <span @click="openModal(updateID)" class="material-icons removeClient">update</span>
      </div>
      <div class="data">
        <div class="item pointer" @click="openModal(emailID)">
          <span class="material-icons">mail_outline</span>
          {{ data.email }}
        </div>
        <div class="item">
          <span class="material-icons">phone</span> 675 555 234
        </div>
        <div class="item">
          <button @click="clientNotes">Show me notes</button>
        </div>
      </div>
    </div>
    <div class="services-header">
      <h3>Active services ({{ data.typeOfService.length }})</h3>
      <button
        v-if="data.servicesHistory.length > 0"
        class="btn-history"
        @click="openModal(history)"
      >Client's history</button>
    </div>
    <div
      v-if="data.typeOfService.length > 0"
      class="active-services"
      :class="[data.typeOfService.length < 2 ? extraWidth : '']"
    >
      <Services
        v-for="service in data.typeOfService"
        :key="service._id"
        :clientId="id"
        :service="service"
      />
    </div>
    <button @click="openModal(addServiceID)" class="btn-add">
      <img src="../assets/add.png" alt="add button" />
    </button>
    <Modal v-if="addServiceOpen" :modalID="addServiceID">
      <AddNewServiceToClient :id="id" :data="prop" />
    </Modal>
    <Modal v-if="emailOpen" :modalID="emailID">
      <SendEmail :clientID="id" :name="data.fullname" :email="data.email" />
    </Modal>
    <Modal v-if="consumerHistory" :modalID="history">
      <ConsumerHistory :history="data.servicesHistory" :clientName="data.fullname" />
    </Modal>
  </div>
</template>

<script>
import Services from "@/components/client/ClientServices";
import { mapGetters, mapActions } from "vuex";
import AddNewServiceToClient from "../components/client/AddNewService";
import Modal from "../components/events/Modal";
import UpdateClient from "../components/client/UpdateClient";
import SendEmail from "../components/client/SendEmail";
import ConsumerHistory from "../components/client/ConsumerHistory";
import { setClientData, findObj, generateID } from "../shared/sharedFunctions";
export default {
  components: {
    Services,
    AddNewServiceToClient,
    UpdateClient,
    Modal,
    SendEmail,
    ConsumerHistory
  },
  name: "ClientDetails",
  data() {
    const { id, from, prop } = this.$route.params;
    return {
      extraWidth: "extraWidth",
      id,
      from,
      prop,
      data: {},
      addServiceID: generateID(),
      updateID: generateID(),
      emailID: generateID(),
      history: generateID()
    };
  },
  mounted() {
    this.from !== "search"
      ? (this.data = setClientData(this.id, this.clientData))
      : (this.data = this.prop);
  },
  computed: {
    ...mapGetters(["clientData", "modals"]),
    addServiceOpen() {
      return findObj(this.modals, this.addServiceID);
    },
    updateOpen() {
      return findObj(this.modals, this.updateID);
    },
    emailOpen() {
      return findObj(this.modals, this.emailID);
    },
    consumerHistory() {
      return findObj(this.modals, this.history);
    }
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
        params: { id: this.id, data: this.prop, from: this.from }
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
  font-family: $openSans;
}
.active-services {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 300px));
  grid-gap: 15px 5px;
  padding-top: 15px;
  justify-content: space-evenly;
}
.services-header {
  display: flex;
  justify-content: center;
  .btn-history {
    background-color: transparent;
    border: 1px solid $dark-blue;
    border-radius: 7px;
    padding: 4px 10px;
    margin-left: 10px;
  }
  h3 {
    font-size: 17px;
  }
}
.pointer {
  cursor: pointer;
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
  .services-header h3 {
    font-size: 21px;
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
  .extra-width {
    width: 60%;
  }
}
</style>
