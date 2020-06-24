<template>
  <div class="pagination">
    <div class="center">
      <button @click="pagination('start')">Start</button>
      <button @click="pagination('decrement')" :disabled="page === 1">
        <span class="material-icons down">arrow_back</span>
      </button>
      <button :disabled="page === meta.last_page" @click="pagination('increment')">
        <span class="material-icons up">arrow_forward</span>
      </button>
      <button @click="pagination('lastPage')">Last page</button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Pagination",
  computed: {
    ...mapGetters(["page", "meta"])
  },
  methods: {
    ...mapActions(["pagination"])
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
    > * {
      margin: 0 8px;
    }
  }
}
button,
span {
  color: $dark-blue;
  cursor: pointer;
}
button:nth-child(2),
button:nth-child(3) {
  border: none;
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
    * > {
      margin: 0 11px;
    }
  }
}
@media (min-width: 1000px) {
}
</style>