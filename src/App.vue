<!--
 * @Date: 2020-07-13 07:22:31
 * @LastEditors: GWK
 * @LastEditTime: 2020-07-13 10:47:48
 * @FilePath: /log-upload/src/App.vue
--> 
<template>
  <div id="app">
    <LogUpload/>
  </div>
</template>

<script>
import LogUpload from './components/LogUpload.vue'

export default {
  name: 'App',
  components: {
    LogUpload
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
