<template >
  <div class="alert" v-if="eventInfo.bool">
    <h3>{{eventInfo.msg}}</h3>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Alert",
  computed: {
    ...mapGetters(["eventInfo"])
  },

  methods: {
    ...mapActions([""])
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