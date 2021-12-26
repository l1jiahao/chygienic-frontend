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
        <a slot="actions" @click="item.actions.callback">{{ item.actions.title }}</a>
      </template>

    </a-list-item>
  </a-list>
</template>

<script>
export default {
computed: {
    data () {
        return [
        { title: this.$t('account.settings.security.password'), description: this.$t('account.settings.security.password-description'), value: '强', actions: { title: this.$t('account.settings.security.modify'), callback: () => { this.$message.info('This is a normal message') } } },
        { title: this.$t('account.settings.security.phone'), description: this.$t('account.settings.security.phone-description'), value: '138****8293', actions: { title: this.$t('account.settings.security.modify'), callback: () => { this.$message.success('This is a message of success') } } }
      ]
    }
  }
}
</script>

<style scoped>

</style>
