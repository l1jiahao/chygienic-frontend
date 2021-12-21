<template>
  <page-header-wrapper>
    <sci-form v-show="!change" @doSubmit="doSubmit"></sci-form>
    <verify-sci v-if="change" @doSubmit="doSubmit"></verify-sci>
  </page-header-wrapper>
</template>

<script>
import sciForm from '@/chygienic/admin/verify/VerifyCard'
import verifySci from '@/chygienic/admin/verify/VerifySci'
export default {
  name: 'SciVerifyLayout',
  data () {
    return {
      change: false
    }
  },
  components: {
    sciForm,
    verifySci
  },
  methods: {
    doSubmit () {
      this.change = !this.change
    }
  }

}

</script>

<style scoped>
</style>
