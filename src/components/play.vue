<template>
  <div class="play_ui">
      <audio id="music-player"  style="height:0;width:0;display:none" autoplay loop :src="song_url"></audio>
      <div class="main_box">
            <div class="song_info">
                <span class="album_cover js-imgbox">
                  <img class="album_cover__img" :src="img_url">
                </span>
                <div class="song_info__flex">
                  <h1 class="song_name"><span class="song_name__text" id="songname" style="transition: none; transform: translate(0px);">{{song_info.songname}}</span></h1>
                  <p class="singer_name">
                      <span class="singer_name__text" id="singername"
                       v-for="(k,i) in song_info.singer" :key="i">
                         {{k.name}}
                     </span>
                  </p>
                </div>
                <a class="icon_play js-play" href="javascript:;" v-on:click="playSong()"></a>
            </div>
            <div class="flex_item">
                <div id="lyric" class="lyric">
                    <div id="lyric_box" class="lyric_box">
                        <div id="lyricDiv" class="lyric_text">
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
       </div>
      <div class="control">
              <div class="operate operate--right">
                <a class="operate__item js-like" href="javascript:;">
                  <i class="icon_like">喜欢</i>
                </a>
              </div>

              <div class="progress">
                <!-- 无拖动点 增加-->
                  <div class="progress__bar progress--no_dot">
                        <div class="progress__box">
                            <div class="progress__bg"></div>
                            <div class="progress__load" style="-webkit-transform:translateX(100%);"></div>
                            <div class="progress__play" id="js-progress" style="transform: translateX(0.657556%); transition-duration: 1s;"></div>
                            <div class="progress__play" id="play_on"><span class="progress__dot" style="display:none;" id="btn_pro"></span></div>
                        </div>
                  </div>
                  <span class="progress__start js-time-start">00:01</span>
                  <span class="progress__end js-time-total">03:52</span>
              </div>
      </div>
      <div class="bg blur" id="bg" v-bind:style="{backgroundImage: 'url(' + img_url + ')'}"></div>
      <div class="bg_mask" style="opacity:0.6;"></div>
  </div>
</template>

<script>
export default {
   data(){
    return {
      song_url:"",
      img_url:'',
      song_info:'',
      lyric:''
    }
   },
   methods:{
     searchMusicUrl(){
          let _this=this,_filename=`C400${this.song_info.songmid}.m4a`;
          $.ajax({
              type: "get",
              async: false,
              url:`https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?g_tk=1278911659&hostUin=0&format=jsonp&callback=callback&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&cid=205361747&uin=0&songmid=${this.song_info.songmid}&filename=${_filename}&guid=4529237216`
              ,
              dataType: "jsonp",
              jsonp: "callback",
              jsonpCallback: "callback",
              scriptCharset: 'GBK',//设置编码，否则会乱码
              success: function(res) {
                let arr=res['data']['items'][0];
                _this.getSongUrl(arr['vkey'],arr['filename']);
              },
              error: function() {
                alert('fail');
              }
          });
      },
      getSongUrl(vkey,filename){
          let _this=this,_vkey=vkey,_filename=filename;
          _this.song_url=`http://ws.stream.qqmusic.qq.com/${_filename}?guid=4529237216&vkey=${_vkey}&fromtag=0`;           
      },
      getlyric(){
          let _this=this;
          $.ajax({
              type: "get",
              async: false,
              url:`http://my.sharpwuqing.cn/lyric?songmid=${this.song_info.songmid}`,
              dataType: "json",
              success: function(res) {
                  console.log(res);
              },
              error: function() {
                alert('fail');
              }
          });
      },
      playSong(){
          if($(".js-play").hasClass("icon_play--pause")){
               $(".js-play").removeClass("icon_play--pause");
               this.song_url="";
          }else{
            $(".js-play").addClass("icon_play--pause");
            this.searchMusicUrl();
            this.getlyric();
            let attribute  = $('#music-player').attr('duration');
            //console.log(this.$route.params.data);
            console.log(attribute);
          }
      }
   },
   created(){

   },
   mounted(){
      this.$nextTick(function (){
          if((typeof this.$route.params.data)!='string'){
              sessionStorage.setItem('data',JSON.stringify(this.$route.params.data)); 
          }
         this.song_info=JSON.parse(sessionStorage.getItem('data')); 
         this.img_url=`http://y.gtimg.cn/music/photo_new/T002R150x150M000${this.song_info.albummid}.jpg?max_age=2592000`;
      })
  }
}
</script>

