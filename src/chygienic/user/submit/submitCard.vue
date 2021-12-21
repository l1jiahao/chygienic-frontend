<template>
  <a-list :grid="{ gutter: 16, column: 1 }" :data-source="data">
    <a-list-item slot="renderItem" slot-scope="item ,index">
      <a-card :title="item.title">
        Card content,{{ index }}
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
