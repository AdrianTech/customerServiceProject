<template>
  <div class="modalWindow" @click="close($event)">
    <span class="btn material-icons">cancel_presentation</span>
    <slot></slot>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["isOpen", "double"])
  },
  methods: {
    ...mapActions(["openModal"]),
    close(e) {
      const target = e.target.classList[0];
      console.log(target);
      if (target === "modalWindow" || target === "btn") this.openModal(false);
      if ((this.double && target === "modalWindow") || target === "btn")
        this.openModal("double");
    }
  },
  destroyed() {
    this.openModal(false);
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

@media (min-width: 500px) {
}
@media (min-width: 768px) {
}
@media (min-width: 1000px) {
}
</style>