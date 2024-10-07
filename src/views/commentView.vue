<template>
<!-- 评论 -->
  <div class="commentView" >
    <div class="container">
      <!-- 第一个头部 -->
      <div class="header" v-show="!show_com">
        <div class="left">
          <a @click="addback" ><i></i></a>
          全部评论
        </div>
        <div class="right">
          <router-link  to="/" class="home"></router-link>
          <router-link  to="/user" class="user"> </router-link>
          <router-link  to="/search" class="search"></router-link>
        </div>
      </div>

      <!-- 第二个头部 -->
       <div class="header"  v-show="show_com">
        <div class="left">
          <a @click="show_com=!show_com"
            ><i></i
          ></a>
         回复评论
        </div>
        <div class="right">
          <router-link  to="/home" class="home"></router-link>
          <router-link  to="/user" class="user"> </router-link>
          <router-link  to="/search" class="search"></router-link>
        </div>
      </div>
      
      <!-- 第一次出现的评论 -->
      <div class="addcom" v-if="state.commentdata">
        <div class="comment_ta" v-show="!show_com">
          <textarea
            placeholder="写下你对此书的感想吧~"
            maxlength="1000"
            class=""
            v-model="state.text"
          ></textarea>
          <div class="clearfix">
            <span>请文明用语哦~&nbsp;<i></i>&nbsp;</span>
            <div class="none" @click="add">发表评论</div>
          </div>
        </div>
        <div class="cm_results" v-show="!show_com" >
          <h1>共<span>&nbsp;{{state.num}}&nbsp;</span>条书评...</h1>
          <ul class="moreThis" >
            <li v-for="item in state.commentdata " :key="item.cid">
              <img :src="item.avatar || state.index_lists1.taduwx" @error.once="useDefaultImage" />
              <div class="moreThis2">
                <h3>{{ item.nickName }}</h3>
                <p>{{ item.comment }}</p>
                <span>2022-10-30 06:01</span>
                <span class="number" ><i></i></span>
              </div>
            </li>
          </ul>
        </div>


        <!-- 再次点进去的评论 -->
        <div class="encm_reply" v-show="show_com" v-for="(data,index) in enlists" :key="index">
          <div class="cm_reply" >
            <img
              :src="data.img"
            />

            <div class="cm_reply2" >
              <h3>
                <span>{{data.title}}</span>
                <span>2022-10-30 06:01</span>
              </h3>

              <p>{{data.content}}</p>
            </div>
          </div>
          <div class="line"></div>
          <div class="comment_ta2">
            <textarea
              placeholder="写下你对此书的感想吧~"
              maxlength="1000"
              class="" v-model="revalue"
            ></textarea>
            <div class="clearfix">
              <span>最多可输入&nbsp;<i>1000</i>&nbsp;字</span>
              <div class="none" @click="enadd()">发表评论</div>
            </div>
          </div>
          <div class="cm_results2">
            <h1>共<span>&nbsp; {{re_comment_length}}&nbsp;</span>位书友回复了此书评</h1>
            <ul class="moreThis">
              <li v-for=" (re,index) in re_comment" :key="index">
                <img src="../assets/img/ut3.jpeg" />
                <div class="moreThis2">
                  <h3>经济</h3>
                  <p>{{re}}</p>
                  <span>2022-10-30 06:01</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="more">
            <span>无更多内容</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import { useRouter,useRoute } from 'vue-router';
import { getcomment } from "../api/proxy/newhome"
import { getindex_lists } from "../api/home.js";
export default {
  setup() {

    let state = reactive({
      num:null,
      commentdata:null,// 评论数据
      index_lists1:null,
      text:null,
    })

    let router = useRouter();
    let route = useRoute();
    console.log(route.query.bookid);
    // 评论数据
    getcomment({bookId:route.query.bookid}).then(data=>{
      console.log(data);
      // let commentdata = JSON.parse(window.localStorage.getItem("commentdata"))
      // let bel = commentdata[0].find(item=>{
      //   return item.bookId == route.query.bookid
      // })
      // console.log(commentdata[0]);
      // if(bel){
      //   state.commentdata = commentdata[0];
      //   state.num =  commentdata[0].length;
      // }else{
        state.commentdata = data.all.list;
        state.num = data.all.totalcount;
      // }
      
    })

    getindex_lists().then((data) => {
      state.index_lists1 = data.index_lists1;
      console.log(state.index_lists1.taduwx);
    });

    let addback = ()=>{
      router.back();
    }

    //  图片加载失败 添加默认图片
    let useDefaultImage = (event) => {
        event.target.src = state.index_lists1.taduwx;
    }
    
    // 评论
    let add = ()=>{
      
        let my = {   
          nickName: "td185220793",
          avatar:"../assets/img/touxiang.png",
          comment:state.text,
          bookId:route.query.bookid
        }
        state.commentdata.unshift(my);
        state.num ++
        state.text = ""
        let commentdata = [state.commentdata]
        window.localStorage.setItem("commentdata",JSON.stringify(commentdata))
    }


    return{
      state,
      addback,
      useDefaultImage,
      add
    }
    
  },
}
</script>

