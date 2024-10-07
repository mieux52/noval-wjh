<template>
<!-- 详情页 -->
  <div class="detailView">
    <div class="container" v-if="state.pagedata">
      <!-- 头部 -->
      <div class="header">
        <div class="left">
          <a @click="addback"  ><i></i></a>
          {{state.pagedata.title}}
        </div>
        <div class="right">
          <router-link  to="/" class="home"></router-link>
          <router-link  to="/user" class="user"> </router-link>
          <router-link  to="/search" class="search"></router-link>
        </div>
      </div>
      <!-- 简介 -->
      <div class="introduce">
        <div class="top">
          <div class="leftimg">
            <img :src="state.pagedata.link[1].href" alt="" />
            <div class="only"></div>
          </div>
          <div class="righttext">
            <h2>{{ state.pagedata.title }}</h2>
            <a href="" class="author">{{ state.pagedata.author.name }} </a>
            <div class="num">
              <span>{{ state.pagedata["pris:book"].keyname}}</span>
            </div>
            <div class="popular">
              <div class="populars">{{  state.pagedata["pris:subscribe"].clicks }}</div>
              <div class="addbook" @click="addbook">
                <i>加入书架</i>

              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          {{ state.pagedata.summary}}
        </div>
      </div>
      <!-- 目录 -->
      <div class="menu"> 
        <h2>
          <span class="biaoti">目录</span>
          <span class="newtime"> 更新时间:</span>
          <i class="time">{{state.pagedata["pris:book"].updated.substring(0,10)}} </i>
        </h2>
        <div class="menu_list" v-if="state.chapterdata">
          <a
            v-for="(item, index) in state.chapterdata.slice(0,5)"
            :key="index"
            href=""
            >{{ item.title }}</a
          >
        </div>

        <div class="more">
          <a  @click="jumpcatalogue">更多章节</a>
        </div>
      </div>

      <!-- 书评 -->
      <div class="comment"> 
        <h2 class="comments">
          <span class="comments_h">书评</span>
          <span class="num"></span>
        </h2>
        <a @click="jumpcomment">查看评论</a>
      </div>

      <!-- 同类作品推荐 -->
      <div class="list cons">
        <div class="titles">同类作品推荐</div>
        <div class="list_second">
          <div
            class="list_item"
            v-for="(item, index) in state.homedata.slice(0,8)"
            :key="index"
            @click="openbook(item.id,item.title)"
          >
            <div class="img">
              <img :src="item.cover" @error.once="useDefaultImage" alt="" />
            </div>
            <div class="book_title">{{ item.title }}</div>
            <span class="author"> {{ item.author }}</span>
          </div>
        </div>
      </div> 

      <!-- 底部固定 -->
       <div class="footer">
        <!-- <div class="app">
          <span>下载官方APP</span>
          <div class="song">新用户送会员</div>
        </div>  -->
        <a class="read" @click="goread"> 开始阅读 </a>
      </div> 
    </div>
    <div class="vbox" v-if="!state.pagedata">
   <van-loading size="56px" vertical >加载中...</van-loading>
  </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { getnewhome,getnewdetails,getchapter } from "../api/proxy/newhome"
