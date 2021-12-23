<template>
  <page-header-wrapper>
    <sci-form v-show="!change" @doSubmit="doSubmit" :visible="false" :model="verifyCard"></sci-form>
    <verify-sci v-if="change" @doSubmit="doSubmit" :limit-columns="verifyCard[1].limit_columns" :model="projects"></verify-sci>
  </page-header-wrapper>
</template>

<script>
import sciForm from '@/chygienic/admin/verify/VerifyCard'
import verifySci from '@/chygienic/admin/verify/VerifySci'
const verifyCard = [
  {
    proj_batch_id: 1,
    proj_batch_name: 'diliyunpinggu',
    limit_id: 2,
    limit_columns: {
      name: '名称',
      fee: '项目经费',
      start: '立项时间',
      end: '验收时间'
    },
    establish_time: '2021-12-02',
    establish_end_time: '2021-12-08'
  },
  {
    proj_batch_id: 2,
    proj_batch_name: 'dieryunpinggu',
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
    proj_batch_id: 3,
    proj_batch_name: 'disanyunpinggu',
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
const projects = [
  {
    proj_id: 2,
    status: 0,
    json_content: {
      name: 'xx项目',
      host: 'xxx',
      level: '项目性质',
      fee: 2000,
      start: '立项时间',
      end: '验收时间'
    }
  },
  {
    proj_id: 3,
    status: 1,
    json_content: {
      name: 'xx项目',
      host: 'xxx',
      level: '项目性质',
      fee: 2000,
      start: '立项时间',
      end: '验收时间'
    }
  },
  {
    proj_id: 4,
    status: 2,
    json_content: {
      name: 'xx项目',
      host: 'xxx',
      level: '项目性质',
      fee: 2000,
      start: '立项时间',
      end: '验收时间'
    }
  }
]
export default {
  name: 'SciVerifyLayout',
  data () {
    return {
      change: false,
      verifyCard,
      projects
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
