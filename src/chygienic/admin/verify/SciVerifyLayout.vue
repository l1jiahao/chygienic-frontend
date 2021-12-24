<template>
  <page-header-wrapper>
    <sci-card v-if="!change" @doVerify="doVerify" :model="verifyCard"></sci-card>
    <verify-sci v-if="change" @changeBack="changeBack" :limit-columns="limitColumns" :model="projects"></verify-sci>
  </page-header-wrapper>
</template>

<script>
import sciCard from '@/chygienic/admin/verify/VerifyCard'
import verifySci from '@/chygienic/admin/verify/VerifySci'
import { $get } from '@/chygienic/util/request'

export default {
  name: 'SciVerifyLayout',
  data () {
    return {
      change: false,
      limitColumns: null,
      verifyCard: [],
      projects: []
    }
  },
  components: {
    sciCard,
    verifySci
  },
  methods: {
    doVerify (cardIndex) {
      const limitId = this.verifyCard[cardIndex].limit_id
      this.limitColumns = JSON.parse(this.verifyCard[cardIndex].limit_columns)
      $get('getFinishedProject/getAllFinishedProject?limit_id=' + limitId).then(res => {
        this.projects = []
        const sourceData = res.data.message
        for (const i in sourceData) {
          const row = JSON.parse(sourceData[i].json_content)
          row['status'] = sourceData[i].status
          row['proj_id'] = sourceData[i].proj_id
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.projects.push(row)
        }
      })
      this.change = !this.change
    },
    changeBack () {
      this.change = !this.change
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
