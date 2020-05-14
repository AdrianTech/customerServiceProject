<template>
  <div class="inside">
    <h4>Extend for another {{ months === 1 ? `${months} month` : `${months} months` }} or more</h4>
    <div class="input">
      <input type="number" v-model.trim.number="months" />
      <button class="modal-btn" @click="extendService({ value, serviceID, clientID })">Extend</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ExtendService",
  props: ["service", "clientID"],
  data() {
    return {
      value: this.service.months
    };
  },
  computed: {
    ...mapGetters([""]),
    serviceID() {
      return this.service._id;
    },
    months: {
      get() {
        return this.value;
      },
      set(val) {
        return (this.value = val);
      }
    }
  },
  mounted() {
    console.log(this.serviceID);
  },
  methods: {
    ...mapActions(["errHandler", "extendService"])
  }
};
</script>

<style lang="scss" scoped>
.inside {
  @include inside(70%, 70%);
  h4 {
    margin-bottom: 30px;
  }
}
.input {
  max-width: 70%;
  padding: 10px;
  input {
    padding: 5px;
    font-size: 16px;
    width: 40%;
    font-family: $openSans;
    border-radius: 6px;
    font-weight: 700;
  }
  button {
    display: inherit;
    min-width: 60%;
  }
}

@media (min-width: 500px) {
  .inside {
    @include inside(70%, 70%);
  }
}
@media (min-width: 768px) {
  .inside {
    @include inside(50%, 70%);
  }
  .input input {
    font-size: 18px;
  }
}
@media (min-width: 1000px) {
}
</style>
