<template>
  <div class="inside">
    <h4>Extend for another {{ months === 1 ? `${months} month` : `${months} months` }} or more</h4>
    <div class="input">
      <input type="number" min="1" max="36" v-model.trim.number="months" />
      <button class="modal-btn" @click="extendService({ value, serviceID, clientID, page })">Extend</button>
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
    ...mapGetters(["page"]),
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
  methods: {
    ...mapActions(["errHandler", "extendService"])
  }
};
</script>

<style lang="scss" scoped>
.inside {
  @include inside(80%, 70%);
  h4 {
    margin-bottom: 30px;
  }
}
.input {
  width: 100%;
  padding: 10px;
  input {
    padding: 5px;
    font-size: 16px;
    width: 40%;
    font-family: $openSans;
    border-radius: 6px;
    font-weight: 700;
    text-align: center;
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
  .input {
    width: 75%;
  }
}
@media (min-width: 768px) {
  .inside {
    @include inside(50%, 70%);
  }
  .input {
    width: 60%;
    input {
      font-size: 18px;
    }
  }
}
@media (min-width: 1000px) {
}
</style>
