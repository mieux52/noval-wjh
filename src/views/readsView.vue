<template>
<!-- 阅读 -->
  <div
    :class="[
      'readView',
      { night: day_night },
      { yewollow: back_day == 2 },
      { green: back_day == 3 },
      { prink: back_day == 4 },
      { brown: back_day == 5 },
    ]"
    v-if="state.detailsdata"
  >
    <div class="container">
      <!-- 头部的固定定位 -->
      <div class="read_top" v-show="state.top_bottom">
        <a @click="addback">
          <i></i>
        </a>
        <div class="read_home">
          <router-link to="/"></router-link>
        </div>
      </div>
      <!-- 底部的固定定位 -->
      <div class="read_bottom" v-show="state.top_bottom">
        <!-- 昼夜模式 -->
        <span
          :class="['time_day', { time_night: state.day_night }]"
          @click="day"
          v-show="!selected"
        ></span>
        <!-- 切换字体 -->
        <div class="select_back" v-show="state.fontsize">
          <div @click="Aadd">A +</div>
          <div @click="Areduce">A -</div>
        </div>
        <ul>
          <li>
            <a @click="prev">
              <i class="prev1"> </i>
              上一章
            </a>
          </li>
          <li>
            <a @click="check">
              <i class="menu1"> </i>
              目录
            </a>
          </li>
          <li>
            <a @click="state.fontsize = !state.fontsize">
              <i class="font1"> </i>
              字体
            </a>
          </li>
          <li>
            <router-link :to="'/comment?bookid=' + state.bookid">
              <i class="comment1"> </i>
              评论
            </router-link>
          </li>
          <li>
            <a @click="next">
              <i class="next1"> </i>
              下一章
            </a>
          </li>
        </ul>
      </div>

      <div :class="state.day_night ? 'read_partto' : 'read_part'">
        <!-- 题目 -->
        <div class="read_title">
          <h3>正文</h3>
        </div>
        <!-- 阅读内容 -->
        <div class="read_content" @click="exhibit">
          <div class="partContent">
            <div class="content" v-html="state.detailsdata" ref="contents"></div>
          </div>
        </div>
      </div>

      <!-- 底部按钮 -->
      <div class="read_btn" v-show="!menu_show">
        <a class="prev" @click="prev">上一章</a>
        <a class="wmenu" @click="check">查看目录</a>
        <a class="next" @click="next">下一章</a>
      </div>
    </div>
  </div>
  <div class="vbox" v-if="!state.detailsdata">
   <van-loading size="56px" vertical >加载中...</van-loading>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import { getchapterdetails, getchapter } from "../api/proxy/newhome";
