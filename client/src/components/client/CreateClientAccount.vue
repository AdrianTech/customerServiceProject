<template>
  <div class="createClient">
    <form class="form" @submit.prevent="submitData" novalidate="true">
      <label>Full name</label>
      <input v-model.trim="client.fullname" type="text" />
      <label>Email</label>
      <input v-model.trim="client.email" type="text" />
      <label>Phone</label>
      <input v-model.trim="client.phone" type="text" />
      <label>Choose Services (optional)</label>
      <button @click="showModalFunc">Show services list</button>
      <div class="modal" v-if="showModal">
        <div class="center">
          <ServicesChoice
            class="serviceSection"
            v-for="service in servicesArr"
            :key="service._id"
            :service="service"
            :modal="showModalFunc"
            @value="valueData"
          />
          <button @click="showModalFunc">OK</button>
        </div>
      </div>
      <button>Submit</button>
      <Alert />
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { createNewUserValid } from "../../shared/validation";
import ServicesChoice from "./ServicesChoice";
// import router from "../../router/index";
import Alert from "../events/Alert";
let arr = [];
export default {
  name: "CreateClientAccount",
  components: { Alert, ServicesChoice },
  data() {
    return {
      client: {
        fullname: "",
        phone: "",
        email: "",
        clientArr: []
      },
      servicesArr: [],
      showModal: false
    };
  },
  mounted() {
    this.setServicesArr();
  },
  computed: {
    ...mapGetters(["eventInfo", "services"])
  },
  methods: {
    ...mapActions(["createClient", "errHandler"]),
    setServicesArr() {
      this.servicesArr = JSON.parse(JSON.stringify(this.services));
    },
    submitData() {
      this.organizeService(this.servicesArr);
      const { msg, bool } = createNewUserValid(this.client);
      if (!bool) return this.errHandler(msg);
      this.createClient(this.client);
      if (!this.eventInfo.bool) {
        this.client = { fullname: "", phone: "", email: "", clientArr: [] };
        this.setServicesArr();
      }
      // setTimeout(() => {
      //   router.push("/show-client-list");
      // }, 4000);
    },
    organizeService(services) {
      services.forEach(item => {
        if (item.active) {
          delete item.createdDate;
          delete item.__v;
          this.client.clientArr.push(item);
          return item;
        }
      });
    },
    valueData(data) {
      const { id } = data;
      console.log(data);
      this.services.filter(item => {
        if (item._id === id) {
          // item.months = months;
          // item.active = checked;
          delete item[("createdDate", "__v")];
          arr.push(item);
          return item;
        }
      });
      let uniq = {};
      const arrFiltered = arr.filter(
        obj => !uniq[obj._id] && (uniq[obj._id] = true) && obj.active
      );
      this.client.clientArr = arrFiltered;
    },
    showModalFunc(e) {
      e.preventDefault();
      this.showModal = !this.showModal;
    }
  }
};
</script>

<style lang="scss" scoped>
.createClient {
  .form {
    height: auto;
  }
  button {
    @include primary-btn;
  }
}
.center {
  width: 100%;
  button {
    margin-top: 40px;
    color: white;
    border: 1px solid white;
  }
  .serviceSection {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #817f7f;
    margin-bottom: 7px;
    padding: 10px;
    width: 100%;
    border-radius: 7px;
  }
}
@media (min-width: 500px) {
}
@media (min-width: 768px) {
  .center {
    .serviceSection {
      padding: 10px 15px;
    }
  }
}
@media (min-width: 1000px) {
}
</style>