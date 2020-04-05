<template>
  <div class="dashboard-details">
    <div class="client-details">
      <div class="name">
        <h2>{{ fullname }}</h2>
      </div>
      <div class="data">
        <div class="item">
          <span class="material-icons">mail_outline</span>
          {{email}}
        </div>
        <div class="item">
          <span class="material-icons">phone</span> 675 555 234
        </div>
        <div class="item">
          <button>Show me notes</button>
        </div>
      </div>
      <div class="actions">
        <div class="send-email">
          <span class="material-icons">mail_outline</span>
          <p>Send Email</p>
        </div>
        <div class="add-note">
          <span class="material-icons">note_add</span>
          <p>Add note</p>
        </div>
      </div>
    </div>
    <h3>Active services ({{ typeOfService.length }})</h3>
    <div class="test">
      <div class="active-services" :class="[typeOfService.length < 2 ? extraWidth : '']">
        <Service
          v-for="service in typeOfService"
          :key="service._id"
          :clientId="id"
          :service="service"
        />
      </div>
    </div>
    <button @click="addService" class="addService">
      <span>+</span>
    </button>
  </div>
</template>

<script>
import Service from "@/components/services/Services";
export default {
  components: { Service },
  name: "ClientDetails",
  data() {
    const { fullname, typeOfService, notes, id, email } = this.$route.params;
    return {
      extraWidth: "extraWidth",
      fullname,
      typeOfService,
      notes,
      id,
      email
    };
  },
  methods: {
    addService() {
      this.$router.push({
        name: "Add New Service",
        params: {
          id: this.id,
          service: this.typeOfService,
          name: this.fullname
        }
      });
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
  padding: 10px;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  text-align: center;
  width: 100%;
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
