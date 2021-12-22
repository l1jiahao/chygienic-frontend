<template>
  <div>
    <button @click="doGet">get </button>
    <p v-for="(item, index) in info" :key="index"> {{ item.name +':' + item.career }} </p>
    <button @click="doClear">clear</button>
  </div>
</template>

<script>
import { $get } from '@/chygienic/util/request'
export default {
  name: 'Test',
  data () {
    return {
      info: []
    }
  },
  methods: {
    doGet () {
      $get('/user/getAll').then(res => {
        this.info = res.data.message
      }).catch(reason => {
        alert(reason)
      })
    },
    doClear () {
      this.info = []
    }
  }
}

</script>

<style scoped>

</style>
