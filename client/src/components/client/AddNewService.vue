<template>
  <div class="modal">
    <form class="form" @submit.prevent="submitData">
      <h4>{{ client.fullname }}</h4>
      <div class="list" v-for="service in servicesList" :key="service._id">
        <div>
          <input
            type="checkbox"
            true-value="true"
            false-value="false"
            v-model.lazy="service.active"
          />
          <label for>{{ service.name }}</label>
        </div>
        <label for>Contract Length</label>
        <input type="number" min="0" max="36" v-model.lazy="service.months" :key="service._id" />
      </div>
      <button>Confirm</button>
      <Alert />
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Alert from "../events/Alert";
export default {
  name: "AddNewService",
  components: { Alert },
  props: ["id", "show"],
  data() {
    // const { id } = this.$route.params;
    return {
      client: [],
      servicesList: [],
      buttonCheck: null
    };
  },
  mounted() {
    this.test();
    console.log("mounted", new Date());
    // const findClient = this.clientData.filter(i => i._id === this.id);
    // this.client = findClient[0];
    // let filtered = this.services.filter(
    //   i =>
    //     !this.client.typeOfService.some(
    //       a => i._id === a._id && i.active !== a.active
    //     )
    // );
    // filtered.forEach(i => (i.months = 0));
    // this.servicesList = filtered;
  },
  computed: {
    ...mapGetters(["services", "clientData", "eventInfo"])
  },
  methods: {
    ...mapActions(["addNewServiceToClient", "errHandler"]),
    test() {
      console.log("test", new Date());
      const findClient = this.clientData.filter(i => i._id === this.id);
      this.client = findClient[0];
      let filtered = this.services.filter(
        i =>
          !this.client.typeOfService.some(
            a => i._id === a._id && i.active !== a.active
          )
      );
      filtered.forEach(i => (i.months = 0));
      this.servicesList = filtered;
    },
    submitData() {
      const { servicesList, id } = this;
      let valid = 0;
      const filtered = servicesList.filter(i => {
        if (i.active === "true") {
          i.active = Boolean(i.active);
          i.months = +i.months;
          return i;
        } else if (i.months === 0) valid++;
      });
      console.log(valid);
      if (valid == servicesList.length || filtered.length === 0)
        return this.errHandler(
          "Check at least one field and set contract length"
        );
      // const { active, name, unitPrice, months } = filtered[0];
      const data = {
        filtered,
        id
      };
      this.addNewServiceToClient(data);
      this.client = [];
      this.test();
      this.$emit("update", false);
    }
  }
};
</script>

<style lang="scss" scoped>
@media (min-width: 500px) {
}
@media (min-width: 768px) {
}
@media (min-width: 1000px) {
}
</style>
