<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-table :row-selection="rowSelection" :columns="columns" :data-source="data" />
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { $get } from '@/chygienic/util/request'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Sex',
    dataIndex: 'sex'
  },
  {
    title: 'School',
    dataIndex: 'school'
  },
  {
    title: 'Phone',
    dataIndex: 'phone'
  }
]

const data = []

export default {
  data () {
    return {
      data,
      columns,
      selectedRowKeys: [] // Check here to configure the default column
    }
  },
  created () {
    $get('/user/getAll').then(res => {
      this.data = res.data.message
    })
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
            text: '已通过',
            onSelect: () => {
              // eslint-disable-next-line vue/no-side-effects-in-computed-properties
              this.selectedRowKeys = [...Array(this.data.length).keys()] // 0...45
              console.log(this.selectedRowKeys)
            }
          },
          {
            key: 'female',
            text: '女性',
            onSelect: changableRowKeys => {
              let newSelectedRowKeys = []
              newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                return this.data[index].sex === 0
              })
              // eslint-disable-next-line vue/no-side-effects-in-computed-properties
              this.selectedRowKeys = newSelectedRowKeys
            }
          },
          {
            key: 'male',
            text: '选择男性',
            onSelect: changableRowKeys => {
              let newSelectedRowKeys = []
              newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                return this.data[index].sex === 1
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
    loadData () {

    }
  }
}
</script>
