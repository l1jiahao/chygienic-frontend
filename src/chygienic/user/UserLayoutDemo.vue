<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-table :row-selection="rowSelection" :columns="columns" :data-source="data" :rowKey="(record,index)=>{return index}">
          <div slot="name" slot-scope="text">{{ text }}</div>
          <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
          <a-badge slot="sex" slot-scope="text" :status="text===1?'processing':'success'" :text="text===1?'男':'女'"></a-badge>
          <span slot="action" slot-scope="text, record">
            <a @click="showAlter(record)" >修改</a>
            <a-divider type="vertical" />
            <a @click="showDetail(record)">详情</a>
            <a-divider type="vertical" />
            <a @click="showDeleteConfirm(record)" v-show="record.sex===1" style="color: crimson">撤销</a>
          </span>
        </a-table>
      </div>
      <detail-card
        :visible="detailVisible"
        :loading="confirmLoading"
        :model="mdl"
        @cancel="showDetail"
        @ok="showDetail"
      />
      <alter-card
        :visible="alterVisible"
        :loading="confirmLoading"
        :model="mdl"
        @cancel="showAlter"
        @ok="showAlter"
      />
      <a-modal
        title="确认要撤销吗？"
        :visible="modalVisible"
        :confirm-loading="confirmLoading"
        :cancelRecord="cancelRecord"
        okType="danger"
        @ok="handleOk(cancelRecord)"
        @cancel="handleCancel"
      >
        <div>撤销之后需要重新填报相关信息</div>
      </a-modal>
      <a-button @click="submit">submit</a-button>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { $get } from '@/chygienic/util/request'
import DetailCard from '@/chygienic/user/DetailCard'
import AlterCard from '@/chygienic/user/AlterCard'

const columns = [
  {
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'name' },
    dataIndex: 'name'
  },
  {
    title: 'School',
    dataIndex: 'school'
  },
  {
    title: 'Sex',
    dataIndex: 'sex',
    scopedSlots: { customRender: 'sex' }
  },
  {
    title: 'Phone',
    dataIndex: 'phone'
  },
  {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

const data = [
  { proj_id: 1,
    proj_name: 'keyanxiangmu',
    proj_type_id: 0,
    status: 1
  },
  { proj_id: 2,
    proj_name: 'keyanxiangmu2',
    proj_type_id: 2,
    status: 0
  },
  { proj_id: 3,
    proj_name: 'jiaocai3',
    proj_type_id: 1,
    status: 0
  }
]

export default {
  components: {
    DetailCard,
    AlterCard
  },
  data () {
    return {
      confirmLoading: false,
      mdl: null,
      data,
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      detailVisible: false,
      alterVisible: false,
      modalVisible: false,
      cancelRecord: null,
      submitInfo: []
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
    showDetail (record) {
      this.mdl = record
      this.detailVisible = !this.detailVisible
    },
    showAlter (record) {
      this.mdl = record
      this.alterVisible = !this.alterVisible
    },
    doCancel () {
      console.log('doCancel')
    },
    showDeleteConfirm (record) {
      this.modalVisible = !this.modalVisible
      this.cancelRecord = record
    },
    handleOk (record) {
      this.data.splice(this.data.indexOf(record), 1)
      this.modalVisible = !this.modalVisible
    },
    handleCancel () {
      this.modalVisible = !this.modalVisible
    },
    submit () {
      this.submitInfo = []
      console.log(this.selectedRowKeys)
      this.selectedRowKeys.forEach(this.extractSelectData)
      console.log(this.submitInfo)
      $get('/getone', JSON.stringify(this.submitInfo)).then(res => {
        console.log(res)
      })
    },
    extractSelectData (index) {
      this.submitInfo.push(
        { name: this.data[index].name,
          sex: this.data[index].sex
        })
    }
  }
}
</script>
