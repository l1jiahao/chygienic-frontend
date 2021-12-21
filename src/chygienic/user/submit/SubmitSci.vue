<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form :form="form" :label-col="{lg: {span: 7}, sm: {span: 7}}" :wrapper-col="{lg: {span: 10}, sm: {span: 17} }" @submit="handleSubmit">
      <a-form-item label="项目名称">
        <a-input
          v-decorator="['name', { rules: [{ required: true, message: '请输入项目名称！' }] }]"
          placeholder="请输入项目名称"
        >
          <a-icon slot="prefix" type="hdd" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item label="主持人">
        <a-input
          v-decorator="['host', { rules: [{ required: true, message: '请输入主持人！' }] }]"
          placeholder="请输入主持人姓名"
        >
          <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item label="项目类型">
        <a-select
          v-decorator="[
            'level',
            { rules: [{ required: true, message: '请选择项目类型！' }] },
          ]"
          placeholder="请选择项目类型"
        >
          <a-select-option value="1">
            国家级项目
          </a-select-option>
          <a-select-option value="2">
            国防/军队重要科研项目
          </a-select-option>
          <a-select-option value="3">
            境外合作科研项目
          </a-select-option>
          <a-select-option value="4">
            部委级项目
          </a-select-option>
          <a-select-option value="5">
            省级项目
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="项目经费">
        <a-input
          v-decorator="['fee', { rules: [{ required: true, message: '请输入项目经费！' }] }]"
          placeholder="请填写项目获批经费"
        >
          <a-icon slot="prefix" type="pay-circle" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item label="立项编号">
        <a-input
          v-decorator="['number', { rules: [{ required: true, message: '请输入立项编号！' }] }]"
          placeholder="请填写立项编号"
        >
          <a-icon slot="prefix" type="safety-certificate" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item label="立项\验收时间">
        <a-range-picker
          v-decorator="[
            'date',
            { rules: [{ type: 'array', required: true, message: '请选择时间!' }] },
          ]" />
      </a-form-item>
      <a-form-item label="上传文件" extra="请上传相关证明文件（图片）">
        <a-upload
          v-decorator="[
            'upload',
            {
              valuePropName: 'fileList',
              getValueFromEvent: normFile,
            },
          ]"
          name="logo"
          action="/upload.do"
          list-type="picture"
        >
          <a-button> <a-icon type="upload" /> 点击上传附件 </a-button>
        </a-upload>
      </a-form-item>
      <a-form-item
        :wrapperCol="{ span: 24 }"
        style="text-align: center"
      >
        <a-button style="margin-right: 15px"  @click="changeBack">
          返回
        </a-button>
        <a-button type="primary" html-type="submit">
          提交
        </a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
export default {
  data () {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' })
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          values.start = values.date[0].format('YYYY-MM-DD')
          values.end = values.date[1].format('YYYY-MM-DD')
          console.log('Received values of form: ', values)
          console.log(values['date'])
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
    }
  }
}
</script>
