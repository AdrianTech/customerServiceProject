<template>
  <div class="pagination">
    <div class="center">
      <button @click="paginationHandler()">Start</button>
      <button :disabled="!meta.isPreviousPage" @click="paginationHandler(prevPage)">
        <span class="material-icons down">arrow_back</span>
      </button>
      <h4>{{ meta.current_page }}</h4>
      <button :disabled="!meta.isNextPage" @click="paginationHandler(nextPage)">
        <span class="material-icons up">arrow_forward</span>
      </button>
      <button @click="paginationHandler(lastPage)">Last page</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Pagination",
  props: ["meta", "pagination"],
  computed: {
    lastPage() {
      return this.meta.last_page;
    },
    prevPage() {
      return this.meta.prev_page;
    },
    nextPage() {
      return this.meta.next_page;
    },
    currentPage() {
      return this.meta.current_page;
    },
  },
  methods: {
    paginationHandler(value) {
      this.pagination(value);
    },
  },
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
  margin: 20px auto;
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
