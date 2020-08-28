<template>
  <div id="app">
    123
    <v-list></v-list>
    <polling-data
      :rowSize="2"
      :header="header"
      :data="data"
      :pollingSpeed="60"
      :delay="1000"
    ></polling-data>
  </div>
</template>

<script>
import { header, data } from "./mock/pollingData";
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      header,
      data
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
