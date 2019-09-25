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

body {
    font: 12px/1.5 "hiragino sans gb",arial;
    color: #555;
    background: #f4f4f4;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-user-select: none;
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