import { useRouter,useRoute } from 'vue-router'
import { Toast } from "vant";
export default {
  setup() {
    
    let state = reactive({
      homedata:null,// 首页数据
      pagedata:null,// 详情数据
      chapterdata:null,// 章节目录
      id:null,
      name:null,
      bookshelf:[],
      ishsow:true,
    })

    let router = useRouter();
    let route = useRoute();  //接受点击书本的数据的id和标题，
    console.log("接收到的id和标题",router, route.query);  //打印接受到的数据
    state.id = route.query.id    //接收到的书本的id等于该变量的id
    state.name = route.query.name //接收到的书本的id等于该变量的标题
    console.log("接收到的id",state.id);
    console.log("接收到的标题",state.name);




        // 加入书架
        let addbook = ()=>{
          let book = JSON.parse(window.localStorage.getItem("bookshelf"));
          let pagedata = JSON.parse(window.localStorage.getItem("pagedata"));
          if(book){
          let num= book.find((item)=>{
            return item.id == pagedata.id
          })
          Toast('已成功加入书架');
          console.log(num);
          if(!num){                                     
            book.push(pagedata);
            window.localStorage.setItem("bookshelf",JSON.stringify(book));
          }
         
        }else{
          let arr = []
          arr.push(pagedata)
          window.localStorage.setItem("bookshelf",JSON.stringify(arr));
          
        }  
       
    }
  


    // 首页数据
    getnewhome().then(data=>{
      console.log("首页数据",data);
      state.homedata = data.list.filter(item=>{   //过滤数据，除了接收到的对应的数据之外
        return item.title != route.query.name
      })

      console.log("书本数据",state.homedata)
    })

    // 详情数据
    getnewdetails(state.id,state.name).then(data=>{
      console.log("详情数据", data)
      if(data){
        state.pagedata = data.feed.entry
        
        window.localStorage.setItem("pagedata",JSON.stringify(data.feed.entry))
      }else{
        state.pagedata = JSON.parse(window.localStorage.getItem("pagedata"))
        if(!state.pagedata){
          router.push({
            path:"/"
          })
        }
      }
      console.log("书本详情数据",state.pagedata);
    })

    // 章节目录
    getchapter(route.query.id).then(data=>{
      console.log("目录数据",data.data)
      if(data){
        state.chapterdata = data.data.catalog
        window.localStorage.setItem("addchapter",JSON.stringify(data.data.catalog))
      }else{
        state.chapterdata = JSON.parse(window.localStorage.getItem("addchapter"))
      }
    })

    //  图片加载失败 添加默认图片
    let useDefaultImage = (event) => {
        event.target.src = "./img/taduwx.png";
    }

    // 跳转点击该本书详情页
    let openbook = (itemid,itemidtitle)=>{
      router.push({
        path:"/details",
        query:{id:itemid,name:itemidtitle}
      })
    }

    // 返回上一页
    let addback = ()=>{
      router.back();
    }
    // 跳转目录
     let jumpcatalogue = ()=>{
      router.push({
        path:"/catalogue",
        query:{
          id:state.id     
        }
      })
    }
    // 跳转阅读页并且存到到阅读记录中
    let goread = ()=>{
      router.push({
        path:"/read",
        query:{
          id:state.id,
          listid:state.chapterdata[0].secId
        }
      })

    //存到阅读记录数据
      let book = JSON.parse(window.localStorage.getItem("Readrecord"));

      console.log("记录",book);
          let pagedata = JSON.parse(window.localStorage.getItem("pagedata"));  //当前书本数据
          if(book){     //如果存在阅读记录的数据
          let num= book.find((item)=>{       //查找阅读记录是否存在当前这部书的数据
            return item.id == pagedata.id
          })
          console.log(num);
          if(!num){         //如果不存在，就添加到阅读记录数组中                                
            book.push(pagedata);
            window.localStorage.setItem("Readrecord",JSON.stringify(book));
          }
         
        }else{  //如果不存在阅读记录的数组，则就创建一个空数组，再添加当前书本的数据
          let arr = []
          arr.push(pagedata)
          window.localStorage.setItem("Readrecord",JSON.stringify(arr));
        }  


    }
   

    // 跳转评论页面
    let jumpcomment = ()=>{     
      router.push({
        path:"/comment",
        query:{
          bookid:state.id
        }
      })
    }

     

    return{
      state,
      useDefaultImage,
      openbook,
      addback,
      jumpcatalogue,
      goread,
      addbook,
      jumpcomment
    }


  },
}
</script>

