<template>
  <page-header-wrapper>
    <sci-card v-if="!change" @doSubmit="handleSubmit" :model="verifyCard"></sci-card>
    <submit-sci v-if="change" @changeBack="changeBack" @upLoadSubmit="doSubmit" :model="limitAttributes"></submit-sci>
  </page-header-wrapper>
</template>

<script>
import sciCard from '@/chygienic/user/submit/submitCard'
import submitSci from '@/chygienic/user/submit/SubmitSci'
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
    submitSci
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
        proj_name: submitInfo.info.name,
        proj_type_id: 1,
        json_content: submitInfo.info,
        limit_id: this.verifyCard[this.selectedCard].limit_id,
        appendix: submitInfo.info.upload === 0 ? 0 : 1
      }).then(res => {
        if (res.data.status === 1) {
          if (submitInfo.file !== null) {
            $post('/upload?projId=' + res.data.message, submitInfo.file).then(res => {
              this.$message.success('文件上传成功！')
            }).catch(err => {
              this.$message.error('上传文件失败' + err.data)
            })
          }
          this.$message.success('填报成功！')
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
    $get('getForm/getAllForm?proj_type_id=1').then(res => {
      this.verifyCard = res.data.message
    })
  }

}

</script>

<style scoped>
</style>
