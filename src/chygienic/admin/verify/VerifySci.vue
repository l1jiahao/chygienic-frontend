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
              <a-button type="danger" style="margin-left: 8px" @click="doRejectMulti" :disabled="isMultiSelect">一键拒绝</a-button>
              <a-button style="margin-left: 8px" icon="upload" :disabled="isMultiSelect" @click="exportData">批量导出</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <a-table :row-selection="rowSelection" :columns="processColumns" :data-source="model" :rowKey="(record,index)=>{return index}">
      <a-badge slot="status" slot-scope="text" :status="text | fmtBadge" :text="text | fmtStatus"></a-badge>
      <span slot="action" slot-scope="text, record">
        <a @click="showDetail(record)" >详情</a>
        <a-divider v-show="record.status!==1" type="vertical" />
        <a v-show="record.status!==1" @click="doAccept(model.indexOf(record))" style="color: lightgreen">通过</a>
        <a-divider v-show="record.status!==2" type="vertical" />
        <a v-show="record.status!==2" @click="doReject(model.indexOf(record))" style="color: crimson">拒绝</a>
      </span>
    </a-table>
    <detail-card
      :visible="detailVisible"
      :loading="confirmLoading"
      :model="mdl"
      :has-file="hasFile"
      :file-name="fileName"
      @cancel="handleDetailOk"
      @ok="handleDetailOk"
    />
  </a-card>
</template>

<script>
import DetailCard from '@/chygienic/user/DetailCard'
import outputExcel from '@/chygienic/util/outputExcel'
import { $get, $post } from '@/chygienic/util/request'

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
  created () {
  },
  components: {
    DetailCard
  },
  data () {
    return {
      alertMessage: '',
      hasFile: false,
      fileName: '',
      mdl: null,
      detailVisible: false,
      confirmLoading: false,
      selectedRowKeys: [], // Check here to configure the default column
      sourceData: []
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
                return this.model[index].status === 0
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
                return this.model[index].status === 1
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
                return this.model[index].status === 2
              })
              // eslint-disable-next-line vue/no-side-effects-in-computed-properties
              this.selectedRowKeys = newSelectedRowKeys
            }
          }
        ],
        onSelection: this.onSelection
      }
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
      this.sourceData = []
      console.log(this.sourceData)
      this.$emit('changeBack')
    },
    showDetail (record) {
      this.hasFile = false
      $get('/getPath?project_id=' + record.proj_id).then(res => {
        console.log(res.data)
        if (res.data.status === 1) {
          this.hasFile = true
          this.fileName = res.data.message
        }
      })
      $get('/Getone/get?proj_id=' + record.proj_id).then(res => {
        this.mdl = res.data.message.json_content
        this.detailVisible = !this.detailVisible
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    handleDetailOk () {
      this.detailVisible = !this.detailVisible
    },
    doAccept (index) {
      $post('/update/updateStatus', {
          proj_id: this.model[index].proj_id,
          status: 1
        }
      ).then(res => {
        if (res.data.status === 1) {
          this.model[index].status = 1
        } else {
          this.$message.warning(res.data.message)
        }
      })
    },
    doReject (index) {
      $post('/update/updateStatus', {
          proj_id: this.model[index].proj_id,
          status: 2
        }
      ).then(res => {
        if (res.data.status === 1) {
          this.model[index].status = 2
        } else {
          this.$message.warning(res.data.message)
        }
      })
    },
    doAcceptMulti () {
      const ids = []
      for (var i in this.selectedRowKeys) {
        if (this.model[this.selectedRowKeys[i]].status === 0) {
          ids.push(this.model[this.selectedRowKeys[i]].proj_id)
        }
      }
      if (ids.length === 0) {
       this.$message.warning('当前所项中不包含待审核的项目！')
      } else {
        $post('/pass/passAllProject', {
          proj_ids: ids
        }).then(res => {
          if (res.data.status === 1) {
            for (var i in this.selectedRowKeys) {
              this.model[this.selectedRowKeys[i]].status = 1
            }
          } else {
            this.$message.warning(res.data.message)
          }
        })
      }
    },
    doRejectMulti () {
      const ids = []
      for (var i in this.selectedRowKeys) {
        if (this.model[this.selectedRowKeys[i]].status === 0) {
          ids.push(this.model[this.selectedRowKeys[i]].proj_id)
        }
      }
      if (ids.length === 0) {
        this.$message.warning('当前所项中不包含待审核的项目！')
      } else {
        $post('pass/notpassAllProject', {
          proj_ids: ids
        }).then(res => {
          if (res.data.status === 1) {
            for (var i in this.selectedRowKeys) {
              this.model[this.selectedRowKeys[i]].status = 2
            }
          } else {
            this.$message.warning(res.data.message)
          }
        })
      }
    },
    exportData () {
      const data = []
      for (var i in this.selectedRowKeys) {
          data.push(this.model[this.selectedRowKeys[i]])
      }
      outputExcel(this.processColumns, data, 'ExportData')
    }
  }
}
</script>

<style scoped>

</style>