<style>
h1,p{
  margin:0;
}
.play_ui{
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    color:#fff;
    margin-bottom: 0;
    overflow: hidden;
}
.main_box {
    position: absolute;
    top: 0;
    bottom: 154px;
    z-index: 3;
    width: 100%;
}
.song_info {
    position: relative;
    display: -webkit-box;
    padding: 15px 80px 15px 15px;
    background: rgba(0,0,0,.7);
}
.album_cover {
    position: relative;
    display: block;
    width: 80px;
    margin-right: 15px;
    overflow: hidden;
}
.album_cover::after {
    content: "";
    display: block;
    padding-top: 100%;
}
.album_cover__img {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    background-size: cover;
}
.song_info__flex {
    -webkit-box-flex: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-box-pack: center;
    position: relative;
    overflow: hidden;
}
.song_name {
    position: relative;
    height: 30px;
    overflow: hidden;
    font-size: 18px;
    font-weight: normal;
    color: #fff;
}
.song_name__text {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    color:#fff;
    display: -webkit-box;
    -webkit-box-align: center;
    white-space: nowrap;
}
.singer_name {
    height: 21px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 14px;
    color: #fff;
}
.singer_name__text{
  color:fff;
}
.icon_play {
    position: absolute;
    top: 50%;
    right: 25px;
    width: 43px;
    height: 43px;
    margin-top: -22px;
    border: solid 1px #fff;
    border-radius: 999px;
    background: rgba(0,0,0,.1);
    opacity: .6;
}
.icon_play::after {
    content: "";
    display: block;
    width: 17px;
    height: 19px;
    margin: 13px 0 0 16px;
    background-position: 0 -150px;
    background-image: url(http://y.gtimg.cn/mediastyle/mobile/app/share/img/sprite_play.png?max_age=2592000&d=2015120);
    background-repeat: no-repeat;
    background-size: 40px 350px;
}
.icon_play--pause::after {
    width: 9px;
    height: 15px;
    margin: 14px 0 0 17px;
    background-position: 0 -180px;
    background-image: url(http://y.gtimg.cn/mediastyle/mobile/app/share/img/sprite_play.png?max_age=2592000&d=20151203183007);
    background-repeat: no-repeat;
    background-size: 40px 350px;
}
.flex_item {
    -webkit-box-flex: 1;
    position: relative;
}
.lyric {
    display: -webkit-box;
    -webkit-box-align: center;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
}
.lyric_box {
    position: relative;
    width: 100%;
    height: 336px;
    overflow: hidden;
}
.lyric_text {
    position: absolute;
    left: 10px;
    right: 10px;
    min-height: 150px;
    overflow: hidden;
}
.lyric_text p, .lyric__item {
    height: 42px;
    line-height: 42px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 16px;
    color: rgba(255,255,255,.6);
    text-align: center;
}
.control {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 3;
    width: 100%;
    height: 154px;
}
.operate {
    position: absolute;
    bottom: 114px;
    overflow: hidden;
}
.operate--right {
    right: 15px;
}
.operate__item {
    float: left;
    width: 40px;
    height: 40px;
    margin-left: 5px;
}
.icon_mv, .icon_like, .icon_kg, .icon_bgmusic, .icon_play_list, .icon_play::after, .btn_download::before, .tips.success p::before {
    background-image: url(https://y.gtimg.cn/mediastyle/mobile/app/share/img/sprite_play.png?max_age=2592000&d=20151203183007);
    background-repeat: no-repeat;
    background-size: 40px 350px;
}
.icon_like {
    width: 25px;
    height: 21px;
    margin-top: 10px;
}
.icon_like, .icon_kg, .icon_bgmusic, .icon_play_list {
    display: block;
    margin: 0 auto;
    overflow: hidden;
    line-height: 999px;
}
.progress {
    position: absolute;
    bottom: 74px;
    width: 100%;
    height: 40px;
}
.progress--no_dot {
    right: 55px;
}
.progress__bar {
    position: absolute;
    top: 0;
    left: 55px;
    right: 47px;
    height: 40px;
    overflow: hidden;
}
.progress--no_dot .progress__box {
    left: 0;
    right: 5px;
}
.progress__box {
    position: absolute;
    top: 0;
    left: 8px;
    right: 8px;
    z-index: 2;
    height: 40px;
}
.progress__bg {
    left: 0;
    z-index: 3;
    background-color: rgba(0,0,0,.1);
}
.progress__bg, .progress__load, .progress__play {
    position: absolute;
    top: 19px;
    width: 100%;
    height: 2px;
    transition: all 1s linear;
}
.progress__load {
    left: -100%;
    z-index: 4;
    background-color: rgba(255,255,255,.2);
}
.progress__bg, .progress__load, .progress__play {
    position: absolute;
    top: 19px;
    width: 100%;
    height: 2px;
    transition: all 1s linear;
}
.progress__play {
    left: -100%;
    z-index: 5;
    width: 100%;
    background-color: #31c27c;
}
.progress__play::before {
    content: "";
    position: absolute;
    top: 0;
    left: -8px;
    z-index: 7;
    width: 8px;
    height: 2px;
    background-color: #31c27c;
}
.progress__bg, .progress__load, .progress__play {
    position: absolute;
    top: 19px;
    width: 100%;
    height: 2px;
    transition: all 1s linear;
}
.progress--no_dot .progress__dot {
    display: none;
}
.progress__dot {
    position: absolute;
    top: -19px;
    right: -20px;
    width: 40px;
    height: 40px;
}
.progress__start {
    left: 0;
}
.progress__start, .progress__end {
    position: absolute;
    top: 0;
    z-index: 1;
    width: 55px;
    line-height: 40px;
    text-align: center;
}
.progress__end {
    right: 0;
}
.progress__start, .progress__end {
    position: absolute;
    top: 0;
    z-index: 1;
    width: 55px;
    line-height: 40px;
    text-align: center;
}
.blur {
    filter: blur(15px);
    transform: scale(1.15);
}
.bg {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    background-size: cover;
    background-position: bottom center;
}
.bg_mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    background-color: #000;
}
</style>
