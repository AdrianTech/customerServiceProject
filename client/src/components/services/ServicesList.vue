<template>
  <div class="servicesList">
    <button @click="showList">Services list</button>
    <div class="wrapper" v-if="state">
      <div class="list" v-for="service in services" :key="service._id">
        <div class="item">
          <span>{{service.name}}</span>
          <span>{{service.unitPrice}}</span>
          <!-- <span></span> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ServicesList",
  components: {},
  data() {
    return {
      state: false
    };
  },
  computed: {
    ...mapGetters(["services"])
  },
  methods: {
    ...mapActions([""]),
    showList() {
      this.state = !this.state;
    }
  }
};
</script>

<style lang="scss" scoped>
.servicesList {
  width: 100%;
  @include absoluteCenter(50%, 90%, absolute);
  text-align: center;
  button {
    @include primary-btn;
  }
  .wrapper {
    position: absolute;
    width: 100%;
    margin-top: 15px;
    .item {
      display: flex;
      justify-content: space-evenly;
      width: 100%;
    }
  }
}
@media (min-width: 500px) {
  .servicesList {
    width: 80%;
    .wrapper {
      width: 100%;
      margin: 20px auto;
    }
  }
}
@media (min-width: 768px) {
}
@media (min-width: 1000px) {
}
</style>
