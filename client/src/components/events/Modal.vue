<template>
  <div class="modalWindow" @click="close($event)">
    <span class="btn material-icons">cancel_presentation</span>
    <slot></slot>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["modalID"],
  methods: {
    ...mapActions(["openModal"]),
    close(e) {
      const target = e.target.classList[0];
      if (target === "modalWindow" || target === "btn")
        this.openModal(this.modalID);
    }
  },
  destroyed() {
    this.$store.state.modals.modals = [];
  }
};
</script>

<style lang="scss" scoped>
.modalWindow {
  @include modal;
  .btn {
    @include btn-close;
  }
}
</style>