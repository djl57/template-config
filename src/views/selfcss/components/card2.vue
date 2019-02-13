<template>
  <div class="card-container">
    <slot></slot>
    <!-- {{ isFront ? front : reverse }} -->
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      isFront: true,
      front: `vue 初始化报错，Cannot read property '$createElement' of undefined`,
      reverse: `把 router 的 components 改成 component , 不加s`,
    }
  },
  methods: {
    toggleCard() {
      this.isFront = !this.isFront
    }
  }
}
</script>

<style scoped lang="scss">
.card-container {
  position: relative;
	width: 200px;
	height: 250px;
	background: #fff;
	border: 1px solid #eee;
  padding: 20px;
	margin: 16px;
  // box-shadow: 0 0 5px rgba(0, 0, 0, 0.27), 0 0 20px  rgba(0, 0, 0, .1) inset;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.27);
  &::after,
  &::before {
    content: '';
    width: 100px;
    height: 1px;
    position: absolute;
    bottom: 6px;
    z-index: -1;
    box-shadow: 0 2px 12px 5px rgba(0, 0, 0, 0.3);
  }
  &::after {
    transform: rotate(6deg);
    right: 4px;
  }
  &::before {
    transform: rotate(-6deg);
    left: 4px;
  }
}
</style>
