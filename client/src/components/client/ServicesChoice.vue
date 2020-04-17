<template>
  <div :class="{ active: service.active }">
    <div>
      <input type="checkbox" :value="service.active" v-on:change="changeValue" />
      <label>{{service.name}}</label>
    </div>
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
  data() {
    return {
      months: 0,
      checked: false
    };
  },
  components: {},
  mounted() {
    console.log(this.service);
  },
  computed: {
    ...mapGetters(["eventInfo"])
  },
  methods: {
    changeValue() {
      this.service.active = !this.service.active;
    }
  },
  updated() {
    if (this.eventInfo.bool) {
      this.service.active = false;
      this.service.moths = 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.active {
  background-color: white;
  color: black;
}
@media (min-width: 500px) {
}
@media (min-width: 768px) {
}
@media (min-width: 1000px) {
}
</style>
// v-on:input="(e) => this.$emit('test', e)"
// v-on:input="(e) => this.$emit('test', e)"