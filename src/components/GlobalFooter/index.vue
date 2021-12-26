<template>
  <global-footer class="footer custom-render">
    <template v-slot:links>
      <a href="https://github.com/nogralee/chygienic-frontend" target="_blank">Chygienic-frontend</a>
      <a href="https://github.com/nogralee/chygienic-frontend" target="_blank">Chygienic-javaweb</a>
    </template>
    <template v-slot:copyright>
      <a >计算机科学与技术（软件工程） Chygienic</a>
    </template>
  </global-footer>
</template>

<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter
  }
}
</script>
