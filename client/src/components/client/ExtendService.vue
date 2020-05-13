<template>
  <div class="inside">Hello</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ExtendService",
  computed: {
    ...mapGetters([""])
  },
  methods: {
    ...mapActions([""])
  }
};
</script>

<style lang="scss" scoped>
.inside {
  @include inside(70%, 70%);
}
@media (min-width: 500px) {
  .inside {
    @include inside(70%, 70%);
  }
}
@media (min-width: 768px) {
  .inside {
    @include inside(50%, 70%);
  }
}
@media (min-width: 1000px) {
}
</style>