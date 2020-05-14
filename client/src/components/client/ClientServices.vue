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
        <span>{{ extendTimes }}</span>
      </li>
      <li v-if="DisplayCounter !== '0'">{{ DisplayCounter() }} days left</li>
      <li :style="{ color: 'red' }" v-else>{{ DisplayCounter() }} day left</li>
      <li @click="openModal(modalID)" class="service-actions">Extend this service</li>
      <Modal v-if="open" :modalID="modalID">
        <ExtendService :service="service" :clientID="clientID" />
      </Modal>
      <li class="service-actions">Close</li>
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
      finishTime: this.service && this.service.finishTime,
      startTime: this.service && this.service.startTime,
      extendTimes: this.service && this.service.extendTimes,
      clientID: this.clientId
    };
  },
  computed: {
    ...mapGetters(["modals"]),
    modalID() {
      return this.modals.extendService.id;
    },
    open() {
      return this.modals.extendService.open;
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
    }
  },
  methods: {
    ...mapActions(["openModal"]),
    DisplayCounter() {
      return timeCounter(this.finishTime);
    }
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
