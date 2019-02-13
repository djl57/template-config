<template>
  <div class="card-container">
  </div>
</template>

<script>
export default {
  name: 'card1',
}
</script>

<style scoped lang="scss">
.card-container {
  width: 450px;
  height: 270px;
  background-color: #fff;
  position: relative;
  margin: 16px;
  &::after,
  &::before {
    content: '';
    width: 220px;
    height: 250px;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
    position: absolute;
    z-index: -1;
  }
  &::after {
    transform: rotate(5deg);
    transform-origin: top left;
    right: 5px;
  }
  &::before {
    transform: rotate(-5deg);
    transform-origin: top right;
    left: 5px;
  }
}
</style>
