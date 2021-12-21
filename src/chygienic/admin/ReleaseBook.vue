<template>
  <page-header-wrapper :title="false" content="发布与教材相关的信息收集表单">
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
      <a-form :form="form" :label-col="{lg: {span: 10}, sm: {span: 2}}" :wrapper-col="{lg: {span: 10}, sm: {span: 17} }" @submit="handleSubmit">
        <a-form-item label="教材名称">
          <a-checkbox default-checked disabled />
        </a-form-item>
        <a-form-item label="主编">
          <a-checkbox
            default-checked
            disabled
            v-decorator="[
              'category'
            ]"/>
        </a-form-item>
        <a-form-item label="出版社">
          <a-checkbox default-checked disabled />
        </a-form-item>
        <a-form-item label="出版时间">
          <a-checkbox default-checked disabled />
        </a-form-item>
        <a-form-item label="入选情况">
          <a-checkbox @change='checkColumn'/>
        </a-form-item>
        <a-form-item label="入选时间">
          <a-checkbox />
        </a-form-item>
        <a-form-item label="需要附件">
          <a-checkbox />
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
export default {
  data () {
    return {
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
          console.log('Received values of form: ', values)
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
    changeBack () {
      this.$emit('changeBack')
    },
    checkColumn (e) {
      console.log('选中')
    }
  }
}
</script>
