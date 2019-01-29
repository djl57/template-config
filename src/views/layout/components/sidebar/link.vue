<template>
  <!-- <component v-bind="linkProps(to)">
    <slot />
  </component> -->
  <section>
    <a :href="to" rel='noopener' target='_blank' v-if="isExternalLink"><slot /></a>
    <router-link v-else :to="to"><slot /></router-link>
  </section>
</template>

<script>
import { isExternal } from '@/utils'

export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  computed: {
    isExternalLink() {
      return isExternal(this.to)
    }
  }
}
// export default {
//   props: {
//     to: {
//       type: String,
//       required: true
//     }
//   },
//   methods: {
//     linkProps(url) {
//       console.log('to', url)
//       if (isExternal(url)) {
//         return {
//           is: 'a',
//           href: url,
//           target: '_blank',
//           rel: 'noopener'
//         }
//       }
//       return {
//         is: 'router-link',
//         to: url
//       }
//     }
//   }
// }
</script>
