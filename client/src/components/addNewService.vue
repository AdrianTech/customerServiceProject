<template>
  <form class="form">This is form</form>
</template>

<script>
// import { mapGetters, mapActions } from "vuex";
export default {
  name: "AddNewService",
  data() {
    const { name, typeOfService, id } = this.$route.params;
    return {
      name,
      typeOfService,
      id
    };
  },
  mounted() {
    console.log(this.name);
  }
  //   computed: {
  //     ...mapGetters([""])
  //   },
  //   methods: {
  //     ...mapActions([""])
  //   }
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