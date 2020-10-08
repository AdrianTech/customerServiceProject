<template>
  <section class="search">
    <Searching />
    <Results />
  </section>
</template>

<script>
import Searching from "../components/user/Searching";
import Results from "../components/user/Results";
export default {
  name: "Search",
  components: { Searching, Results }
};
</script>

<style lang="scss" scoped>
.search {
  padding: $topPadding 10px 10px 10px;
  font-family: $openSans;
}
</style>