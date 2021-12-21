<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-table :row-selection="rowSelection" :columns="columns" :data-source="data" />
    <a-form-item
      :wrapperCol="{ span: 24 }"
      style="text-align: center"
    >
      <a-button style="margin-right: 15px"  @click="changeBack">
        返回
      </a-button>

    </a-form-item>
  </a-card>
</template>

<script>
const columns = [
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address'
  }
]

const data = []
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`
  })
}
export default {
  data () {
    return {
      data,
      columns,
      selectedRowKeys: [] // Check here to configure the default column
    }
  },
  computed: {
    rowSelection () {
      const { selectedRowKeys } = this
      return {
        selectedRowKeys,
        onChange: this.onSelectChange,
        hideDefaultSelections: true,
        selections: [
          {
            key: 'all-data',
            text: 'Select All Data',
            onSelect: () => {
              // eslint-disable-next-line vue/no-side-effects-in-computed-properties
              this.selectedRowKeys = [...Array(46).keys()] // 0...45
            }
          },
          {
            key: 'odd',
            text: 'Select Odd Row',
            onSelect: changableRowKeys => {
              let newSelectedRowKeys = []
              newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                if (index % 2 !== 0) {
                  return false
                }
                return true
              })
              // eslint-disable-next-line vue/no-side-effects-in-computed-properties
              this.selectedRowKeys = newSelectedRowKeys
            }
          },
          {
            key: 'even',
            text: 'Select Even Row',
            onSelect: changableRowKeys => {
              let newSelectedRowKeys = []
              newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                if (index % 2 !== 0) {
                  return true
                }
                return false
              })
              // eslint-disable-next-line vue/no-side-effects-in-computed-properties
              this.selectedRowKeys = newSelectedRowKeys
            }
          }
        ],
        onSelection: this.onSelection
      }
    }
  },
  methods: {
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    changeBack () {
      this.$emit('doSubmit')
    }
  }
}
</script>

<style scoped>

</style>
