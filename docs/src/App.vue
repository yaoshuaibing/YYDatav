<template>
  <div id="app">
    <div class="item">
      <word-cloud-ball></word-cloud-ball>
    </div>
    <div class="item">
      <polling-data></polling-data>
    </div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss">
*{
  margin:0;
  padding:0
}
body{
   height: 100%;
  width:100%
}
#app {
  background: rgba(14, 43, 67, 1);
  height: 100%;
  width:100%;
  display:flex;
  flex-wrap:wrap;
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
.item{
  width:480px;
  height:270px;
  border:1px solid #ccc;
  margin:20px;
}
</style>
