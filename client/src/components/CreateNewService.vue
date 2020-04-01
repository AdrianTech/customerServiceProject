<template>
  <section class="createNewService">
    <form class="form">
      <label>Name of service</label>
      <input v-model.trim="name" value="name" type="text" />
      <label>Unit Price</label>
      <input v-model.number.trim="unitPrice" value="unitPrice" type="number" />
      <button @click.prevent="serviceHandler">Confirm all data</button>
      <h3 v-if="eventInfo.bool">{{eventInfo.message}}</h3>
    </form>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { createNewServiceValid } from "@/shared/validation.js";
export default {
  components: {},
  data() {
    return {
      name: "",
      unitPrice: "",
      values: 0
    };
  },
  computed: {
    ...mapGetters(["services", "eventInfo"])
  },
  methods: {
    ...mapActions(["errHandler"]),
    serviceHandler() {
      const { name, unitPrice } = this;
      const data = {
        name,
        unitPrice
      };
      const { msg, bool } = createNewServiceValid(data);
      if (!bool) return this.errHandler(msg);
    }
  }
};
</script>

<style lang="scss" scoped>
.createNewService {
  padding-top: 80px;
}
@media (min-width: 500px) {
}
@media (min-width: 768px) {
}
@media (min-width: 1000px) {
}
</style>
//