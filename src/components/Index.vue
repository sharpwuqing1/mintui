<template>
  <div class="hello">
    <header class="mod_header">
      <i class="music_logo">
        <svg t="1516344677429" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="659" xmlns:xlink="http://www.w3.org/1999/xlink" width="25" height="25"><path d="M405.333333 704m-192 0a192 192 0 1 0 384 0 192 192 0 1 0-384 0Z" fill="#fff" p-id="660"></path><path d="M512 128v576h85.333333V298.666667l234.666667 64v-149.333334z" fill="#fff" p-id="661"></path></svg>
      </i>
      <span class="app-name">iMusic</span>
    </header>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1"><router-link  to="/index/recom">推荐</router-link></mt-tab-item>
      <mt-tab-item id="2"><router-link  to="/index/top">排行榜</router-link></mt-tab-item>
      <mt-tab-item id="3"><router-link  to="/index/search">搜索</router-link></mt-tab-item>
    </mt-navbar>
    <div class="con-view">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      selected: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
.con-view{
  margin-top: 5px;
  min-height: 200px;
}
.mod_header {
    position: relative;
    height: 44px;
    background: #c00022;
}
.mod_header .music_logo {
    float: left;
    display: block;
    width: 90px;
    height: 25px;
    margin: 9px 0 0 10px;
}
.mod_header .app-name {
    position: absolute;
    display: inline-block;
    right: 10px;
    top: 8px;
    height: 28px;
    padding: 0 12px;
    line-height: 28px;
    border-radius: 99px;
    font-size: 14px;
    color: #fff;
}
</style>
