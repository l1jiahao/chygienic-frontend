<template>
  <page-header-wrapper>
    <sci-form v-show="!change" @doSubmit="doSubmit"></sci-form>
    <submit-sci v-if="change" @changeBack="doSubmit"></submit-sci>
  </page-header-wrapper>
</template>

<script>
import sciForm from '@/chygienic/user/submit/submitCard'
import submitSci from '@/chygienic/user/submit/SubmitSci'
export default {
  name: 'SciLayout',
  data () {
    return {
      change: false
    }
  },
  components: {
    sciForm,
    submitSci
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