import { useRouter, useRoute } from "vue-router";
import { Toast } from "vant";
export default {
  setup() {
    let state = reactive({
      listdata: null, // 章节目录
      detailsdata: null, // 章节内容
      top_bottom: false, // 隐藏
      day_night: false, // 昼夜切换
      fontsize:false,// 字体大小
      listid: null, // 章节id
      bookid: null, // 书本id
      size:16,
    });

    let router = useRouter();
    let route = useRoute();
    console.log(route.query);
    console.log(router);
    (state.bookid = route.query.id),
    (state.listid = route.query.listid),
    console.log(state.listid);

    let contents = ref(null);
    console.log(contents);

    let Aadd = ()=>{
      console.log(contents.value.style.fontSize);
      if(state.size<=32){
        state.size = state.size + 2;
      }
      contents.value.style.fontSize = state.size + "px"
    }
    let Areduce = ()=>{
      console.log(contents.value.style.fontSize);
      if(state.size>=10){
        state.size = state.size - 2;
      }
      contents.value.style.fontSize = state.size + "px"
    }


    // 章节数据
    getchapterdetails(state.bookid, state.listid).then((data) => {
      console.log(data);
      state.detailsdata = data.data.content;
    });

    // 章节目录
    getchapter(state.bookid).then((data) => {
      console.log(data.data);
      if (data) {
        state.listdata = data.data.catalog;
        window.localStorage.setItem(
          "addchapter",
          JSON.stringify(data.data.catalog)
        );
      } else {
        state.listdata = JSON.parse(window.localStorage.getItem("addchapter"));
      }
      (state.listlength = state.listdata.length - 1),
        console.log(state.listdata);
    });

    // 返回上一页
    let addback = () => {
      router.back();
    };

    // 跳转目录
    let check = () => {
      router.push({
        path: "/catalogue",
        query: { id: state.bookid, num: state.listid },
      });
    };
    // 下一章
    let next = () => {
      let index = state.listdata.findIndex((item) => {
        return item.secId == state.listid;
      });
      console.log(index);
      console.log(state.listid);
      state.listid = state.listdata[index + 1].secId;
      router.push({
        path: "/read",
        query: { id: state.bookid, listid: state.listid },
      });
    };
    // 上一章
    let prev = () => {
      let index = state.listdata.findIndex((item) => {
        return item.secId == state.listid;
      });
      console.log(index);
      console.log(state.listid);
      if (index != 0) {
        state.listid = state.listdata[index - 1].secId;
        router.push({
          path: "/read",
          query: { id: state.bookid, listid: state.listid },
        });
      } else {
        Toast("已是第一页！");
      }
    };

    // 点击显示
    let exhibit = () => {
      state.top_bottom = !state.top_bottom;
    };

    // 昼夜切换
    let day = () => {
      state.day_night = !state.day_night;
      console.log(123);
    };



    return {
      state,
      contents,
      check,
      next,
      prev,
      exhibit,
      addback,
      day,
      Aadd,
      Areduce
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/mobliebase.css";
.vbox{
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
 }
.readView {
  background: url(../assets/img/white.jpg) no-repeat;
  color: #3c3c3c;

  &.yewollow {
    background: #cebb8f;
  }
  &.green {
    background: url(../assets/img/cyan.jpg);
  }
  &.prink {
    background: url(../assets/img/pink.jpg);
  }
  &.brown {
    background: #655548;
    color: #bdae8f;
  }
  &.night {
    background: #191819;
    color: #6b696b;
  }

  height: 100%;
  background-repeat: repeat;

  .read_top {
    background: rgba(34, 34, 34, 0.98);
    width: 100%;
    height: 48px;
    z-index: 10;
    padding: 0 17px 0 16px;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    a {
      height: 48px;
      line-height: 48px;
      display: block;

      width: 50px;
      i {
        display: inline-block;
        width: 12px;
        background: url(../assets/img/read.png) 0 -54px no-repeat;
        height: 20px;
        background-size: 200px;
        vertical-align: -4px;
      }
    }
    .read_home {
      a {
        width: 21px;
        height: 24px;
        background: url(../assets/img/read.png) no-repeat;
        background-size: 200px;
        background-position: -12px -54px;
        margin-top: 15px;
      }
    }
  }
  .read_bottom {
    width: 100%;
    background: rgba(34, 34, 34, 0.98);
    box-sizing: border-box;
    padding: 28px 34px;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 4;
    text-align: center;

    .time_day {
      background: url(../assets/img/read.png) no-repeat;
      background-position: 1px -105px;
      height: 46px;
      width: 46px;
      background-size: 200px;

      position: absolute;
      bottom: 75px;
      right: 15px;
      z-index: 5;
      display: block;
    }
    .time_night {
      background-position: -48px -105px;
    }
    .select_back {
      display: flex;
      position: absolute;
      top: -49px;
      left: 0;
      box-sizing: border-box;
      background-color: rgba(34, 34, 34, 0.98);
      width: 100%;
      padding: 15px 15px 13px;
      border-bottom: 1px dashed #4a4a4a;
      justify-content: space-around;
      z-index: 100;
      div{
        color: rgba(255, 255, 255, 0.676);
        width: 50%;
        height: 40px;
        line-height: 40px;
        border: 1px rgba(255, 255, 255, 0.447) solid;
        
      }
    }

    ul {
      display: flex;
      li {
        width: 20%;
        text-align: center;
        a {
          color: #fff;
          font-size: 12px;
          padding: 12px 0 9px;

          .prev1 {
            display: block;
            background: url(../assets/img/read.png) no-repeat;
            height: 22px;
            width: 22px;
            background-position: -178px 0;
            background-size: 200px;
            margin: auto auto 2px;
          }
          .menu1 {
            display: block;
            background: url(../assets/img/read.png) no-repeat;
            height: 22px;
            width: 22px;
            background-position: -178px -25px;
            background-size: 200px;
            margin: auto auto 2px;
          }
          .font1 {
            display: block;
            background: url(../assets/img/read.png) no-repeat;
            height: 22px;
            width: 24px;
            background-position: -176px -49px;
            background-size: 200px;
            margin: auto auto 2px;
          }
          .comment1 {
            display: block;
            background: url(../assets/img/read.png) no-repeat;
            height: 22px;

            background-position: -178px -25px;
            background-size: 200px;
            margin: auto auto 2px;
            background-position: -176px -76px;
            width: 24px;
          }
          .next1 {
            display: block;
            background: url(../assets/img/read.png) no-repeat;
            height: 22px;
            width: 22px;
            background-position: -178px -104px;
            background-size: 200px;
            margin: auto auto 2px;
          }
        }
      }
    }
  }

  .read_part {
    width: 100%;
    box-sizing: border-box;
    padding: 0 22px;
    padding-bottom: 5px;
    .read_title {
      h3 {
        font-weight: 800;
        font-size: 23px;
        border-bottom: 1px solid #000;
        padding-top: 28px;
        padding-bottom: 11px;
        margin-bottom: 23px;
      }
    }
  }

  .read_btn {
    box-sizing: border-box;
    width: 100%;
    padding: 0 22px 22px;
    -webkit-box-flex: 1;
    display: flex;
    .prev {
      display: block;
      width: 33%;
      color: #fff !important;
      border: 1px solid #25c4a6 !important;
      height: 40px;
      box-sizing: border-box;
      text-align: center;
      line-height: 40px;
      margin-right: 11px;
      border-radius: 5px;
      font-size: 18px;
      background: #25c4a6 !important;
    }
    .next {
      display: block;
      width: 33%;

      height: 40px;
      box-sizing: border-box;
      text-align: center;
      line-height: 40px;

      border-radius: 5px;
      font-size: 18px;
      background: #25c4a6 !important;
      color: #fff !important;
      border: 1px solid #25c4a6 !important;
      margin-right: 0px;
    }
    .wmenu {
      display: block;
      width: 33%;
      color: #25c4a6 !important;
      border: 1px solid #25c4a6 !important;
      height: 40px;
      box-sizing: border-box;
      text-align: center;
      line-height: 40px;
      margin-right: 11px;
      border-radius: 5px;
      font-size: 18px;
    }
  }
}
</style>

<style>
.content{
  font-size: 16px;
}
.content p {
  margin-bottom: 16px;
  text-indent: 2em;
  line-height: 160%;
}
.content h1 {
  margin-bottom: 16px;
}
.read_partto {
  background-color: #191819;
  color: #6b696b;
  width: 100%;
  box-sizing: border-box;
  padding: 0 22px;
  padding-bottom: 5px;
}
.read_partto .read_title h3 {
  font-weight: 800;
  font-size: 23px;
  border-bottom: 1px solid #6b696b;
  padding-top: 28px;
  padding-bottom: 11px;
  margin-bottom: 23px;
}
</style>