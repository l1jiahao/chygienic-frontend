<template>
  <a-list :grid="{ gutter: 16, column: 1 }" :data-source="model">
    <a-list-item slot="renderItem" slot-scope="item">
      <a-card :title="item.proj_batch_name">
        <a-tag color="blue" v-for="(column_item,index) in JSON.parse(item.limit_columns)" :key="index">{{ column_item }}</a-tag>
        <a-form-item
          style="text-align: right"
        >
          <a-button type="primary" html-type="submit" @click="doSubmit(model.indexOf(item))">
            填报
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
    }
  },
  data () {
    return {
    }
  },
  methods: {
    doSubmit (cardIndex) {
      this.$emit('doSubmit', cardIndex)
    }
  }
}
</script>
<style></style>
