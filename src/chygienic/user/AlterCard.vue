<template>
  <a-modal
    title="Details"
    :width="640"
    :visible="visible"
    :confirmLoading="loading"
    @ok="() => { $emit('ok',this.detail) }"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">
        <a-form-item v-for="(item,index) in detail.json_content" :label="attribute[index]" :key="index">
          <a-input v-show="index!=='level'" v-decorator="['id'+index , { initialValue: item }]" v-model.number="detail.json_content[index]" ></a-input>
          <a-form-item v-show="index==='level'" >
            <a-select
              v-decorator="[
                'level',
                { rules: [{ required: true, message: '请选择项目类型！' }] },
              ]"
              placeholder="请选择项目类型"
              v-model="detail.json_content.level"
            >
              <a-select-option value="国家级项目">
                国家级项目
              </a-select-option>
              <a-select-option value="国防/军队重要科研项目">
                国防/军队重要科研项目
              </a-select-option>
              <a-select-option value="境外合作科研项目">
                境外合作科研项目
              </a-select-option>
              <a-select-option value="部委级项目">
                部委级项目
              </a-select-option>
              <a-select-option value="省级项目">
                省级项目
              </a-select-option>
            </a-select>
          </a-form-item>
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
  level: '项目性质'
}
const detail = {
  json_id: 1,
  json_content: {
    name: 'keyanxiangmu1',
    host: 'ljh',
    fee: 2000,
    level: '国家级项目'
  }
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
      detail,
      attribute,
      form: this.$form.createForm(this)
    }
  },
  created () {
    console.log('custom modal created')

    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  },
  methods: {
    test () {
      console.log(this.form.getFieldsValue())
    }
  }
}
</script>
