<template>
  <div class="app-container">
    <ul class="icon-wrapper">
      <li v-for="item of iconsMap" :key="item"
        @click="handleClipboard(generateIconCode(item),$event)">
        <el-tooltip placement="top"> <!-- 文字提示 -->
          <div slot="content">
            {{ generateIconCode(item) }}
          </div>
          <div class="icon-item">
            <svg-icon :icon-class="item" class-name="disabled" />
            <p>{{ item }}</p>
          </div>
        </el-tooltip>
      </li>
    </ul>
  </div>
</template>

<script>
import icons from './requireIcons'
import clipboard from '@/utils/clipboard'

export default {
  name: 'Icons',
  data() {
    return {
      iconsMap: icons
    }
  },
  methods: {
    generateIconCode(symbol) {
      return `<svg-icon icon-class="${symbol}" />`
    },
    handleClipboard(text, event) {
      clipboard(text, event)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .icon-wrapper {
    margin: 0 auto;
  }
  .icon-item {
    width: 110px;
    height: 110px;
    text-align: center;
    float: left;
    margin: 15px;
    cursor: pointer;
  }
  .disabled {
    pointer-events: none;
  }
}
</style>
