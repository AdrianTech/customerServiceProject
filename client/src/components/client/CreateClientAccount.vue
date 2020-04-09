<template>
  <div class="createClient">
    <form class="form" @submit.prevent="submitData">
      <label>Full name</label>
      <input v-model.trim="fullname" type="text" />
      <label>Email</label>
      <input v-model.trim="email" type="text" />
      <label>Phone</label>
      <input v-model.trim="phone" type="text" />
      <button>Submit</button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "CreateClientAccount",
  components: {},
  data() {
    return {
      fullname: "",
      phone: "",
      email: "",
      typeOfService: []
    };
  },
  computed: {
    ...mapGetters([""])
  },
  methods: {
    ...mapActions([""]),
    submitData() {
      const data = {
        fullname: this.fullname,
        phone: this.phone,
        email: this.email,
        typeOfService: this.typeOfService
      };
      console.log(data);
    }
  }
};
</script>

<style lang="scss" scoped>
.createClient {
  .form {
    height: auto;
  }
  button {
    @include primary-btn;
  }
}
@media (min-width: 500px) {
}
@media (min-width: 768px) {
}
@media (min-width: 1000px) {
}
</style>