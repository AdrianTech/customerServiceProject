<template>
  <div class="switch">
    <label>{{ checked ? data.nameOff : data.nameOn }}</label>
    <input type="checkbox" v-model="checked" @change="onChange" />
  </div>
</template>

<script>
export default {
  name: "SwitchToggle",
  props: {
    data: {
      nameOn: String,
      nameOff: String,
      state: Boolean,
    },
  },
  data() {
    return {
      checked: this.data.state,
    };
  },
  methods: {
    onChange() {
      this.$emit("checkedEvent", this.checked);
    },
  },
};
</script>

<style lang="scss" scoped>
.switch {
  @include flexCentered;
  font-family: $openSans;
  margin: 20px 0;
}
label {
  margin: 3px;
  font-size: 15px;
}
input[type="checkbox"] {
  appearance: none;
  border: none;
  position: relative;
  width: 65px;
  height: 30px;
  border-radius: 15px;
  background-color: #ddd;
  outline: none;
  cursor: pointer;
  transform: scale(0.8);
  box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.2);
  transition: background-color 0.5s ease-out;

  &::before {
    content: "";
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #fff;
    border: 1px solid #c2c1c1;
    transform: scale(1.1);
    left: 0;
    top: -2px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
    position: absolute;
    transition: 0.3s;
  }
  &:checked {
    background-color: #1fa504;
    &::before {
      left: 35px;
    }
  }
}
@media (min-width: 500px) {
}
@media (min-width: 768px) {
  input[type="checkbox"] {
    margin-left: 20px;
  }
  label {
    font-size: 19px;
    margin-left: 10px;
  }
}
@media (min-width: 1000px) {
}
</style>
