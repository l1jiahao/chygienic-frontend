<template>
  <page-header-wrapper>
    <sci-card v-if="!change" @doSubmit="handleSubmit" :model="verifyCard"></sci-card>
    <submit-book v-if="change" @changeBack="changeBack" @upLoadSubmit="doSubmit" :model="limitAttributes"></submit-book>
  </page-header-wrapper>
</template>

<script>
import sciCard from '@/chygienic/user/submit/submitCard'
import submitBook from '@/chygienic/user/submit/SubmitBook'
import { $get, $post } from '@/chygienic/util/request'

export default {
  name: 'SciVerifyLayout',
  data () {
    return {
      change: false,
      limitColumns: null,
      limitAttributes: [],
      selectedCard: -1,
      verifyCard: [],
      projects: []
    }
  },
  components: {
    sciCard,
    submitBook
  },
  methods: {
    handleSubmit (cardIndex) {
      this.selectedCard = cardIndex
      this.limitColumns = JSON.parse(this.verifyCard[cardIndex].limit_columns)
      this.limitAttributes = []
      for (var i in this.limitColumns) {
        this.limitAttributes.push(i)
      }
      this.change = !this.change
    },
    changeBack () {
      this.change = !this.change
    },
    doSubmit (submitInfo) {
      $post('/demo1/demo2', {
        user_id: this.$store.state.user.user_id,
        proj_name: submitInfo.name,
        proj_type_id: 2,
        json_content: submitInfo,
        limit_id: this.verifyCard[this.selectedCard].limit_id,
        appendix: submitInfo.upload === 0 ? 0 : 1
      }).then(res => {
        if (res.data.status === 1) {
          this.$message.success(res.data.message)
          setTimeout(() => {
            this.change = !this.change
          }, 1000)
        } else {
          this.$message.warn(res.data.message)
        }
      })
    }
  },
  created () {
    $get('getForm/getAllForm?proj_type_id=2').then(res => {
      this.verifyCard = res.data.message
    })
  }

}

</script>

<style scoped>
</style>
