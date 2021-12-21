<template>
  <page-header-wrapper>
    <sci-form v-show="!change" @doSubmit="doSubmit"></sci-form>
    <verify-book v-if="change" @doSubmit="doSubmit"></verify-book>
  </page-header-wrapper>
</template>

<script>
import sciForm from '@/chygienic/admin/verify/VerifyCard'
import verifyBook from '@/chygienic/admin/verify/VerifyBook'
export default {
  name: 'SciVerifyLayout',
  data () {
    return {
      change: false
    }
  },
  components: {
    sciForm,
    verifyBook
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
