<template >
  <div class="alert" :class="eventInfo.status === 400 ? 'fail': null" v-if="eventInfo.bool">
    <h3>{{eventInfo.msg}}</h3>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Alert",
  data() {
    return {
      type: "Alert"
    };
  },
  computed: {
    ...mapGetters(["eventInfo"])
  },

  methods: {
    ...mapActions([""])
  }
};
</script>

<style lang="scss" scoped>
.alert {
  position: fixed;
  bottom: 2%;
  left: 50%;
  background-color: #fff;
  border: 2px solid green;
  padding: 10px;
  z-index: 200;
  transform: translateX(-50%);
  border-radius: 8px;
}
.fail {
  border: 2px solid red;
  color: red;
}
@media (min-width: 500px) {
}
@media (min-width: 768px) {
  .alert {
    padding: 10px 25px;
  }
}
@media (min-width: 1000px) {
  // .alert {
  //   left: 50%;
  //   transform: translateX(-50%);
  // }
}
</style>