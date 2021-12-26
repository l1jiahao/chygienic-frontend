<template>
  <a-modal
    title="Details"
    :width="640"
    :visible="visible"
    :confirmLoading="loading"
    @ok="handleOk"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">
        <a-form-item label="电话号码" v-if="model.type===1">
          <a-input v-decorator="['phone' , { initialValue: model.val , rules: [{ required: true, message: '请输入电话' }]}]" ></a-input>
        </a-form-item>
        <a-form-item label="新密码" v-if="model.type===2">
          <a-input-password v-decorator="['pass' ,{ rules: [{ required: true, message: '请输入密码' }] }]" />
        </a-form-item>
        <a-form-item label="再次确认" v-if="model.type===2">
          <a-input-password v-decorator="['pass2' ,{ rules: [{ required: true, message: '请输入密码' }] } ]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

// 表单字段
const fields = ['name']

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
      submitData: {},
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
  },
  methods: {
    handleOk () {
      // eslint-disable-next-line handle-callback-err
      this.form.validateFields((err, values) => {
        this.submitData = values
      })
      if (this.model.type === 2) {
        // eslint-disable-next-line no-unused-expressions
        if (this.submitData.pass !== this.submitData.pass2) {
          this.$message.warn('两次密码不一致,请重试！')
        } else {
          if (this.submitData.pass) {
            console.log('pass' + this.submitData.pass)
            this.$emit('alterPass', {
                user_id: this.$store.state.user.user_id,
                password: this.submitData.pass
              }
            )
          }
        }
      } else {
        this.$emit('alterPhone', {
          user_id: this.$store.state.user.user_id,
          phone_number: this.submitData.phone
        })
      }
    }
  }
}
</script>