<style lang="scss" scoped>
@import "../assets/css/mobliebase.css";
.commentView {
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
  .addcom {
    .comment_ta {
      box-sizing: border-box;
      padding: 15px;
      border-bottom: 1px solid #f5f5f5;
      textarea {
        width: 100%;
        box-sizing: border-box;
        padding: 10px;
        font-size: 13px;
        margin: 0 0 15px;
        border-radius: 5px;
        border: 1px solid #bdbdbd;
        color: #333;
        overflow-y: visible;
        resize: none;
        height: 60px;
      }
      .clearfix {
        display: flex;
        justify-content: space-between;
        span {
          color: #999;
          font-size: 12px;
          line-height: 30px;
          i {
            color: #777;
            font-style: normal;
          }
        }
        .none {
          width: 80px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          background: #25c4a6;
          font-size: 13px;
          color: #fff;

          border-radius: 5px;
        }
      }
    }
    .cm_results {
      padding: 0 15px;
      h1 {
        padding-top: 26px;
        font-size: 15px;
        margin-bottom: 30px;
        span {
          color: #ff6a67;
        }
      }
      .moreThis {
        li {
          padding: 16px 0 10px;
          display: flex;

          width: 100%;
          box-sizing: border-box;
          border-top: 1px solid #f5f5f5;
          &:first-child {
            border-top: none;
            padding-top: 0;
          }
          img {
            width: 28px;
            margin-right: 11px;
            border-radius: 50%;
            height: 28px;
            border: none;
          }
          .moreThis2 {
            width: 300px;
            h3 {
              font-size: 12px;
              color: #999;
            }
            p {
              line-height: 23px;
              margin: 3px 0;
              font-size: 14px;
              color: #111;
              width: 100%;
              overflow: hidden;
              word-break: break-all;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            > span {
              color: #999;
              font-size: 12px;
              line-height: 19px;
            }
            .number {
              margin-left: 183px;

              color: #999;
              font-size: 12px;
              line-height: 19px;
              i {
                background: url(../assets/img/read_icon.png) 0 -74px no-repeat;
                background-size: 25px auto;
                width: 13px;
                height: 12px;
                display: inline-block;
                position: relative;
                top: 3px;
                margin-left: 3px;
              }
            }
          }
        }
      }
    }
    .encm_reply {
      .cm_reply {
        padding: 15px 15px 6px;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        > img {
          width: 28px;
          margin-right: 11px;
          border-radius: 50%;
          height: 28px;
        }
        .cm_reply2 {
          h3 {
            width: 125%;
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            color: #999;
            span {
              font-size: 12px;
              line-height: 17px;
            }
          }
          p {
            line-height: 23px;
            margin: 3px 0;
            font-size: 13px;
            color: #111;
            width: 100%;
            overflow: hidden;
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
      .comment_ta2 {
        box-sizing: border-box;
        padding: 15px;
        border-bottom: 1px solid #f5f5f5;
        textarea {
          width: 100%;
          box-sizing: border-box;
          padding: 10px;
          font-size: 13px;
          margin: 0 0 15px;
          border-radius: 5px;
          border: 1px solid #bdbdbd;
          color: #333;
          overflow-y: visible;
          resize: none;
          height: 60px;
        }
        .clearfix {
          display: flex;
          justify-content: space-between;
          span {
            color: #999;
            font-size: 12px;
            line-height: 30px;
            i {
              color: #777;
              font-style: normal;
            }
          }
          .none {
            width: 80px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            background: #25c4a6;
            font-size: 13px;
            color: #fff;

            border-radius: 5px;
          }
        }
      }
    }
    .line {
      height: 7px;
      background-color: #f5f5f5;
      border-top: 1px solid #f1f1f1;
      border-bottom: 1px solid #f1f1f1;
    }
    .cm_results2 {
      padding: 0 15px;
      h1 {
        padding-top: 26px;
        font-size: 15px;
        margin-bottom: 30px;
        span {
          color: #ff6a67;
        }
      }
      .moreThis {
        li {
          padding: 16px 0 10px;
          display: flex;
          width: 100%;
          box-sizing: border-box;
          border-top: 1px solid #f5f5f5;
          &:first-child {
            border-top: none;
            padding-top: 0;
          }
          img {
            width: 28px;
            margin-right: 11px;
            border-radius: 50%;
            height: 28px;
            border: none;
          }
          .moreThis2 {
            position: relative;
            h3 {
              font-size: 12px;
              color: #999;
            }
            p {
              line-height: 23px;
              margin: 3px 0;
              font-size: 14px;
              color: #111;
              width: 100%;
              overflow: hidden;
              word-break: break-all;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            > span {
              color: #999;
              font-size: 12px;
              line-height: 19px;
            }
            .number {
              position: absolute;
              right: -45px;
              color: #999;
              font-size: 12px;
              line-height: 19px;
              i {
                background: url(../assets/img/read_icon.png) 0 -74px no-repeat;
                background-size: 25px auto;
                width: 13px;
                height: 12px;
                display: inline-block;
                position: relative;
                top: 3px;
                margin-left: 3px;
              }
            }
          }
        }
      }
    }
    .more {
      span {
        text-align: center;
        line-height: 43px;
        height: 43px;
        font-size: 12px;
        color: #999;
        background: #f8f8f8;
        display: block;
        border-top: 1px solid #eee;
      }
    }
  }
}
</style>