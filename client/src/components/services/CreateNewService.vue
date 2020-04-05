<template>
  <section class="createNewService">
    <form class="form">
      <label>Name of service</label>
      <input v-model.trim="name" value="name" type="text" />
      <label>Unit Price</label>
      <input v-model.number.trim="unitPrice" value="unitPrice" type="text" />
      <button @click.prevent="serviceHandler">Confirm</button>
      <Alert />
    </form>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { createNewServiceValid } from "@/shared/validation.js";
import Alert from "../events/Alert.vue";
export default {
  components: { Alert },
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
    ...mapActions(["errHandler", "createService"]),
    serviceHandler() {
      const { name, unitPrice } = this;
      const data = {
        name,
        unitPrice
      };
      const { msg, bool } = createNewServiceValid(data);
      if (!bool) return this.errHandler(msg);
      this.createService(data);
    }
  }
};
</script>

<style lang="scss" scoped>
.createNewService {
  padding-top: 80px;
}
button {
  @include primary-btn;
  max-width: 150px;
}
@media (min-width: 500px) {
}
@media (min-width: 768px) {
}
@media (min-width: 1000px) {
}
</style>