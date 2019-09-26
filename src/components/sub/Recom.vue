<template>
     <div class="recom">
        <mt-swipe   :auto="4000">
          <mt-swipe-item v-for="k,i  in sliders"  :key="i">
             <img :src="k.picUrl.replace(/http/,'https')" >
          </mt-swipe-item>
        </mt-swipe>
        <div class="mod_twocol_list mod_twocol_list_special">
          <h2 class="list_title">热门歌单</h2>
          <ul class="list_container">
            <li v-for="k,i  in songlists"  :key="i">
              <a class="list_main" href="#" >
                  <div class="list_media">
                      <img :src="k.cover">
                      <span class="listen_count">
                         <i class="icon icon_listen"></i>
                         {{k.listen_num}}
                      </span>
                      <span class="icon icon_play"></span>
                  </div>
                  <div class="list_info">
                      <h3 class="list_tit">{{k.title}}</h3>
                      <p class="list_text">{{k.username}}</p>
                  </div> 
              </a>
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
                //_this.songlists=res['data']['songList'];
                //console.log(res);
              },
              error: function() {
                alert('fail');
              }
            });
      },
      hotSongList()
      {
        let _this=this;
        $.ajax({
              type: "get",
              async: false,
              url: 'http://my.sharpwuqing.cn/recommend',
              success: function(ret) {
                let result = ret['recomPlaylist']['data']['v_hot'];
                //console.log(ret['recomPlaylist']['data']['v_hot']);
                _this.songlists = result;
              },
              error: function() {
                alert('fail');
              }
            });
      }
  },
  mounted(){
        this.$nextTick(function (){
                this.topView();
                this.hotSongList();
          })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    ul {
        margin: 0;
        padding: 0;
    }
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

    .mod_twocol_list {
      margin-left: 10px;
      margin-right: 10px;
    }

    .mod_twocol_list .list_title {
      font-size: 16px;
      color: #000;
      margin-bottom: 11px;
      font-weight: 400;
    }
    .mod_twocol_list .list_container {
      overflow: hidden;
      margin-right: -8px;
      width: 100%;
    }
    .mod_twocol_list li {
      float: left;
      width: 50%;
      box-sizing: border-box;
      padding-right: 8px;
      margin-bottom: 10px;
      overflow: hidden;
    }
    .mod_twocol_list li .list_main {
        display: block;
        background: #fff;
    }
    .mod_twocol_list li .list_media {
        position: relative;
        margin-bottom: 5px;
    }

    .mod_twocol_list li .list_media::before {
        content: "";
        display: block;
        padding-top: 100%;
    }
    .mod_twocol_list li .list_media img{  
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
        z-index: 1;
    }

    .mod_twocol_list li .list_media .listen_count {
      position: absolute;
      z-index: 10;
      left: 5px;
      bottom: 7px;
      display: block;
      line-height: 12px;
      color: #fff;
    }

    .mod_twocol_list_special li .list_media::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 42px;
      z-index: 2;
      background-image: url(https://y.gtimg.cn/mediastyle/mobile/yqq_v5/img/shadow_rp.png?max_age=2592000&v=1421e030144559ad213fe587f5bf3e52);
      background-size: 1px 42px;
      background-repeat: repeat-x;
    }

    .mod_twocol_list li .list_media .icon_listen {
      display: block;
      float: left;
      width: 10px;
      height: 10px;
      background-position: 0 -50px;
      margin-right: 5px;
    }

    .mod_twocol_list li .list_media .icon_listen, .mod_twocol_list li .list_media .icon_play {
        background-image: url(https://y.gtimg.cn/mediastyle/mobile/yqq_v5/img/list_sprite.png?max_age=2592000&v=bf901360b97d78b972786e4e8ece5218);
        background-repeat: no-repeat;
        background-size: 24px 60px;
    }

    .mod_twocol_list li .list_text, .mod_twocol_list li .list_tit {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 400;
        font-size: 12px;
    }

    .mod_twocol_list li .list_info {
        padding: 0 7px 5px;
        color: #000;
    }

    .mod_twocol_list li .list_tit {
        font-size: 14px;
    }

    .mod_twocol_list li .list_text {
        font-size: 12px;
    }
    
</style>
