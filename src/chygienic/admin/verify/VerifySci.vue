<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="12">
            <a-form-item>
              <a-button @click="changeBack" icon="left">返回</a-button>
            </a-form-item>
          </a-col>
          <a-col :md="12">
            <a-form-item style="text-align: right">
              <a-button type="primary" @click="doAcceptMulti" :disabled="isMultiSelect">一键通过</a-button>
              <a-button style="margin-left: 8px" icon="upload" :disabled="isMultiSelect">批量导出</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <a-table :row-selection="rowSelection" :columns="processColumns" :data-source="processData" :rowKey="(record,index)=>{return index}">
      <a-badge slot="status" slot-scope="text" :status="text | fmtBadge" :text="text | fmtStatus"></a-badge>
      <span slot="action" slot-scope="text, record">
        <a @click="showDetail(record)" >详情</a>
        <a-divider type="vertical" />
        <a @click="doAccept(record)" style="color: lightgreen">通过</a>
        <a-divider type="vertical" />
        <a @click="doReject(record)" v-show="record.status===0" style="color: crimson">拒绝</a>
      </span>
    </a-table>
    <detail-card
      :visible="detailVisible"
      :loading="confirmLoading"
      :model="mdl"
      @cancel="showDetail"
      @ok="showDetail"
    />
  </a-card>
</template>

<script>
import DetailCard from '@/chygienic/user/DetailCard'
const columns = [
  {
    title: 'fee',
    dataIndex: 'fee'
  },
  {
    title: 'host',
    dataIndex: 'host'
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
  props: {
    limitColumns: {
      type: Object,
      required: true
    },
    model: {
      type: Array,
      default: () => []
    }
  },
  components: {
    DetailCard
  },
  data () {
    return {
      data,
      columns,
      alertMessage: '',
      mdl: null,
      detailVisible: false,
      confirmLoading: false,
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
            key: 'process',
            text: '待审核',
            onSelect: changableRowKeys => {
              let newSelectedRowKeys = []
              newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                return this.processData[index].status === 0
              })
              // eslint-disable-next-line vue/no-side-effects-in-computed-properties
              this.selectedRowKeys = newSelectedRowKeys
            }
          },
          {
            key: 'success',
            text: '已通过',
            onSelect: changableRowKeys => {
              let newSelectedRowKeys = []
              newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                return this.processData[index].status === 1
              })
              // eslint-disable-next-line vue/no-side-effects-in-computed-properties
              this.selectedRowKeys = newSelectedRowKeys
            }
          },
          {
            key: 'error',
            text: '未通过',
            onSelect: changableRowKeys => {
              let newSelectedRowKeys = []
              newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                return this.processData[index].status === 2
              })
              // eslint-disable-next-line vue/no-side-effects-in-computed-properties
              this.selectedRowKeys = newSelectedRowKeys
            }
          }
        ],
        onSelection: this.onSelection
      }
    },
    processData () {
      const data = []
      for (const i in this.model) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.model[i].json_content.status = this.model[i].status
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.model[i].json_content.proj_id = this.model[i].proj_id
        data.push(this.model[i].json_content)
      }
      return data
    },
    processColumns () {
      const columns = []
      for (const i in this.limitColumns) {
        const col = {
          title: this.limitColumns[i],
          dataIndex: i
        }
        columns.push(col)
      }
      columns.push(
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        }
      )
      columns.push(
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      )
      return columns
    },
    isMultiSelect () {
      return this.selectedRowKeys.length === 0
    }
  },
  filters: {
    fmtStatus (val) {
      return ['待审核', '已通过', '未通过'][val]
    },
    fmtBadge (val) {
      return ['processing', 'success', 'error'][val]
    }
  },
  methods: {
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    changeBack () {
      console.log('back')
      this.$emit('doSubmit')
    },
    showDetail (record) {
      this.detailVisible = !this.detailVisible
      console.log(JSON.stringify(
        {
          proj_id: record.proj_id
        }
      ))
      this.mdl = {
        json_id: 1,
        json_content: {
          name: 'xx项目',
          host: 'xxx',
          level: '项目性质',
          fee: 2000,
          start: '立项时间',
          end: '验收时间'
        }
      }
    },
    doAccept (record) {
      console.log(JSON.stringify(
        {
          proj_id: record.proj_id,
          status: 1
        }
      ))
    },
    doReject (record) {
      console.log(JSON.stringify(
        {
          proj_id: record.proj_id,
          status: 2
        }
      ))
    },
    doAcceptMulti () {
      const ids = []
      for (var i in this.selectedRowKeys) {
        if (this.processData[this.selectedRowKeys[i]].status === 0) {
          ids.push(this.processData[i].proj_id)
        }
      }
      if (ids.length === 0) {
       this.$message.warning('当前所项中不包含待审核的项目！')
      } else {
        console.log(JSON.stringify(
          {
            proj_ids: ids
          }
        ))
      }
    }
  }
}
</script>

<style scoped>

</style>
