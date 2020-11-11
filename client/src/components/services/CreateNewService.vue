<template>
  <section class="createNewService">
    <form class="form">
      <label>Name of service</label>
      <input v-model.trim="name" value="name" type="text" />
      <label>Unit Price (monthly)</label>
      <input v-model.number.trim="unitPrice" value="unitPrice" type="text" />
      <label>Default number of months</label>
      <input min="0" max="36" v-model.number.trim="months" type="number" />
      <button @click.prevent="serviceHandler" class="modal-btn">Confirm</button>
    </form>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { serviceValidation } from "@/shared/validate.js";
export default {
  data() {
    return {
      name: "",
      unitPrice: 0,
      months: 0
    };
  },
  computed: {
    ...mapGetters(["services"])
  },
  methods: {
    ...mapActions(["errHandler", "createService"]),
    async serviceHandler() {
      const { name, unitPrice, months } = this;
      const data = {
        name,
        unitPrice,
        months
      };
      const { err, status } = await serviceValidation(data);
      if (!status) return this.errHandler({ msg: err[0], status: 400 });
      const result = await this.createService(data);
      result &&
        Object.assign(this.$data, { name: "", unitPrice: "", months: 0 });
    }
  }
};
</script>

<style lang="scss" scoped>
.createNewService {
  @include inside(100%, 100%);
}
button {
  max-width: 250px;
  margin: 20px auto;
}
@media (min-width: 500px) {
  .createNewService {
    @include inside(80%, 90%);
    form {
      width: 60%;
    }
  }
}
@media (min-width: 768px) {
  .createNewService {
    @include inside(70%, 90%);
    form {
      width: 60%;
      height: 100%;
    }
  }
}
@media (min-width: 1000px) {
  .createNewService {
    form {
      width: 40%;
    }
  }
}
</style>