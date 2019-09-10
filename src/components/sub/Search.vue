<template>
    <div>
       <div class="mint-searchbar">
          <div class="mint-searchbar-inner">
            <i class="mintui mintui-search"></i> 
            <input type="search" class="mint-searchbar-core"
             placeholder="搜索歌曲、歌单、专辑" 
             v-model="value"
             v-on:focus="show"
             @keyup.enter="getsearch" 
             >
          </div> 
          <a class="mint-searchbar-cancel" style="display: none;"  v-on:click="display">取消</a>
       </div>
       <div class="searchList" style="display: none;">
            <ul class="song-list">
              <li v-for="(k,i)  in songlists"  :key="i">
                <router-link  :to="{name:'play',params:{data:k}}">
                  <i class="icon"></i>
                  <h6 class="main_tit">{{k.songname}}</h6>
                  <p class="sub_tit"><span v-for="(k,i)  in k.singer"  :key="i">{{k.name}}&nbsp;</span></p>
                </router-link>
              </li>
            </ul>
       </div>
       <div class="hotword">
          <h3>热门搜索</h3>
          <ul>
           <li class="tag-s tag_hot">
             <span>{{special_key}}</span>
           </li>
           <li class="tag-s" v-for="(key,i)  in hotwords"  :key="i">
             <span>{{key.k}}</span>
           </li>
         </ul>
      </div>
    </div>
</template>

<script>
//https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?g_tk=5381&uin=0&format=jsonp&jsonpCallback=callback&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1514887002288
export default {
  data () {
    return {
      value:'',
      special_key:'',
      hotwords:[],
      songlists:[]
    }
  },
  methods:{
    gethotword(){
      let _this=this;
      $.ajax({
              type: "get",
              async: false,
              url:"https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?g_tk=5381&uin=0&format=jsonp&jsonpCallback=callback&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1514887002288",
              dataType: "jsonp",
              jsonp: "callback",
              jsonpCallback: "callback",
              scriptCharset: 'GBK',//设置编码，否则会乱码
              success: function(res) {
                _this.special_key=res['data']['special_key']
                _this.hotwords=res['data']['hotkey'];
                //console.log(res);
              },
              error: function() {
                alert('fail');
              }
            });
    },
    getsearch(){
      let _this=this;
      if(_this.value){
            $.ajax({
              type: "get",
              async: false,
              url: `https://c.y.qq.com/soso/fcgi-bin/client_search_cp?aggr=1&cr=1&flag_qc=0&p=1&n=30&w=${_this.value}`,
              dataType: "jsonp",
              jsonp: "callback",
              jsonpCallback: "callback",
              scriptCharset: 'GBK',//设置编码，否则会乱码
              success: function(res) {
                _this.songlists=res['data']['song']['list'];
                //console.log(res['data']['song']['list']);
              },
              error: function() {
                alert('fail');
              }
            });
      }

    },
    show(){
      $('.mint-searchbar-cancel').show();
      $('.hotword').hide();
      $('.searchList').show();
    },
    display(){
      $('.mint-searchbar-cancel').hide();
      $('.hotword').show();
      $('.searchList').hide();
      this.songlists='';
    }
    
  },
  mounted(){
        this.$nextTick(function (){
                this.gethotword()
          })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
.mint-search{
  height: 70px;
}
p{margin:0;}
.tag-s{
   display: inline-block;
    font-size: 14px;
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    color: #000;
    border: 1px solid rgba(0,0,0,.6);
    border-radius: 99px;
    word-break: keep-all;
    margin-bottom: 10px;
    margin-right: 14px;
}
.hotword{
  margin:8px;
}
.tag_hot {
    color: #fc4524;
    border-color: #fc4524;
}
.song-list{
  display: block;
}
.song-list>li{
  display: list-item;
  text-align: -webkit-match-parent;
  margin-bottom: 5px;
  font-size: 16px;
  position: relative;
  height: 55px;
  padding-left: 56px;
  overflow: hidden;
}
.song-list>li::after {
    content: "";
    position: absolute;
    height: 1px;
    top: 0;
    left: 0;
    right: 0;
    background: #e5e5e5;
}
.song-list>li>a{
  display:block;
}
.main_tit {
    margin: 10px 0 2px;
    line-height: 18px;
    font-size: 16px;
    font-weight: normal;
    color: #000;
}
.icon {
    position: absolute;
    top: 18px;
    left: 18px;
    width: 22px;
    height: 20px;
    background-position: 0 0;
    background-image: url(https://y.gtimg.cn/mediastyle/mobile/yqq_v5/img/search_sprite.png?max_age=19830212&d=20151105145423);
    background-repeat: no-repeat;
    background-size: 22px 30px;
}
.sub_tit {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #808080;
}
</style>
