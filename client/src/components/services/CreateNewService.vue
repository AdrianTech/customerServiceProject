<template>
  <section class="createNewService">
    <form class="form">
      <label>Name of service</label>
      <input v-model.trim="name" value="name" type="text" />
      <label>Unit Price</label>
      <input v-model.number.trim="unitPrice" value="unitPrice" type="text" />
      <button @click.prevent="serviceHandler">Confirm</button>
    </form>
    <ServicesList />
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { createNewServiceValid } from "@/shared/validation.js";
import ServicesList from "./ServicesList";
export default {
  components: { ServicesList },
  data() {
    return {
      name: "",
      unitPrice: ""
    };
  },
  computed: {
    ...mapGetters(["services", "eventInfo"])
  },
  methods: {
    ...mapActions(["errHandler", "createService"]),
    serviceHandler() {
      const { name, unitPrice } = this;
      const data = {
        name,
        unitPrice
      };
      const { msg, bool } = createNewServiceValid(data);
      if (!bool) return this.errHandler({ msg, status: 400 });
      this.createService(data);
      Object.assign(this.$data, { name: "", unitPrice: "" });
    }
  }
};
</script>

<style lang="scss" scoped>
.createNewService {
  padding-top: 80px;
  width: 100%;
  min-height: 100%;
  position: relative;
}
button {
  @include primary-btn;
  max-width: 150px;
}
@media (min-width: 500px) {
}
@media (min-width: 768px) {
  .createNewService {
    width: 75%;
    margin: auto;
  }
}
@media (min-width: 1000px) {
}
</style>