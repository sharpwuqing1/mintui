<template>
     <div class="recom">
        <mt-swipe   :auto="4000">
          <mt-swipe-item v-for="k,i  in sliders"  :key="i">
             <img :src="k.picUrl.replace(/http/,'https')" >
          </mt-swipe-item>
        </mt-swipe>
        <div class="songlist">
          <p>热门歌单</p>
          <ul class="songlist-box">
            <li class="songlist-item" v-for="k,i  in songlists"  :key="i">
              <img :src="k.picUrl.replace(/http/,'https')">
            </li>
          </ul>
        </div>
      </div> 
</template>

<script>
//url
//https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=701075963&uin=0&format=jsonp&jsonpCallback=callback&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1512548815061
export default {
  data () {
    return {
       sliders:[],
       songlists:[]
    }
  },
  methods:{
      topView(){
        let _this=this;
        $.ajax({
              type: "get",
              async: false,
              url:"https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=701075963&uin=0&format=jsonp&jsonpCallback=callback&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1512548815061",
              dataType: "jsonp",
              jsonp: "callback",
              jsonpCallback: "callback",
              scriptCharset: 'GBK',//设置编码，否则会乱码
              success: function(res) {
                _this.sliders=res['data']['slider'];
                _this.songlists=res['data']['songList'];
                //console.log(res);
              },
              error: function() {
                alert('fail');
              }
            });
      }
  },
  mounted(){
        this.$nextTick(function (){
                this.topView()
          })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .mint-swipe{
        height: 140px;
    }
    .mint-swipe img{
        width: 100%;
    }
    .mint-swipe-item{
        background:#263238;
        line-height: 200px;
    }
    .songlist-item{
      float: left;
      width: 50%;
      box-sizing: border-box;
      padding-right: 8px;
      margin-bottom: 10px;
      overflow: hidden;
    }
    .songlist-item>img{
      width:100%;
    }
</style>
