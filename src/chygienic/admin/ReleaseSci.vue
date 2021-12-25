<template>
  <page-header-wrapper :title="false" content="发布与科研项目相关的信息收集表单">
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
      <a-form :form="form" :label-col="{lg: {span: 10}, sm: {span: 2}}" :wrapper-col="{lg: {span: 10}, sm: {span: 17} }" @submit="handleSubmit">
        <a-form-item label="发布表单名称" help="如:第x轮xx评估xx项目..">
          <a-input
            v-decorator="['proj_batch_name', { rules: [{ required: true, message: '请输入发布表单名称！' }] }]"
            placeholder="输入发布表单名称"
          >
            <a-icon slot="prefix" type="hdd" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item label="项目名称">
          <a-checkbox default-checked disabled />
        </a-form-item>
        <a-form-item label="主持人">
          <a-checkbox v-decorator="['host',{ initialValue: false }]"/>
        </a-form-item>
        <a-form-item label="项目性质">
          <a-checkbox v-decorator="['level', { initialValue: false }]" />
        </a-form-item>
        <a-form-item label="项目经费">
          <a-checkbox default-checked disabled />
        </a-form-item>
        <a-form-item label="立项编号">
          <a-checkbox default-checked disabled />
        </a-form-item>
        <a-form-item label="立项/验收时间">
          <a-checkbox default-checked disabled />
        </a-form-item>
        <a-form-item label="需要附件" >
          <a-checkbox v-decorator="['appendix',{ initialValue: false }]"/>
        </a-form-item>
        <a-form-item label="发布\截止时间">
          <a-range-picker
            v-decorator="[
              'date',
              { rules: [{ type: 'array', required: true, message: '请选择时间!' }] },
            ]" />
        </a-form-item>
        <a-form-item
          :wrapperCol="{ span: 24 }"
          style="text-align: center"
        >
          <a-button type="primary" html-type="submit">
            发布
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { $post } from '@/chygienic/util/request'

const initColums = {
  name: '项目名称',
  host: '主持人',
  level: '项目性质',
  fee: '项目经费',
  start: '立项时间',
  project_number: '立项编号',
  end: '验收时间'
}
export default {
  data () {
    return {
      releaseInfo: {
        proj_batch_name: '',
        limit_column: {},
        proj_type_id: 1,
        establish_time: '',
        establish_end_time: ''
      },
      initColums,
      checkList: [],
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      config: {
        rules: [{ type: 'object', required: true, message: '请选择时间!' }]
      }
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.doRelease(values)
        }
      })
    },
    normFile (e) {
      console.log('Upload event:', e)
      if (Array.isArray(e)) {
        return e
      }
      return e && e.fileList
    },
    checkColumn (e) {
      console.log('选中')
    },
    doRelease (values) {
      this.releaseInfo.proj_batch_name = values.proj_batch_name
      this.releaseInfo.establish_time = values.date[0].format('YYYY-MM-DD')
      this.releaseInfo.establish_end_time = values.date[1].format('YYYY-MM-DD')
      for (var i in values) {
        if (values[i] === false) {
          delete this.initColums[i]
        }
      }
      this.releaseInfo.limit_column = initColums
      $post('/publish/publishcolumn', this.releaseInfo).then(res => {
        if (res.data.status === 1) {
          this.$message.success(res.data.message)
        } else {
          this.$message.error(res.data.message)
        }
      }).catch(err => {
        this.$message.error(err)
      })
    }
  }
}
</script>