<style lang="scss" scoped>
@import "../assets/css/mobliebase.css";
.detailView {
  background-color: #f5f7f9;
.vbox{
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
 }
  // 通用头部
  .header {
    padding-left: 16px;
    padding-right: 17px;
    display: flex;
    justify-content: space-between;
    border-bottom: 0.5px solid rgba(204, 212, 227, 0.5);
    box-sizing: border-box;
    background-color: #fff;
    .left {
      color: #313131;
      font-size: 18px;
      height: 48px;
      line-height: 48px;
      i {
        background: url(../assets/img/jingling.png) no-repeat;
        background-position: -71px -5px;
        width: 10px;
        height: 20px;
        display: inline-block;
        background-size: 86px;
        position: relative;
        top: 3px;
        margin-right: 10px;
      }
    }
  }
  .right {
    .home {
      display: inline-block;
      width: 24px;
      height: 24px;
      background-position: -5px -5px;
      background: url(../assets/img/jingling.png) no-repeat;
      background-size: 77px;
      margin: 15px 0 0 20px;
      margin-top: 13px;
    }
    .user {
      display: inline-block;
      background: url(../assets/img/jingling.png) no-repeat;
      background-size: 83px;
      width: 23px;
      height: 20px;
      background-position: -36px -6px;
      margin: 15px 0 0 20px;
      margin-top: 13px;
    }
    .search {
      display: inline-block;
      background: url(../assets/img/jingling.png) no-repeat;
      background-size: 83px;
      width: 21px;
      height: 20px;
      background-position: -36px -38px;
      margin: 15px 0 0 20px;
      margin-top: 13px;
    }
  }
  /* .right .home{
    display: inline-block;
    width: 54px;
    height: 54px;
    background-position: -16px -16px;
    background: url(../assets/img/jingling.png) no-repeat;
    margin: 15px 0 0 20px;
    margin-top: 13px;
} */
  .introduce {
    box-sizing: border-box;
    padding: 25px 21px 16px 21px;
    background-color: #fff;
   .bottom{
    display: -webkit-box;
    overflow: hidden;  
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
   }
  }
  .top {
    display: flex;
    .leftimg {
      width: 93px;
      height: 125px;
      position: relative;
      img {
        border-radius: 6px;
        height: 100%;
      }
      .only {
        width: 71px;
        height: 25px;
        background: url(../assets/img/incon.png) no-repeat center center;
        background-size: 100%;
        position: absolute;
        top: 2px;
        left: -7px;
      }
    }
  }
  .righttext {
    margin-left: 12.5px;
    h2 {
      font-size: 18px;
      color: #2e3033;
      font-weight: 700;
      margin-top: 6px;
    }
    & > a {
      font-size: 14px;
      color: #2e3033;
      overflow: hidden;
      -webkit-line-clamp: 2;
      text-overflow: ellipsis;
      display: inline-block;
      -webkit-box-orient: vertical;
      margin-top: 4px;
      &::after {
        display: inline-block;
        content: "";
        background: url(../assets/img/arr.png) no-repeat center center;
        background-size: 100%;
        width: 4px;
        height: 7px;
      }
    }
    .num {
      color: #8a8f99;
      font-size: 13px;
      font-style: normal;
      margin-top: 0px;
      span {
        font-style: normal;
      }
      i {
        font-style: normal;
      }
      em {
        font-style: normal;
      }
    }
    .popular {
      margin-top: 10.5px;
      display: flex;
      justify-content: space-between;
      width: 227px;
      .addbook {
        width: 81px;
        height: 21px;
        border: 1px solid #d3d1dd;
        border-radius: 20px;
        text-align: center;
        line-height: 19px;
        i {
          font-style: normal;
          color: #2e3033;
          font-size: 13px;
          &::before {
            content: "+";
          }
        }
      }
    }
    .populars {
      font-size: 13px;
      color: #8a8f99;
    }
  }
  .bottom {
    margin-top: 16px;
    width: 100%;
    color: #2e3033;
    font-size: 14px;
    font-weight: 400;
    line-height: 25px;
  }
  .menu {
    margin-top: 16px;
    padding: 0 21px;
    padding-bottom: 16px;
    background-color: #fff;
    h2 {
      height: 52px;
      width: 100%;
      line-height: 52px;
      .biaoti {
        color: #2e3033;
        font-size: 18px;
      }
      .newtime {
        color: #2e3033;
        font-size: 13px;
      }
      .time {
        font-size: 13px;
        color: #2e3033;
        font-style: normal;
      }
    }
    .menu_list {
      width: 100%;
      a {
        display: block;
        font-size: 14px;
        color: #2e3033;
        height: 31px;
        line-height: 31px;
      }
    }
    .more {
      a {
        display: block;
        background-color: #f5f7f9;
        color: #8a8f99;
        margin-top: 8px;
        text-align: center;
        width: 325px;
        height: 41px;
        line-height: 41px;
        font-size: 14px;
        border-radius: 40px;
      }
    }
  }
  .comment {
    display: flex;
    background-color: #fff;
    justify-content: space-between;
    margin-top: 16px;
    padding: 0 21px;
    height: 39px;
    line-height: 39px;
    .comments {
      .comments_h {
        font-size: 18px;
        color: #2e3033;
      }
      .num {
        font-size: 12px;
        color: #2e3033;
      }
    }
    & > a {
      display: inline-block;
      font-size: 13px;
      color: #2e3033;
      &::after {
        display: inline-block;
        content: "";
        background: url(../assets/img/arr.png) no-repeat center center;
        background-size: 100%;
        width: 5px;
        height: 8px;
        margin-left: 3px;
      }
    }
  }
  .list {
    width: 100%;
    padding: 0 21px;
    box-sizing: border-box;
    background: #fff;
    margin-top: 16px;
    padding-bottom: 52px;
    .titles {
      color: #2e3033;
      padding-top: 17px;
      padding-bottom: 17px;
      font-size: 18px;
    }
    .list_first {
      display: flex;
      margin-bottom: 16px;
      .img {
        width: 69px;
        height: 92px;
        margin-right: 8px;
        img {
          border-radius: 4px;
          height: 100%;
        }
      }
    }
    .newbook {
      display: flex;
      width: 100%;
      justify-content: space-between;
      .newbook_item {
        width: 50%;
        display: flex;
        margin-bottom: 16px;
        .img {
          width: 50px;
          height: 66px;
          margin-right: 8px;
          img {
            height: 100%;
            border-radius: 4px;
          }
        }
      }
      .newbook_text {
        p {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          color: #2e3033;
          font-size: 14px;
          margin-bottom: 4px;
          width: 100px;
        }
        span {
          font-size: 12px;
          color: #8a8f99;
        }
      }
    }
  }
  .list_text {
    width: 73%;
    h2 {
      font-size: 14px;
      margin-top: 2px;
    }
    p {
      margin-top: 4px;
      margin-bottom: 8px;
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      color: #8a8f99;
      line-height: 19px;
    }
    .text_bottom {
      font-size: 12px;
      color: #8a8f99;
    }
  }
  .list_second {
    display: flex;
    flex-wrap:wrap ;
    justify-content: space-between;
    .list_item {
      margin-bottom: 16px;
      .img {
        margin-bottom: 16px;
      }
    }
    .img {
      width: 68px;
      height: 91px;
      img {
        border-radius: 6px;
      }
    }
    .book_title {
      width: 68px;
      color: #2e3033;
      font-size: 14px;
      margin-top: 6px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .author {
      color: #8a8f99;
      font-size: 12px;
    }
  }
  .footer {
    background: #fff;
    width: 100%;
    display: flex;
    padding: 12.5px 21px;
    box-sizing: border-box;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    .app {
      width: 143px;
      height: 31px;
      background: #fff7d9;
      border-radius: 31px;
      text-align: center;
      padding-top: 6px;
      span {
        display: block;
        line-height: 13px;
        color: #953a00;
        font-size: 14px;
      }
      .song {
        font-size: 12px;
        color: #ff6862;
      }
    }
    .read {
      width: 100%;
      height: 28px;
      padding-top: 9px;
      background: #ffd338;
      text-align: center;
      color: #2e3033;
      font-size: 16px;
      border-radius: 28px;
    }
  }
}
</style>