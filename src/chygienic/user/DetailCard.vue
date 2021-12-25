<template>
  <a-modal
    title="详情"
    :width="640"
    :visible="visible"
    :confirmLoading="loading"
    @ok="() => { $emit('ok') }"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">
        <a-form-item v-for="(item,index) in model" :label="attribute[index]" :key="index">
          <a-input v-decorator="['id', { initialValue: item }]" disabled ></a-input>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
const attribute = {
  fee: '项目经费',
  name: '项目名称',
  host: '主持人',
  level: '项目性质',
  start: '立项时间',
  end: '验收时间',
  category: '入选',
  category_time: '入选情况',
  publisher: '出版社',
  publish_time: '出版时间',
  project_number: '立项编号'
}
// 表单字段
const fields = ['description', 'id']

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    model: {
      type: Object,
      default: () => null
    }
  },
  data () {
    this.formLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      }
    }
    return {
      attribute,
      form: this.$form.createForm(this)
    }
  },
  created () {
    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  }
}
</script>
