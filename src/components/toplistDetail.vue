<template>
  <div class="toplist-detail">
      <div class="album">
          <div class="album_info">
              <div class="album_media">
                <img :src="pic_album_url" >
              </div>
              <div class="album_bd">
                <h1 class="album__name">{{topinfo.ListName}}</h1>
                <!-- <p v-if="week!=0" class="album__desc">第{{week}}周</p>
                <p v-if="day!=0" class="album__desc">第{{day}}天</p> -->
                <p class="album__desc">{{update_time}}&nbsp;更新</p>
              </div>
          </div>
      </div>
      <div class="songlist_box">
          <div class="count_box">
              <div calss="count_box__desc">
                排行榜
                <span class="count_box__number">共{{total_song_num}}首</span>
              </div>
          </div>
          <ul class="rank_list">
            <li class="qui_list__item" v-for="(k,i)  in toplistArr" :key="i">
              <router-link  :to="{name:'play',params:{data:k.data}}">
                    <div class="qui_list__order">
                        <span class="qui_list__decimal">{{i+1}}</span>
                    </div>
                    <div class="qui_list__bd">
                        <div class="qui_list__box">
                            <h3 class="qui_list__tit">
                              <span class="qui_list__txt">{{k.data.songname}}</span></h3>
                            <p class="qui_list__desc">
                                <span class="qui_list__txt">
                                  <span v-for="(key,index) in k.data.singer" :key="index">{{key.name}}&nbsp;</span>
                                  {{k.data.albumdesc}}
                                </span>
                            </p>
                        </div>
                    </div>
              </router-link> 
            </li>
          </ul>
      </div>   
  </div>
</template>

<script>
/*
https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=jsonp&jsonpCallback=callback&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=4&_=1514947819525
*/
export default {
  data () {
    return {
      week:'',
       day:'0',
       update_time:'',
       total_song_num:0,
       topinfo:{},
       pic_album_url:'',
       toplistArr:[]
    }
  },
  methods:{
      getToplistDetail(){
          let _this=this;
          $.ajax({
              type: "get",
              async: false,
              url:`https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=jsonp&jsonpCallback=callback&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=${_this.$route.params.topid}&_=1514947819525`,
              dataType: "jsonp",
              jsonp: "callback",
              jsonpCallback: "callback",
              scriptCharset: 'GBK',//设置编码，否则会乱码
              success: function(res) {
                //_this.week=res['date'].slice(5);
                _this.day=res['day_of_year'];
                _this.update_time=res['update_time'];
                _this.total_song_num=res['total_song_num'];
                _this.topinfo=res['topinfo'];
                _this.toplistArr=res['songlist'];
                _this.pic_album_url=res['topinfo']['pic_album'].replace(/http/,'https');
                //console.log(res['topinfo']);
                //console.log(res);
                //console.log((new Date()).getTime());
              },
              error: function() {
                alert('fail');
              }
            });
      }
      
  },
  mounted(){
      this.$nextTick(function (){
                this.getToplistDetail()
          })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2,h3 {
  font-weight: normal;
  margin:0;
}
.album{
  padding: 17px 0 17px 0 ;
  background: rgba(0,0,0,.5);
}
.album_info{
  width: 100%;
}
.album_media{
  margin-left: 10px;
  display:inline-block;
  width:125px;
}
.album_media>img{
  width:100%;
}
.album_bd{
  color:#fff;
  float:right;
  margin-right:10px;
}
.album__name{
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  max-height: 47px;
  line-height: 1.3;
  overflow: hidden;
  font-size: 16px;
}
.album__desc{
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  max-height: 36px;
  overflow: hidden;
  margin-top: 8px;
  font-size: 14px;
}
.count_box {
    position: relative;
    display: -webkit-box;
    -webkit-box-align: center;
    height: 54px;
    margin: 0 16px -10px;
}
.count_box__desc {
    font-size: 14px;
}
.count_box__number {
    margin-left: 5px;
}
.songlist_box{
  color:#777;
}
.qui_list__item{
  display:block;
  height:62px;
}
.qui_list__item>a{
  display: block;
}
.qui_list__item:nth-child(-n+3) .qui_list__decimal {
    color: #FF400B;
}
.qui_list__order {
    float: left;
    width: 45px;
    height:100%;
    margin-right: -16px;
}
.qui_list__decimal {
    position:relative;
    top:10px;
    left:15px;
    font-size: 16px;
}
.qui_list__bd {
    display: inline-block;
    padding: 0 16px;
    overflow: hidden;
    height:100%;
}
.qui_list__box {
    -webkit-box-flex: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}
.qui_list__tit {
    font-size: 16px;
    color: #000;
}
.qui_list__txt {
    display: block;
    max-width: 250px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.qui_list__desc, .qui_list__tit {
    display: -webkit-box;
    -webkit-box-align: center;
    overflow: hidden;
    margin:0;
}
.qui_list__desc .qui_list__txt{
  font-size: 12px;
}
</style>
