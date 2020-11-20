<template>
  <div class="select">
    <span>Choose currency:</span>
    <select v-model="selected" @change="changeEvent">
      <option v-for="option in options" :key="option.name" :disabled="option.value === state" :value="option.value">{{ option.name }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "Select",
  props: ["options", "state"],
  data() {
    return {
      selected: this.state,
    };
  },
  methods: {
    changeEvent() {
      this.$emit("selectEvent", this.selected);
    },
  },
};
</script>

<style lang="scss" scoped>
.select {
  margin: 10% 0 4% 0;
  text-align: center;
}
span {
  margin-right: 10px;
  font-weight: 700;
  font-size: 17px;
}
select {
  border: none;
  border-bottom: 2px solid $dark-blue;
  padding: 5px 10px;
  font-family: $openSans;
  background-color: #fff;
  font-size: 16px;
  outline: none;
  cursor: pointer;
}
@media (min-width: 500px) {
}
@media (min-width: 768px) {
  span {
    font-size: 19px;
  }
  .select {
    margin: 7% 0 4% 0;
  }
}
@media (min-width: 1000px) {
}
</style>
