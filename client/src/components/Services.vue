<template>
  <div class="service-details">
    <ul>
      <li>
        <span>Name</span>
        <span>{{service.name}}</span>
      </li>
      <li>
        <span>Start</span>
        <span>{{changeTime.start}}</span>
      </li>
      <li>
        <span>Finish</span>
        <span>{{changeTime.end}}</span>
      </li>
      <li>
        <span>Extend Times</span>
        <span>{{service.extendTimes}}</span>
      </li>
      <li v-if="DisplayCounter !== '0'">{{DisplayCounter()}} days left</li>
      <li :style="{color: 'red'}" v-else>{{DisplayCounter()}} day left</li>
      <li class="service-actions">Extend this service</li>
      <li class="service-actions">Unactive</li>
    </ul>
    <button class="addService">
      <span>+</span>
    </button>
  </div>
</template>

<script>
import moment from "moment-timezone";
import timeCounter from "../shared/TimeCounter";
export default {
  name: "Service",
  props: {
    service: {
      type: Object,
      required: true
    }
  },
  computed: {
    changeTime() {
      const guess = moment.tz.guess();
      const end = moment(this.service.finishTime)
        .clone()
        .tz(guess)
        .format("lll");
      const start = moment(this.service.startTime)
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
    DisplayCounter() {
      return timeCounter(this.service.finishTime);
    }
  }
};
</script>

<style lang="scss" scoped>
.service-details {
  border: 1px solid #0000007a;
  background-color: #ebe2e2;
  padding: 8px;
  position: relative;
}
ul li {
  display: flex;
  padding: 4px;
  span {
    flex: 1;
    text-align: left;
    &:first-child {
      padding-left: 10%;
    }
  }
}

.service-actions {
  font-size: 14px;
  color: #c40606;
  cursor: pointer;
  padding-top: 3px;
  &:first-child {
    margin-top: 10px;
  }
}
@media (min-width: 768px) {
}
</style>