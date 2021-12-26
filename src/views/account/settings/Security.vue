<template>
  <a-list
    itemLayout="horizontal"
    :dataSource="data"
  >
    <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
      <a-list-item-meta>
        <a slot="title">{{ item.title }}</a>
        <span slot="description">
          <span class="security-list-description">{{ item.description }}</span>
          <span v-if="item.value"> : </span>
          <span class="security-list-value">{{ item.value }}</span>
        </span>
      </a-list-item-meta>
      <template v-if="item.actions">
        <a slot="actions" @click="item.actions.callback">修改</a>
      </template>
      <sec-alter
        :visible="passVisible"
        :model="mdl"
        @alterPass="alterPass"
        @alterPhone="alterPhone"
        @cancel="doCancel"
      >
      </sec-alter>

    </a-list-item>
  </a-list>
</template>

<script>
import { $post } from '@/chygienic/util/request'
import SecAlter from '@/views/account/settings/SecAlter'
export default {
  components: { SecAlter },
  comments:
    {
      SecAlter
    },
  data () {
    return {
      mdl: {},
      phone: this.$store.state.user.phone,
      passVisible: false,
      mdlTitle: ''
    }
  },
computed: {
    data () {
        return [
        { title: this.$t('account.settings.security.password'), description: this.$t('account.settings.security.password-description'), value: '强', actions: { title: this.$t('account.settings.security.modify'), callback: () => { this.alterPassowrd('修改密码') } } },
        { title: this.$t('account.settings.security.phone'), description: this.$t('account.settings.security.phone-description'), value: this.phone, actions: { title: this.$t('account.settings.security.modify'), callback: () => { this.alterPassowrd('修改手机号码') } } }
      ]
    }
  },
  methods: {
    alterPassowrd (title) {
      this.passVisible = !this.passVisible
      if (title === '修改密码') {
          this.mdl['type'] = 2
      } else {
        this.mdl['type'] = 1
      }
    },
    alterPass (info) {
      $post('/updateinform/updatepassword', info).then(res => {
        if (res.data.status === 1) {
          this.$message.success('修改成功')
          setTimeout(() => {
            this.passVisible = !this.passVisible
          }, 1000)
        } else {
          this.$message.error('修改失败')
        }
      })
    },
    alterPhone (info) {
      $post('/updateinform/updatephonenumber', info).then(res => {
        if (res.data.status === 1) {
          this.$message.success('修改成功')
          this.phone = info.phone_number
          setTimeout(() => {
            this.passVisible = !this.passVisible
          }, 1000)
        } else {
          this.$message.error('修改失败')
        }
      })
    },
    doCancel () {
      this.passVisible = !this.passVisible
    }
  }
}
</script>

<style scoped>

</style>
