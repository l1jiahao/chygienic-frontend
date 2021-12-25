<template>
  <a-list :grid="{ gutter: 16, column: 1 }" :data-source="model">
    <a-list-item slot="renderItem" slot-scope="item">
      <a-card :title="item.proj_batch_name">
        <a-tag color="blue" v-for="(column_item,index) in JSON.parse(item.limit_columns)" :key="index">{{ column_item }}</a-tag>
        <a-tag color="green">{{ '已填报：' + projectsNum[model.indexOf(item)] }}</a-tag>
        <a-form-item
          style="text-align: right"
        >
          <a-button type="primary" html-type="submit" @click="doVerify(model.indexOf(item))">
            审核查看
          </a-button>
        </a-form-item>
      </a-card>
    </a-list-item>
  </a-list>
</template>
<script>

export default {
  props: {
    model: {
      type: Array,
      default: () => []
    },
    projectsNum: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
    }
  },
  methods: {
    doVerify (cardIndex) {
      this.$emit('doVerify', cardIndex)
    },
    getNum (limitId) {
      for (var i in this.projectsNum) {
        if (this.projectsNum[i].limit_id === limitId) {
          return this.projectsNum[i].num
        }
      }
    }
  }
}
</script>
<style></style>
