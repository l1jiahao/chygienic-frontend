<template>
  <div>
    <button @click="doGet">get </button>
    <p v-for="(item, index) in info" :key="index"> {{ item.name +':' + item.career }} </p>
    <button @click="getStore">clear</button>
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
    },
    getStore () {
      $get('/getForm/getAllForm?proj_type_id=1').then(res => {
        console.log(res.data.message[0].limit_columns)
      })
    }
  }
}

</script>

<style scoped>

</style>
