<template>
  <div class="dashboard-details">
    <div class="name">
      <h2>{{ fullname }}</h2>
    </div>
    <h3>Active services ({{ typeOfService.length }})</h3>
    <div class="active-services" :class="[typeOfService.length < 2 ? extraWidth : '']">
      <Service
        v-for="service in typeOfService"
        :key="service._id"
        :clientId="id"
        :service="service"
      />
    </div>
    <button @click="addService" class="addService">
      <span>+</span>
    </button>
  </div>
</template>

<script>
import Service from "@/components/Services";
export default {
  components: { Service },
  name: "ClientDetails",
  data() {
    const { fullname, typeOfService, notes, id } = this.$route.params;
    return {
      extraWidth: "extraWidth",
      fullname,
      typeOfService,
      notes,
      id
    };
  },
  methods: {
    addService() {
      // console.log(this.clientID);
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
  padding-top: 80px;
}
.active-services {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 3px;
  padding: 10px;
}

.name {
  width: 100%;
  padding: 15px;
}
.name,
.active-services,
h3 {
  text-align: center;
}
.name,
.actions {
  padding: 10px 0;
}
.actions {
  display: flex;
  justify-content: space-around;
}
@media (min-width: 768px) {
  .active-services {
    grid-template-columns: repeat(auto-fit, minmax(250px, 300px));
    width: 90%;
    margin: auto;
  }
  .extra-width {
    width: 60%;
  }
}
</style>
