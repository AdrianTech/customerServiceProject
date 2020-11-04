<template>
  <div class="service-details">
    <ul>
      <li>
        <span>Name</span>
        <span>{{ name }}</span>
      </li>
      <li>
        <span>Start</span>
        <span>{{ changeTime.start }}</span>
      </li>
      <li>
        <span>Finish</span>
        <span>{{ changeTime.end }}</span>
      </li>
      <li>
        <span>Extended</span>
        <span>{{ extendTimes }} times</span>
      </li>
      <li>{{ daysCounter > 0 ? `${daysCounter} days left` : `${daysCounter} days late` }}</li>
      <li @click="openModal(service._id)" class="service-actions">Extend this service</li>
      <Modal v-if="open" :modalID="service._id">
        <ExtendService :service="service" :clientID="clientID" />
      </Modal>
      <li
        class="service-actions"
        @click="closeService({serviceID:service._id, clientID, currentClientsPage})"
      >Close</li>
    </ul>
  </div>
</template>

<script>
import moment from "moment-timezone";
moment.locale("en-gb");
import timeCounter from "@/shared/TimeCounter";
import Modal from "../events/Modal";
import ExtendService from "./ExtendService";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ClientServices",
  props: ["service", "clientId"],
  components: { ExtendService, Modal },
  data() {
    return {
      name: this.service && this.service.name,
      startTime: this.service && this.service.startTime,
      clientID: this.clientId
    };
  },
  computed: {
    ...mapGetters(["modals", "currentClientsPage"]),
    open() {
      return this.modals.find(i => this.service._id === i.id && i.open);
    },
    extendTimes() {
      return this.service && this.service.extendTimes;
    },
    finishTime() {
      return this.service && this.service.finishTime;
    },
    changeTime() {
      const guess = moment.tz.guess();
      const end = moment(this.finishTime)
        .clone()
        .tz(guess)
        .format("lll");
      const start = moment(this.startTime)
        .clone()
        .tz(guess)
        .format("lll");
      return {
        end,
        start
      };
    },
    daysCounter() {
      return timeCounter(this.finishTime);
    }
  },
  methods: {
    ...mapActions(["openModal", "closeService"])
  }
};
</script>

<style lang="scss" scoped>
.service-details {
  border: 1px solid #0000002f;
  background-color: #f5f8f7;
  padding: 8px;
  position: relative;
}
ul li {
  display: flex;
  padding: 4px;
  border-bottom: 1px dotted rgba(0, 0, 0, 0.548);
  span {
    flex: 1;
    text-align: left;
    font-weight: 700;
    &:first-child {
      color: $dark-blue;
    }
    &:nth-child(2) {
      font-size: 15px;
      flex: 1.3;
    }
  }
  &:last-child {
    border-bottom: none;
  }
}

.service-actions {
  font-size: 14px;
  color: #c40606;
  cursor: pointer;
  padding-top: 3px;
  text-align: center;
  &:first-child {
    margin-top: 10px;
  }
}
@media (min-width: 768px) {
}
</style>
