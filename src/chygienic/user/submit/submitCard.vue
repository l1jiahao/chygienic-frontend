<template>
  <a-list :grid="{ gutter: 16, column: 1 }" :data-source="model">
    <a-list-item slot="renderItem" slot-scope="item">
      <a-card :title="item.proj_bach_name">
        <a-tag color="blue" v-for="(column_item,index) in item.limit_columns" :key="index">{{ column_item }}</a-tag>
        <a-form-item
          style="text-align: right"
        >
          <a-button type="primary" html-type="submit" @click="doSubmit">
            填报
          </a-button>
        </a-form-item>
      </a-card>
    </a-list-item>
  </a-list>
</template>
<script>

const data = [
  {
    title: '2021年第一轮学科评估'
  },
  {
    title: '2021年第二轮学科评估'
  },
  {
    title: '2021年第三轮学科评估'
  }
]
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    model: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      data
    }
  },
  methods: {
    doSubmit () {
      this.$emit('doSubmit')
    }
  }
}
</script>
<style></style>
