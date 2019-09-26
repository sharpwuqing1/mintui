<template>
  <div class='toplist'>
       <ul>
         <li v-for="k,i in toplist" :key="i" v-if="k.id!=201">
          <router-link  :to="{name:'toplist',params:{topid:k.id}}">
               <div class="topic_media"><img :src="k.picUrl.replace(/http/,'https')"></div>
               <div class="topic_info">
                 <h3 class='topic_tit'>{{k.topTitle}}</h3>
                  <ul>
                    <li v-for="key,i in k.songList" :key="i">
                      {{i+1}}.<span>{{key.songname}}</span>-<span>{{key.singername}}</span>
                    </li>
                  </ul>
               </div>
           </router-link>
         </li>
       </ul>
  </div>
</template>

<script>
//https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?g_tk=5381&uin=0&format=jsonp&jsonpCallback=callback&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1514888428782
//"{path:'/toplist',query:{topid:k.id}}"  {path:'/toplist/'+k.id} {name:'toplist',params:{topid:k.id}}
export default {
  data () {
    return {
      toplist:[]
    }
  },
  methods:{
      getToplist(){
        let _this=this;
        $.ajax({
              type: "GET",
              async: false,
              url:"https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?g_tk=5381&uin=0&format=jsonp&jsonpCallback=callback&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1514888428782",
              dataType: "jsonp",
              jsonp: "callback",
              jsonpCallback: "callback",
              scriptCharset: 'GBK',//设置编码，否则会乱码
              success: function(res) {
                _this.toplist=res['data']['topList'];
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
                this.getToplist()
          })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
.toplist{
  background:#f4f4f4;
}
.toplist>ul>li{
  width:100%;
  background:#fff;
  padding-top:5px;
  margin-bottom: 5px;
}
.topic_media{
  display: inline-block;
  width: 100px;
  height: 100px;
  margin-top: 10px;
}
.topic_media>img{
  width:100%;
}
.topic_info{
    float:right;
    width:220px;
    margin-left:10px;
  }
.topic_info li{
  width:220px;
  overflow: hidden;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
} 
.topic_info li>span{
  font-size: 14px;
} 
.topic_tit{
    font-size: 16px;
    color: #000;
    font-weight: normal;
    margin:0 0 5px 0;
  }
</style>
