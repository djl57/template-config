<template>
  <div class="toggle-container">
    <div class="card-containerY" :class="{'card-toggleY': !isYFront}" @click="toggleCardY">
      <div class="card-front">正面<br>vue 初始化报错，Cannot read property '$createElement' of undefined</div>
      <div class="card-reverse">反面<br>把 router 的 components 改成 component , 不加s</div>
    </div>
    <div class="card-containerX" :class="{'card-toggleX': !isXFront}" @click="toggleCardX">
      <div class="card-front">正面<br>vue 初始化报错，Cannot read property '$createElement' of undefined</div>
      <div class="card-reverse">反面<br>把 router 的 components 改成 component , 不加s</div>
    </div>
    <div class="card-containerZ" :class="{'card-toggleZ': !isZFront}" @click="toggleCardZ">
      <div class="card-front">正面<br>vue 初始化报错，Cannot read property '$createElement' of undefined</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'card3',
  data () {
    return {
      isXFront: true,
      isYFront: true,
      isZFront: true
    }
  },
  methods: {
    toggleCardX() {
      this.isXFront = !this.isXFront
    },
    toggleCardY() {
      this.isYFront = !this.isYFront
    },
    toggleCardZ() {
      this.isZFront = !this.isZFront
    },
  }
}
</script>

<style scoped lang="scss">
.toggle-container {
  .card-containerY {
    width: 300px;
    height: 300px;
    margin: 16px;
    background-color: #ffffff;
    position: relative;
    transform-style: preserve-3d; // 没有这个正面的内容就显示不了
    transition: 1s;
    // &:hover {
    //   transform: rotateY(180deg);
    // }
    .card-front,
    .card-reverse {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 20px;
      line-height: 30px;
      background-color: #ffffff; // 没有这个正面时会显示反面的内容
    }
    .card-reverse {
      transform: rotateY(180deg);
    }
  }
  .card-toggleY {
    transform: rotateY(180deg);
  }

  .card-containerX {
    width: 300px;
    height: 300px;
    margin: 16px;
    background-color: #ffffff;
    position: relative;
    transform-style: preserve-3d; // 没有这个正面的内容就显示不了
    transition: 1s;
    // &:hover {
    //   transform: rotateX(180deg);
    // }
    .card-front,
    .card-reverse {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 20px;
      line-height: 30px;
      background-color: #ffffff; // 没有这个*反面*时会显示正面的内容
    }
    .card-reverse {
      transform: rotateX(180deg);
    }
  }
  .card-toggleX {
    transform: rotateX(180deg);
  }

  .card-containerZ {
    width: 300px;
    height: 300px;
    margin: 16px;
    background-color: #ffffff;
    position: relative;
    transition: 1s;
    // &:hover {
    //   transform: rotateZ(180deg);
    // }
    .card-front {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 20px;
      line-height: 30px;
    }
  }
  .card-toggleZ {
    transform: rotateZ(180deg);
  }
}

</style>
