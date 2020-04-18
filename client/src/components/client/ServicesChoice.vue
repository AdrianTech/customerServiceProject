<template>
  <div :class="{ active: service.active }">
    <span v-if="!service.active" class="material-icons" @click="changeValue">check_box_outline_blank</span>
    <span v-else class="material-icons" @click="changeValue">check_box</span>
    <label>{{service.name}}</label>
    <label>Contract lenght:</label>
    <input
      v-model.number="service.months"
      min="0"
      max="36"
      type="number"
      placeholder="Min 1 month, max 36 months"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ServicesChoice",
  props: ["service", "modal"],
  components: {},
  computed: {
    ...mapGetters(["eventInfo"])
  },
  methods: {
    changeValue() {
      this.service.active = !this.service.active;
    }
  }
};
</script>

<style lang="scss" scoped>
.active {
  background-color: white;
  color: black;
}
label,
input {
  font-size: 15px;
}
label {
  text-align: center;
}

input {
  width: 30%;
  font-weight: 700;
}
@media (min-width: 500px) {
  input {
    width: 20%;
  }
}
@media (min-width: 768px) {
  input {
    width: 15%;
    font-size: 18px;
  }
  label {
    font-size: 18px;
  }
}
@media (min-width: 1000px) {
}
</style>