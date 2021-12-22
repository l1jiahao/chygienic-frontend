<template>
  <div>
    <button @click="doGet"> </button>
  </div>
</template>

<script>
import { $get } from '@/chygienic/util/request'
export default {
  name: 'Test',
  methods: {
    doGet () {
      $get('/user/getAll1').then(res => {
        console.log(res)
      }).catch(reason => {
        alert(reason)
      })
    }
  }
}

</script>

<style scoped>

</style>
