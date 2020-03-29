<template>
  <div class="dashboard-details">
    <div class="name">
      <h2>{{ client.fullname }}</h2>
    </div>
    <h3>Active services ({{ client.typeOfService.length }})</h3>
    <div class="active-services" :class="[client.typeOfService.length < 2 ? test : '']">
      <Service v-for="service in client.typeOfService" :key="service._id" :service="service" />
    </div>
    <!-- <div class="actions">
      <div class="send-email">
        <i class="material-icons">email</i>
        <p>Send an email</p>
      </div>
      <div class="delete">
        <i class="material-icons">delete_forever</i>
        <p>Delete forever</p>
      </div>
    </div>-->
  </div>
</template>

<script>
import Service from "@/components/Services";
export default {
  components: { Service },
  name: "ClientDetails",
  data() {
    return {
      client: this.$route.params,
      test: "test"
    };
  }
};
</script>

<style lang="scss" scoped>
.dashboard-details {
  padding-top: 80px;
}
.active-services {
  display: grid;
  grid-gap: 1px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
    width: 90%;
    margin: auto;
  }
  .test {
    width: 60%;
  }
}
</style>
