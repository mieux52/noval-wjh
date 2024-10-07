<template>
<!-- 书架 -->
  <div class="bookView">
    <!-- 头部 -->
    <div class="header">
      <div class="left">
        <router-link  to="/"><i></i></router-link>
      我的书架
      </div>
      <div class="right">
        <router-link  to="/" class="home"></router-link>
      <router-link  to="/user" class="user"> </router-link>
        <router-link  to="/search" class="search"></router-link>
      </div>
    </div>
    <div class="content" v-if="state.bookshelf.length">
      <div class="num">
        共 &nbsp;<i>{{state.bookshelf.length}}</i> 本
      </div>
      <div class="manager" v-show="state.btnshow" @click="state.btnshow = !state.btnshow">
        管理
      </div>
      <div class="over" v-show="!state.btnshow" @click="state.btnshow = !state.btnshow">
        完成
      </div>
    </div>

    <div class="bookitem" v-if="state.bookshelf">
      <div @click="bookjump(item.id,item.title)"  class="item" v-for="(item,index) in  state.bookshelf" :key="index" >
        <div  class="del_btn" @click.stop="del(index)" v-show="!state.btnshow">删除</div>
        <div class="img">
          <img :src="item.link[1].href" alt="" />
        </div>
        <div class="text">
          <h2>{{ item.title }}</h2>
          <p>{{ item.author.name }}</p>
          <div class="complete">
            <em>已读</em>
            从第一章开始阅读
          </div>
          <div class="new">
            <em>最新</em>
            第四百八十三章 <span>钞能力</span>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="more">
      <span>无更多内容</span>
    </div> -->
    <!-- 带搜索的底部 -->
    <!-- <div class="footer">
      <router-link  to="/search" class="searchs" >
        <input    type="text" name="" id="" placeholder="书名/作者/关键词" />
        <div class="searchsicon"></div>
      </router-link>
      <div class="link">
        <a >联系我们</a>
        <a >意见反馈</a>
        <a @click="retop()"
          >回到顶部
          <i></i>
        </a>
      </div>
      <div class="link2">
        <a href="">电脑版</a>
        <a href="" class="con">触屏版</a>
        <a href="">客户端</a>
      </div>
      <a href="" class="link3">京ICP备09017823号-5</a>
    </div> -->
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { useRouter } from 'vue-router'
export default {
  setup() {
    let state = reactive({
      num:0,
      btnshow:true,
      bookshelf:[],
    })


    let router= useRouter()
    state.bookshelf = JSON.parse(window.localStorage.getItem("bookshelf"));
    if(!state.bookshelf){
      state.bookshelf = []
    }
    


       //书本跳转
  let bookjump = (id,name)=>{
    console.log(id,name);
    router.push({
      path:"/detail",
      query:{
        id:id,
        name:name
      }
    })
   }



   //书本删除
   let del=(i)=>{
   let lists =  JSON.parse(window.localStorage.getItem("bookshelf"));
   lists.splice(i,1)
    window.localStorage.setItem("bookshelf",JSON.stringify(lists))
    console.log("Sss")
    state.bookshelf = JSON.parse(window.localStorage.getItem("bookshelf"));
   
   }

  






    return{
      state,
      bookjump,
      del
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../assets/css/mobliebase.css";
.bookView {
  .header {
    padding-left: 16px;
    padding-right: 17px;
    display: flex;
    justify-content: space-between;
    border-bottom: 0.5px solid rgba(204, 212, 227, 0.5);
    box-sizing: border-box;
  }
  .header {
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
      margin: 15px 0 0 19px;
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
      margin: 15px 0 0 19px;
      margin-top: 13px;
    }
  }
  .content {
    box-sizing: border-box;
    padding: 0 15px;
    padding-top: 5px;
    display: flex;
    justify-content: space-between;
    height: 42px;
    line-height: 42px;
    margin-bottom: 10px;
    background-color: #fff;
    .num {
      font-size: 14px;
      i {
        color: #ff6a67;
        font-style: normal;
      }
    }
    .manager {
      font-size: 12px;
      border: 1px solid #25c4a6;
      color: #25c4a6;
      height: 20px;
      line-height: 20px;
      border-radius: 3px;
      padding: 0 7px;
      margin-top: 8px;
    }
    .over {
      font-size: 12px;
      background-color: #25c4a6;
      color: #fff;
      height: 20px;
      line-height: 20px;
      border-radius: 3px;
      padding: 0 7px;
      margin-top: 8px;
    }
  }
  .bookitem {
    padding: 0 15px;
    box-sizing: border-box;
    margin-top: 10px;
    min-height: 400px;

  }
  .item {
    display: flex;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #f5f5f5;
    position: relative;
    .del_btn {
      color: #65b7e7;
      font-size: 12px;
      position: absolute;
      top: 35px;
      right: 9px;
      z-index: 100;
    }
    .img {
      width: 80px;
      height: 110px;
      padding-right: 16px;
      img {
        height: 100%;
      }
    }
    .text {
      margin-top: 0px;
      h2 {
        font-size: 15px;
        margin-top: 4px;
      }
      p {
        font-size: 13px;
        color: #999;
        padding: 4px 60px 2px 0;
        padding-top: 6px;
      }
      .complete {
        font-size: 12px;
        color: #999;
        margin-top: 3px;
        em {
          color: #999;
          border: 1px solid #999;
          font-style: normal;
          padding: 0 3px;
        }
      }
      .new {
        margin-top: 9px;
        font-size: 12px;
        color: #999;
        em {
          font-size: 12px;
          font-style: normal;
          border: 1px solid #fb4957;
          color: #fb4957;
          padding: 0 3px;
        }
        span {
          color: #999;
        }
      }
    }
  }
  .more {
    width: 100%;
    box-sizing: border-box;
    padding-bottom: 16px;
    text-align: center;
    span {
      width: 100%;
      display: block;
      background: #f8f8f8;
      height: 43px;
      line-height: 43px;
      font-size: 12px;
      color: #999;
    }
  }
  .footer {
    box-sizing: border-box;
    padding: 0 15px;
    padding-top: 15px;
    background-color: #f5f5f5;
    .searchs {
      position: relative;
      input {
        box-sizing: border-box;
        width: 100%;
        padding: 0 10px;
        border-radius: 5px;
        height: 35px;
        outline: 0;
        border: 1px solid #bfbfbf;
        background-color: #fff;
        line-height: 35px;
        padding-top: 4px;
        color: #999;
      }
    }
    .link {
      box-sizing: border-box;
      width: 100%;
      padding: 0 20px;
      padding-top: 18px;
      display: flex;
      margin-bottom: 14px;
      a {
        color: #999;
        font-size: 13px;
        display: inline-block;
        padding: 0 24px;
        border-right: 1px solid #999;
        &:last-of-type {
          border: none;
        }
      }
    }
    .link2 {
      height: 22px;
      padding: 0 40px;
      padding-top: 14px;
      margin-bottom: 14px;
      a {
        display: inline-block;
        padding: 0 23px;
        text-align: center;
        color: #999;
        font-size: 10px;
        &.con {
          color: #25c4a6;
        }
      }
    }
    .link3 {
      color: #999;
      padding: 14px 0 20px;
      font-size: 10px;
      display: block;
      text-align: center;
    }
  }
  input {
    &::-webkit-input-placeholder {
      color: #999;
    }
  }
  .searchsicon {
    background: url(../assets/img/person_icon.png) 0 -165px no-repeat;
    width: 20px;
    height: 20px;
    background-size: 100%;
    position: absolute;
    top: 0px;
    right: 8px;
  }
}
</style>