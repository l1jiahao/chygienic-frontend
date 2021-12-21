<template>
  <page-header-wrapper>
    <book-card v-show="!change" @doSubmit="doSubmit"></book-card>
    <submit-book v-if="change" @changeBack="doSubmit"></submit-book>
  </page-header-wrapper>
</template>

<script>
import bookCard from '@/chygienic/user/submit/submitCard'
import submitBook from '@/chygienic/user/submit/SubmitBook'
export default {
  name: 'BookLayout',
  data () {
    return {
      change: false
    }
  },
  components: {
    bookCard,
    submitBook
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
