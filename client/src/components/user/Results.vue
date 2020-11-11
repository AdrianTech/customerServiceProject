<template>
  <div class="results">
    <div class="resultWrapper" v-if="searchOption === 'clients'">
      <ul>
        <li v-for="data in searchResult" :key="data._id">
          <span>{{data.fullname}}</span>
          <button @click="clientDetails(data._id, data)">Show profile</button>
        </li>
      </ul>
    </div>
    <div class="resultWrapper" v-else-if="searchOption === 'services'">
      <ul>
        <li v-for="data in searchResult" :key="data._id">
          <span>{{data.name}}</span>
          <button @click="serviceDetails(data._id, data)">Service details</button>
        </li>
      </ul>
    </div>
    <div class="info" v-else>
      <h2>You'll see results here</h2>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Results",
  computed: {
    ...mapGetters(["searchResult", "searchOption"])
  },
  methods: {
    ...mapActions(["searchClear"]),
    clientDetails(id, prop) {
      this.$router.push({
        name: "ClientDetails",
        params: { id, from: "search", prop }
      });
    },
    serviceDetails(id) {
      this.$router.push({
        name: "Services",
        params: { id, from: "search" }
      });
    }
  },
  destroyed() {
    this.searchClear();
  }
};
</script>

<style lang="scss" scoped>
.results {
  border-top: 3px solid $dark-blue;
  .info {
    margin-top: 15px;
    text-align: center;
  }
}
ul {
  list-style: none;
  margin-top: 10px;
  li {
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #01012e6c;
    padding: 5px;
    &:nth-child(odd) {
      background-color: #ebf9fc;
    }
    span {
      flex: 1;
      font-weight: 700;
    }
  }
  button {
    @include primary-btn;
    flex: 1;
    transform: scale(0.7);
  }
}
@media (min-width: 768px) {
  .results {
    width: 75%;
    margin: auto;
  }
  ul li {
    font-size: 18px;
    span {
      padding-left: 10px;
    }
  }
}
</style>