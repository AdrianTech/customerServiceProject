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
      console.log(target);
      if (target === "modalWindow" || target === "btn")
        this.openModal(this.modalID);
    }
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