<template >
  <div class="alert" :class="eventInfo.status === 400 ? 'fail': null" v-if="eventInfo.bool">
    <h4>{{eventInfo.msg}}</h4>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Alert",
  data() {
    return {
      type: "Alert"
    };
  },
  computed: {
    ...mapGetters(["eventInfo"])
  }
};
</script>

<style lang="scss" scoped>
.alert {
  position: fixed;
  bottom: 5%;
  left: 50%;
  width: 80%;
  background-color: #fff;
  border: 2px solid green;
  padding: 8px;
  z-index: 200;
  color: green;
  font-family: $openSans;
  transform: translateX(-50%);
  border-radius: 8px;
  text-align: center;
}
.fail {
  border: 3px solid red;
  color: red;
  h4 {
    font-size: 18px;
  }
}
@media (min-width: 500px) {
}
@media (min-width: 768px) {
  .alert {
    width: 60%;
    h4 {
      font-size: 23px;
    }
  }
}
@media (min-width: 1000px) {
  .alert {
    width: 50%;
  }
}
</style>