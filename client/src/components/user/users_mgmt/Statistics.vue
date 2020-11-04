<template>
  <div class="statistics" v-if="clients.length > 0">
    <div class="item">
      <p>
        You have
        <span>{{clients.length}}</span> clients
      </p>
    </div>
    <div class="item">
      <p>
        They bought
        <span>{{totalNumberOfServices}}</span> services
      </p>
    </div>
    <div class="item">
      <p>
        And this is
        <span>{{(totalNumberOfServices / clients.length).toFixed(2)}}</span> services per one client
      </p>
    </div>
    <hr />
  </div>
  <div class="loading" v-else>Loading...</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Statistics",
  props: ["clients"],
  components: {},
  computed: {
    ...mapGetters(["clientData"]),
    totalNumberOfServices() {
      return this.clients.reduce(
        (acc, { typeOfService }) => acc + typeOfService.length,
        0
      );
    }
  },
  methods: {
    ...mapActions([""])
  }
};
</script>

<style lang="scss" scoped>
.statistics {
  padding: 0 10px 20px 0;
  hr {
    width: 50%;
    margin: 15px auto;
  }
}
.loading {
  text-align: center;
  font-size: 18px;
}
.item {
  width: 80%;
  margin: 5px auto;
  text-align: center;
  span {
    font-weight: 700;
    color: #972c02;
  }
}
@media (min-width: 500px) {
}
@media (min-width: 768px) {
  .statistics hr {
    width: 30%;
  }
  .item {
    font-size: 18px;
    span {
      font-size: 20px;
    }
  }
}
@media (min-width: 1000px) {
}
</style>