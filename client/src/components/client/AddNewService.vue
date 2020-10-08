<template>
  <div class="inside" v-if="client !== undefined">
    <form v-if="servicesArr.length > 0">
      <h3>{{ client.fullname }}</h3>
      <div
        class="list"
        v-for="service in servicesArr"
        :key="service._id"
        :class="{ active: service.active }"
      >
        <span
          v-if="!service.active"
          class="material-icons"
          @click="changeValue(service._id)"
        >check_box_outline_blank</span>
        <span v-else class="material-icons" @click="changeValue(service._id)">check_box</span>
        <label>{{ service.name }}</label>
        <label>Contract lenght:</label>
        <input
          @change="setTotal(service._id)"
          v-model.number.lazy="service.months"
          min="0"
          max="36"
          type="number"
          placeholder="Min 1 month, max 36 months"
        />
        <div class="total-item">
          Unit price:
          <span>{{ service.unitPrice }}</span> Total:
          <span>{{ service.total.toFixed(2) }}</span>
        </div>
      </div>
    </form>
    <button @click="submitData" :disabled="total === 0" class="modal-btn">Confirm</button>
    <p>Total services value: {{ total.toFixed(2) }}</p>
    <h3 v-if="servicesArr.length === 0">Nothing to add</h3>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { setClientData } from "../../shared/sharedFunctions";
export default {
  name: "AddNewService",
  props: ["id", "data"],
  data() {
    return {
      client: [],
      servicesArr: [],
      total: 0
    };
  },
  mounted() {
    this.setServicesArr();
  },
  watch: {
    clientData() {
      this.setServicesArr();
    }
  },
  computed: {
    ...mapGetters([
      "services",
      "clientData",
      "eventInfo",
      "currentClientsPage",
      "dataLoaded"
    ])
  },
  methods: {
    ...mapActions(["addNewServiceToClient", "errHandler"]),
    changeValue(id) {
      this.servicesArr.forEach(item => {
        if (item._id === id) {
          item.active = !item.active;
        }
      });
      this.setTotal(id);
    },
    setTotal(id) {
      let value = 0;
      this.servicesArr.forEach(i => {
        if (i._id === id) i.total = i.unitPrice * i.months;
        if (i.active) value += i.total;
        this.total - i.total;
      });
      this.total = value;
    },
    setServicesArr() {
      let { id, clientData, services, data } = this;
      const ary = JSON.parse(JSON.stringify(services));
      const result = setClientData(id, clientData);
      result === undefined ? (this.client = data) : (this.client = result);
      this.servicesArr = ary.filter(
        i =>
          !this.client.typeOfService.some(
            a => i._id === a._id && i.active !== a.active
          )
      );
      this.servicesArr.forEach(i => (i.total = 0));
    },
    submitData() {
      const { id, currentClientsPage } = this;
      const filtered = this.servicesArr.filter(
        ({ active, months }) => active && months > 0
      );
      if (filtered.length === 0)
        return this.errHandler({
          msg: "Please, check at least one service and choose number of months",
          status: 400
        });
      const data = {
        filtered,
        id,
        currentClientsPage
      };
      this.addNewServiceToClient(data);
    }
  }
};
</script>

<style lang="scss" scoped>
.inside {
  @include inside(100%, 100%);
  flex-direction: column;
  justify-content: center;
  padding: 8px;
}
form {
  @include form;
  h3 {
    margin-bottom: 15px;
  }
}
.list {
  width: 100%;
  margin: 7px 0;
  min-height: 80px;
  font-size: 14px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 5px 0;
  text-align: center;
  border: 1px solid white;
  border-radius: 8px;
  position: relative;
  .total-item {
    position: absolute;
    bottom: 2px;
    margin-top: 5px;
    font-size: 13px;
    span {
      margin-right: 10px;
    }
    &:nth-child(2) {
      font-weight: 700;
    }
  }
  span {
    flex: 0.3;
  }
  input {
    flex: 0.5;
    border: 1px solid $db-light;
    border-radius: 6px;
    padding: 6px;
    margin: 0 5px;
    font-size: 15px;
  }
  label {
    flex: 1;
  }
}
.active {
  background-color: #fff;
  color: #000;
}
@media (min-width: 500px) {
  .inside {
    @include inside(75%, 80%);
  }
}
@media (min-width: 768px) {
  .list {
    font-size: 17px;
  }
  .inside {
    @include inside(60%, 90%);
  }
}
@media (min-width: 1000px) {
  .list {
    font-size: 19px;
    input {
      font-size: 17px;
    }
  }
}
</style>
