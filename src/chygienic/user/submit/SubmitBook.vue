<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form :form="form" :label-col="{lg: {span: 7}, sm: {span: 7}}" :wrapper-col="{lg: {span: 10}, sm: {span: 17} }" @submit="handleSubmit">
      <a-form-item label="教材名称">
        <a-input
          v-decorator="['name', { rules: [{ required: true, message: '请输入项目名称！' }] }]"
          placeholder="请输入教材名称"
        >
          <a-icon slot="prefix" type="book" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item label="主编">
        <a-input
          v-decorator="['host', { rules: [{ required: true, message: '请输入主持人！' }] }]"
          placeholder="请输入主编姓名"
        >
          <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item label="出版社">
        <a-input
          v-decorator="['publisher', { rules: [{ required: true, message: '请输入项目经费！' }] }]"
          placeholder="请填写出版社"
        >
          <a-icon slot="prefix" type="read" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item label="出版时间">
        <a-date-picker v-decorator="['publish_time', { rules: [{ required: true, message: '请选择出版时间！' }] }]" />
      </a-form-item>
      <a-form-item v-if="model.includes('category')" label="入选情况">
        <a-select
          v-decorator="[
            'category',
          ]"
          placeholder="请选择项目类型"
        >
          <a-select-option value="1">
            21世纪重点教材
          </a-select-option>
          <a-select-option value="2">
            145规划重点教材
          </a-select-option>
          <a-select-option value="3">
            省级重点教材
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item v-if="model.includes('category_time')" label="入选时间">
        <a-date-picker v-decorator="['category_time']" />
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
          @change="handleChange"
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
  props: {
    model: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      formLayout: 'horizontal',
      submitInfo: {},
      submitFile: null,
      form: this.$form.createForm(this, { name: 'coordinated' })
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      // eslint-disable-next-line handle-callback-err
      this.form.validateFields((err, values) => {
        values.publish_time = values.publish_time.format('YYYY-MM-DD')
        values.category_time = values.category_time.format('YYYY-MM-DD')
        this.collectSubmit(values)
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
    collectSubmit (values) {
      for (var i in values) {
        if (i === 'date') {
          continue
        }
        this.submitInfo[i] = values[i]
      }
      if (!this.submitInfo.upload) {
        this.submitInfo.upload = 0
      }
      this.$emit('upLoadSubmit', {
        info: this.submitInfo,
        file: this.submitFile
      })
    },
    handleChange (info) {
      const formdata = new FormData()
      formdata.append('file', info.file.originFileObj)
      this.submitFile = formdata
    }
  }
}
</script>
