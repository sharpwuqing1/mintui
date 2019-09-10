<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body,div{
  margin:0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
}
a{
  display: inline-block;
  font-size: 16px;
  text-decoration: none;
  color:#333;
}
</style>
