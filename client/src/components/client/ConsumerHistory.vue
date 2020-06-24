<template>
  <div class="inside">
    <h3>{{clientName}}</h3>
    <div class="item" v-for="({name, _id, extendTimes, closed}) in history" :key="_id">
      <h4>Service name: {{name}}</h4>
      <p>Extended: {{extendTimes}} times</p>
      <p>Closed: {{closed}}</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import moment from "moment-timezone";
export default {
  name: "ConsumerHistory",
  props: ["history", "clientName"],
  methods: {
    ...mapActions([""])
  },
  mounted() {
    this.history.forEach(i => {
      i.closed = moment(i.closed)
        .clone()
        .tz(moment.tz.guess())
        .format("LLL");
    });
  }
};
</script>

<style lang="scss" scoped>
.inside {
  @include inside(100%, 100%);
  justify-content: flex-start;
}
.item {
  border: 1px solid white;
  padding: 10px;
  width: 70%;
  margin: 10px;
}
@media (min-width: 500px) {
}
@media (min-width: 768px) {
  .inside {
    @include inside(70%, 90%);
    justify-content: flex-start;
  }
}
@media (min-width: 1000px) {
}
</style>