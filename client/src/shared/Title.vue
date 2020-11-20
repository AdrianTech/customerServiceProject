<template>
  <div class="title">
    <h2>{{ name }}</h2>
  </div>
</template>

<script>
export default {
  name: "Title",
  props: {
    name: String,
  },
};
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  margin: 10px 0 50px 0;
}
h2 {
  font: 18px Tahoma;
  display: inline;
  padding: 8px 8px 4px 8px;
  font-weight: 700;
  letter-spacing: 1px;
  border-bottom: 2px solid #696969;
}
@media (min-width: 500px) {
}
@media (min-width: 768px) {
  h2 {
    font-size: 22px;
  }
}
@media (min-width: 1000px) {
}
</style>
