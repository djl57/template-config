<template>
  <div class="app-container">
    <code>纸张折角效果。</code>
    <card-one></card-one>
    <code>纸张效果。</code>
    <card-two>纸张</card-two>
    <code>180<sup>。</sup>翻转效果。</code>
    <card-three></card-three>
  </div>
</template>

<script>
import CardOne from './components/card1'
import CardTwo from './components/card2'
import CardThree from './components/card3'
export default {
  name: 'card',
  components: {
    CardOne,
    CardTwo,
    CardThree
  },
}
</script>
