<template>
  <div :class="{ active: service.active }" class="wrap">
    <span v-if="!service.active" class="material-icons" @click="changeValue">check_box_outline_blank</span>
    <span v-else class="material-icons" @click="changeValue">check_box</span>
    <label>{{service.name}}</label>
    <label>Contract lenght:</label>
    <input
      @change="handleChange"
      v-model.number="service.months"
      min="0"
      max="36"
      type="number"
      placeholder="Min 1 month, max 36 months"
    />
    <div class="total">
      <span>Unit price: {{service.unitPrice}}</span>
      <span>Total: {{total.toFixed(2)}}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ServicesChoice",
  props: ["service", "modal", "totalSum"],
  computed: {
    ...mapGetters(["eventInfo"]),
    total() {
      return this.service.months * this.service.unitPrice;
    }
  },
  methods: {
    changeValue() {
      this.service.active = !this.service.active;
      this.handleChange();
    },
    handleChange() {
      this.service.total = this.total;
      this.$emit("totalSum");
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  position: relative;
}
.active {
  background-color: white;
  color: black;
}
label,
input {
  font-size: 15px;
  margin: 7px 0;
}
label {
  text-align: center;
  line-height: 1;
}
.total {
  position: absolute;
  display: flex;
  justify-content: center;
  bottom: 0;
  font-size: 13px;
  width: 90%;
  margin: 0 auto;
  span:first-child {
    margin-right: 10px;
  }
  span:nth-child(2) {
    font-weight: 700;
  }
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
@media (min-width: 750px) {
  input {
    width: 15%;
    font-size: 18px;
  }
  label {
    font-size: 18px;
  }
  .total {
    font-size: 14px;
    // left: 50%;
    // transform: translateX(-50%);
  }
}
@media (min-width: 1000px) {
  input,
  label {
    font-size: 20px;
  }
}
</style>