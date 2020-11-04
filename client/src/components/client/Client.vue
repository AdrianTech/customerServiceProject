<template>
  <div class="client" v-if="typeOfService && index < 10">
    <div class="counter">
      <div class="counter-details">
        <span :style="{color: setColor}" v-if="typeOfService.length > 0">{{ daysCounter }}</span>
        <span class="empty" v-else>Empty</span>
      </div>
      <span class="more" v-if="typeOfService.length > 1">And {{ typeOfService.length - 1 }} more</span>
    </div>
    <div class="fullname">
      <div @click="clientDetails()">
        <span>{{ fullname }}</span>
        <span class="showClientDetails">Show me details</span>
      </div>
    </div>
    <div class="actions">
      <div class="email-action">
        <button @click="openModal(_id)">
          <img src="../../assets/mail.png" alt="email" />
        </button>
        <p>Send email</p>
      </div>
      <Modal v-if="open" :modalID="_id">
        <SendEmail :clientID="_id" :name="fullname" :email="email" />
      </Modal>
    </div>
  </div>
</template>

<script>
import timeCounter from "@/shared/TimeCounter";
import { mapActions, mapGetters } from "vuex";
import { findObj } from "../../shared/sharedFunctions.js";
import Modal from "../events/Modal";
import SendEmail from "./SendEmail";
export default {
  name: "Client",
  components: {
    Modal,
    SendEmail
  },
  data() {
    return {
      endTime: this.typeOfService.length > 0 && this.typeOfService[0].finishTime
    };
  },
  props: {
    _id: String,
    typeOfService: Array,
    fullname: String,
    email: String,
    notes: Array,
    index: Number
  },
  computed: {
    ...mapGetters(["modals"]),
    open() {
      return findObj(this.modals, this._id);
    },
    setColor() {
      let color = "#030f36";
      if (this.daysCounter < 21) color = "#0f741d";
      if (this.daysCounter <= 7 || this.daysCounter === "undone")
        color = "#e70202";
      return color;
    },
    daysCounter() {
      let time = "undone";
      const test = Math.sign(timeCounter(this.endTime));
      if (test !== -1) time = timeCounter(this.endTime);
      return time;
    }
  },
  methods: {
    ...mapActions(["openModal"]),
    clientDetails() {
      const { _id } = this;
      this.$router.push({
        name: "ClientDetails",
        params: { id: _id }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.client {
  display: flex;
  text-align: center;
  font-size: 14px;
  align-items: center;
  border-bottom: 1px solid $dark-blue;
  font: 15px $openSans;
  padding: 5px 0;
  &:first-child {
    border-top: 1px solid $dark-blue;
  }
  .counter {
    flex: 1;
    flex-direction: column;
    .more {
      font-size: 13px;
    }
  }
  img {
    @include imgSize;
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
    cursor: pointer;
    .email-action {
      button {
        background-color: transparent;
        border: none;
      }
      p {
        font-size: 13px;
        position: relative;
        bottom: 6px;
      }
    }
  }
  .counter-details {
    span {
      font-size: 15px;
      font-weight: 700;
    }
    .empty {
      font-size: 15px;
    }
  }
}
@media (min-width: 500px) {
  .client {
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
    font-size: 21px;
    // padding: 10px 0;
    .more {
      font-size: 15px;
    }
    .actions .email-action p {
      font-size: 14px;
    }
    .counter-details {
      span {
        font-size: 18px;
      }
    }
  }
}
</style>
