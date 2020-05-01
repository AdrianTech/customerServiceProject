<template>
  <div class="settings">
    <router-link to="/your-settings">Your settings</router-link>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Settings",
  // computed: {
  //   ...mapGetters([""])
  // },
  methods: {
    ...mapActions([""])
  }
};
</script>

<style lang="scss" scoped>
.settings {
  padding-top: 80px;
  text-align: center;
}
a {
  @include primary-link;
}
@media (min-width: 500px) {
}
@media (min-width: 768px) {
}
@media (min-width: 1000px) {
}
</style>