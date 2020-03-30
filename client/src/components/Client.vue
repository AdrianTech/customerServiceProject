<template>
  <div class="client">
    <div class="counter">
      <div class="counter-details">
        <span>{{ displayTimeCounter() }}</span>
      </div>
      <span class="more" v-if="typeOfService.length > 0">And {{ typeOfService.length - 1 }} more</span>
    </div>
    <div class="fullname">
      <div @click="clientDetails()">
        <span>{{ fullname }}</span>
        <span class="showClientDetails">Show me details</span>
      </div>
    </div>
    <div class="actions">EMAIL</div>
    <button class="addService">
      <span>+</span>
    </button>
  </div>
</template>

<script>
import timeCounter from "@/shared/TimeCounter";
export default {
  name: "Client",
  data() {
    return {
      endTime: this.typeOfService[0].finishTime
    };
  },
  props: {
    _id: String,
    typeOfService: Array,
    fullname: String,
    email: String,
    notes: Array
  },
  methods: {
    clientDetails() {
      const { _id, typeOfService, fullname, email, notes } = this;
      this.$router.push({
        name: "ClientDetails",
        params: { id: _id, typeOfService, fullname, email, notes }
      });
    },
    displayTimeCounter() {
      return timeCounter(this.endTime);
    }
  }
};
</script>

<style lang="scss" scoped>
.client {
  display: flex;
  text-align: center;
  font-size: 14px;
  // margin-top: 15px;
  align-items: center;
  border-bottom: 1px solid black;
  padding: 7px 0;
  &:first-child {
    border-top: 1px solid black;
  }
  .counter {
    flex: 1;
    flex-direction: column;
    .more {
      font-size: 13px;
    }
  }
  .fullname {
    flex: 2;
    cursor: pointer;
    .showClientDetails {
      font-size: 0.6em;
      display: block;
    }
  }
  .actions {
    flex: 1;
  }
  .counter-details {
    span {
      font-size: 15px;
      font-weight: 700;
    }
  }
}
@media (min-width: 500px) {
  .client {
    font-size: 17px;
    .more {
      font-size: 14px;
    }
    .counter-details {
      span {
        font-size: 17px;
      }
    }
  }
}
@media (min-width: 768px) {
  .client {
    font-size: 20px;
    padding: 10px 0;
    .more {
      font-size: 15px;
    }
    .counter-details {
      span {
        font-size: 18px;
      }
    }
  }
}
</style>
