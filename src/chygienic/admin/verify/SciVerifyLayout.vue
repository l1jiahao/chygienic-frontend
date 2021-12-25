<template>
  <page-header-wrapper>
    <sci-card v-if="!change" @doVerify="doVerify" :model="verifyCard" :projects-num="createData"></sci-card>
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
      projects: [],
      createData: [],
      row: {}
    }
  },
  components: {
    sciCard,
    verifySci
  },
  created () {
    const getCard = () => {
      return $get('getForm/getAllForm?proj_type_id=1')
    }
    const getLimits = async () => {
      const res = await getCard()
      this.verifyCard = res.data.message
      return res.data.message
    }
    const getIds = async () => {
      const cards = await getLimits()
      const ids = []
      for (var i in cards) {
        ids.push(cards[i].limit_id)
      }
      return ids
    }
    getIds().then(res => {
      const promises = res.map(function (id) {
        return $get('getFinishedProject/getAllFinishedProject?limit_id=' + id)
      })
      Promise.all(promises).then(posts => {
        for (var j in posts) {
          if (posts[j].data.status === 1) {
            this.createData.push(posts[j].data.message.length)
          } else {
            this.createData.push(0)
          }
        }
      })
    })
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
  }

}

</script>

<style scoped>
</style>
