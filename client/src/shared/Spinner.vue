<template>
  <div class="spinner-wrapper">
    <div class="spinner">
      <div class="spinner-inner">
        <div class="spinner-inner inside"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Spinner"
};
</script>

<style lang="scss" scoped>
.spinner-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.spinner {
  width: 80px;
  height: 80px;
  .spinner-inner {
    width: 100%;
    height: 100%;
    border: 10px solid transparent;
    border-radius: 50%;
    border-bottom-color: $dark-blue;
    border-top-color: $dark-blue;
    animation: rotate 1.2s linear infinite;
  }
  .inside {
    animation: rotate-inside 1.2s linear infinite;
  }
}
@keyframes rotate {
  0% {
    transform: scale(0.9) rotate(0deg);
    border-bottom-width: 10px;
    border-top-width: 3px;
  }
  50% {
    transform: scale(0.5) rotate(180deg);
    border-bottom-width: 3px;
    border-top-width: 10px;
  }
  100% {
    transform: scale(0.9) rotate(360deg);
    border-bottom-width: 10px;
    border-top-width: 3px;
  }
}
@keyframes rotate-inside {
  0% {
    transform: scale(0.9) rotate(0deg);
    border-bottom-width: 10px;
    border-top-width: 2px;
  }
  50% {
    transform: scale(0.5) rotate(180deg);
    border-bottom-width: 2px;
    border-top-width: 10px;
  }
  100% {
    transform: scale(0.9) rotate(360deg);
    border-bottom-width: 10px;
    border-top-width: 2px;
  }
}
@media (min-width: 768px) {
  .spinner {
    width: 100px;
    height: 100px;
  }
}
</style>