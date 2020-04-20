<template>
  <div class="modal">
    <form class="form" @submit.prevent="submitData" v-if="servicesArr.length > 0">
      <h4>{{ client.fullname }}</h4>
      <div class="list" v-for="service in servicesArr" :key="service._id">
        <div :class="{ active: service.active }">
          <span
            v-if="!service.active"
            class="material-icons"
            @click="changeValue(service._id)"
          >check_box_outline_blank</span>
          <span v-else class="material-icons" @click="changeValue(service._id)">check_box</span>
          <label>{{service.name}}</label>
          <label>Contract lenght:</label>
          <input
            v-model.number="service.months"
            min="0"
            max="36"
            type="number"
            placeholder="Min 1 month, max 36 months"
          />
        </div>
      </div>
      <button>Confirm</button>
      <Alert />
    </form>
    <button class="exit" @click="exit">Exit</button>
    <h3 v-if="servicesArr.length === 0">Nothing to add</h3>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Alert from "../events/Alert";
export default {
  name: "AddNewService",
  components: { Alert },
  props: ["id"],
  data() {
    return {
      client: [],
      servicesArr: []
    };
  },
  mounted() {
    this.setServicesArr();
  },
  computed: {
    ...mapGetters(["services", "clientData", "eventInfo"])
  },
  methods: {
    ...mapActions(["addNewServiceToClient", "errHandler"]),
    exit() {
      this.$emit("update", false);
    },
    changeValue(id) {
      this.servicesArr.forEach(item => {
        if (item._id === id) {
          item.active = !item.active;
        }
      });
    },
    setServicesArr() {
      const ary = JSON.parse(JSON.stringify(this.services));
      console.log(ary);
      const findClient = this.clientData.filter(i => i._id === this.id);
      console.log(findClient);
      this.client = findClient[0];
      this.servicesArr = ary.filter(
        i =>
          !this.client.typeOfService.some(
            a => i._id === a._id && i.active !== a.active
          )
      );
      console.log(this.servicesArr);
    },
    submitData() {
      const { id } = this;
      const filtered = this.servicesArr.filter(
        ({ active, months }) => active && months > 0
      );
      if (filtered.length === 0)
        return this.errHandler({
          msg: "Please, check at least one service and choose number of months",
          status: 400
        });
      const data = {
        filtered,
        id
      };
      data;
      this.addNewServiceToClient(data);
      setTimeout(() => {
        this.setServicesArr();
      }, 500);
    }
    // }
  }
};
</script>

<style lang="scss" scoped>
.exit {
  position: absolute;
  bottom: 0;
}
.active {
  background-color: white;
  color: black;
}
@media (min-width: 500px) {
}
@media (min-width: 768px) {
  .modal {
    width: 50%;
  }
}
@media (min-width: 1000px) {
}
</style>
