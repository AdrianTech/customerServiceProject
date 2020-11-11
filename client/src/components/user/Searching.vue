<template>
  <div class="searching">
    <h3>Select & Search</h3>
    <form @submit.prevent="runSearchFunction">
      <input v-model.trim="searchValue" type="text" />
      <select v-model="option" name="option" id="search">
        <option value="clients">Clients</option>
        <option value="services">Services</option>
      </select>
      <button>Search</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Searching",
  data() {
    return {
      option: "clients",
      searchValue: ""
    };
  },
  methods: {
    ...mapActions(["search", "errHandler"]),
    runSearchFunction() {
      if (this.searchValue === "")
        return this.errHandler({ msg: "Please, type some value", status: 400 });
      const { searchValue, option } = this;
      const data = {
        searchValue,
        option
      };
      this.search(data);
    }
  }
};
</script>

<style lang="scss" scoped>
.searching {
  width: 100%;
  padding-bottom: 15%;
  h3 {
    text-align: center;
    margin-bottom: 13px;
  }
}
form {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  > * {
    font-family: $openSans;
    height: 40px;
  }
  input,
  select,
  button {
    border: 2px solid #410202;
    font-size: 15px;
    font-weight: 700;
  }
  input,
  select {
    padding: 5px;
    min-height: 35px;
    background-color: transparent;
  }
  input {
    width: 50%;
  }
  button {
    @include primary-btn;
    border-radius: 0;
  }
}
@media (min-width: 768px) {
  .searching {
    width: 70%;
    margin: auto;
    padding-bottom: 5%;
  }
  form {
    input {
      width: 40%;
      font-size: 17px;
    }
  }
}
</style>
