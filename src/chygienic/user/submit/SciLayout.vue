<template>
  <page-header-wrapper>
    <sci-card v-show="!change" @doSubmit="doSubmit" :model="submitCard" :visible="false"></sci-card>
    <submit-sci v-if="change" @changeBack="doSubmit"></submit-sci>
  </page-header-wrapper>
</template>

<script>
import sciCard from '@/chygienic/user/submit/submitCard'
import submitSci from '@/chygienic/user/submit/SubmitSci'
const submitCard = [
  {
    proj_bach_id: 1,
    proj_bach_name: 'diliyunpinggu',
    limit_id: 2,
    limit_columns: {
      name: '名称',
      host: '主持人',
      level: '项目性质',
      fee: '项目经费',
      start: '立项时间',
      end: '验收时间'
    },
    establish_time: '2021-12-02',
    establish_end_time: '2021-12-08'
  },
  {
    proj_bach_id: 2,
    proj_bach_name: 'dieryunpinggu',
    limit_id: 3,
    limit_columns: {
      name: '名称',
      host: '主持人',
      level: '项目性质',
      fee: '项目经费',
      start: '立项时间',
      end: '验收时间'
    },
    establish_time: '2021-12-02',
    establish_end_time: '2021-12-08'
  },
  {
    proj_bach_id: 3,
    proj_bach_name: 'disanyunpinggu',
    limit_id: 4,
    limit_columns: {
      name: '名称',
      host: '主持人',
      level: '项目性质',
      fee: '项目经费',
      start: '立项时间',
      end: '验收时间'
    },
    establish_time: '2021-12-02',
    establish_end_time: '2021-12-08'
  }
]
export default {
  name: 'SciLayout',
  data () {
    return {
      submitCard,
      change: false
    }
  },
  components: {
    sciCard,
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
