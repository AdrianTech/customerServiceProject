<template>
  <div class="pagination">
    <div class="center">
      <button @click="paginationHandler('start', type)">Start</button>
      <button
        @click="paginationHandler('decrement', type)"
        :disabled="type === 'client' && page === parseInt(1) || type === 'service' && current === 1"
      >
        <span class="material-icons down">arrow_back</span>
      </button>
      <h4>{{ type === 'client' ? meta.current_page : current }}</h4>
      <button
        :disabled="type === 'client' && page === meta.last_page || type === 'service' && current === serviceMeta.lastServicePage"
        @click="paginationHandler('increment', type)"
      >
        <span class="material-icons up">arrow_forward</span>
      </button>
      <button @click="paginationHandler('lastPage', type)">Last page</button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Pagination",
  props: ["page", "meta", "type"],
  computed: {
    ...mapGetters(["serviceMeta", "current"])
  },
  methods: {
    ...mapActions(["pagination", "getClients", "servicePaginationHandler"]),
    paginationHandler(method, type) {
      if (type === "client") {
        this.pagination(method);
      } else this.servicePaginationHandler(method);
    }
  }
};
</script>

<style lang="scss" scoped>
.pagination,
.center {
  display: flex;
  align-items: center;
}
.pagination {
  width: 100%;
  margin: 10px auto;
  .center {
    border: 2px solid $dark-blue;
    border-radius: 6px;
    margin: auto;
    padding: 3px 10px;
    box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.4);
    > * {
      margin: 0 5px;
    }
  }
}
button,
span {
  color: $dark-blue;
  cursor: pointer;
}
button:nth-child(2),
button:nth-child(4) {
  border: none;
  padding: 0;
}
button {
  border: 1px solid grey;
  background-color: transparent;
  padding: 3px 6px;
  outline: none;
}

@media (min-width: 500px) {
}
@media (min-width: 768px) {
  span {
    font-size: 26px;
  }
  button {
    font-size: 18px;
  }
  .pagination .center {
    padding: 8px 13px;
    h4 {
      font-size: 23px;
    }
    > * {
      margin: 0 14px;
    }
  }
}
</style>
