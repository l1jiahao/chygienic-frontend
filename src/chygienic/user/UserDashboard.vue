<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-table :columns="columns" :data-source="data" :rowKey="(record,index)=>{return index}">
          <div slot="name" slot-scope="text">{{ text }}</div>
          <span slot="customTitle"><a-icon type="smile-o" @click="testPrint"/> 项目</span>
          <a-badge slot="status" slot-scope="text" :status="text | fmtBadge" :text="text | fmtStatus"></a-badge>
          <span slot="type" slot-scope="text" > {{ text===1?'科研':'教材' }}</span>
          <span slot="action" slot-scope="text, record">
            <a @click="showAlter(record)" v-show="record.status===0" >修改</a>
            <a-divider type="vertical" v-show="record.status===0"/>
            <a @click="showDetail(record)">详情</a>
            <a-divider v-show="record.status===0" type="vertical" />
            <a @click="showDeleteConfirm(record)" v-show="record.status===0" style="color: crimson">撤销</a>
          </span>
        </a-table>
      </div>
      <detail-card
        :visible="detailVisible"
        :loading="confirmLoading"
        :model="mdl"
        :has-file="hasFile"
        :file-name="fileName"
        @cancel="handleDetailOk"
        @ok="handleDetailOk"
      />
      <alter-card
        :visible="alterVisible"
        :loading="confirmLoading"
        :model="mdl"
        @cancel="handleAlterCancel"
        @ok="handleAlterOk"
      />
      <a-modal
        title="确认要撤销吗？"
        :visible="modalVisible"
        :confirm-loading="confirmLoading"
        :cancelRecord="cancelRecord"
        okType="danger"
        @ok="handleCancelOk(cancelRecord)"
        @cancel="handleCancelCancel"
      >
        <div>撤销之后需要重新填报相关信息</div>
      </a-modal>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { $get, $post } from '@/chygienic/util/request'
import DetailCard from '@/chygienic/user/DetailCard'
import AlterCard from '@/chygienic/user/AlterCard'

const columns = [
  {
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'name' },
    dataIndex: 'proj_name'
  },
  {
    title: '状态',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '类别',
    dataIndex: 'proj_type_id',
    scopedSlots: { customRender: 'type' }
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' }
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
      hasFile: false,
      fileName: '',
      data: [],
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      detailVisible: false,
      alterVisible: false,
      modalVisible: false,
      cancelRecord: null,
      submitInfo: []
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
  created () {
    $get('/get/getuserproject?user_id=' + this.$store.state.user.user_id).then(res => {
      if (res.data.status === 1) {
        this.data = res.data.message
      } else {
        this.data = []
      }
    })
  },
  computed: {
  },
  methods: {
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
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
    showAlter (record) {
      $get('/Getone/get?proj_id=' + record.proj_id).then(res => {
        this.mdl = res.data.message
        this.alterVisible = !this.alterVisible
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    handleAlterOk (submitData) {
      $post('/updateprojectinform/change', submitData).then(res => {
        if (res.data.status === 1) {
          this.$message.success('修改成功！')
          setTimeout(() => {
            this.alterVisible = !this.alterVisible
          }, 1000)
        } else {
          this.$message.warn(res.data.message)
        }
      })
    },
    handleAlterCancel () {
      this.alterVisible = !this.alterVisible
    },
    showDeleteConfirm (record) {
      this.modalVisible = !this.modalVisible
      this.cancelRecord = record
    },
    handleOk (record) {
      this.data.splice(this.data.indexOf(record), 1)
      this.modalVisible = !this.modalVisible
    },
    handleCancelCancel () {
      this.modalVisible = !this.modalVisible
    },
    handleCancelOk (record) {
      $get('/delete/deleteproject?proj_id=' + record.proj_id).then(res => {
        if (res.data.status === 1) {
          this.$message.info('删除成功！')
          setTimeout(() => {
            this.modalVisible = !this.modalVisible
            this.data.splice(this.data.indexOf(record), 1)
          }, 1000)
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    testPrint () {
      console.log(this.$store.state.user)
    }
  }
}
</script>
