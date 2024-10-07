<template>
  <!-- 专题 内容 -->
  <div class="subject_detail">
    <div class="container">
      <!-- 头部 -->
      <div class="header">
        <div class="left">
          <router-link to="/subject"><i></i></router-link>
          专题
        </div>
        <div class="right">
          <router-link to="/" class="home"></router-link>
          <router-link to="/user" class="user"> </router-link>
          <router-link to="/search" class="search"></router-link>
        </div>
      </div>

      <div v-if="state.imgdata">
        <a class="imgheader">
        <img :src="state.imgdata[state.index-1].img1" alt="" />
      </a>
      <a class="imgheader">
        <img :src="state.imgdata[state.index-1].img2" alt="" />
      </a>
      <a class="imgheader">
        <img :src="state.imgdata[state.index-1].img3" alt="" />
      </a>
      <a class="imgheader">
        <img :src="state.imgdata[state.index-1].img4" alt="" />
      </a>
      <a class="imgheader">
        <img :src="state.imgdata[state.index-1].img5" alt="" />
      </a>
      <a class="imgheader">
        <img :src="state.imgdata[state.index-1].img6" alt="" />
      </a>
      </div>
      

      <!-- 底部 -->
      <div class="footer">
        <div class="searchs">
          <input @click="oninput" type="text" name="" id="" placeholder="书名/作者/关键词" />
          <div class="searchsicon"></div>
        </div>
        <div class="link">
          <a href="">联系我们</a>
          <a href="">意见反馈</a>
          <a href=""
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
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { getsubject_lists } from "../api/subject.js";
import { useRoute, useRouter } from "vue-router";
// import router from "@/router";
export default {
    setup() {
        let route = useRoute();
        console.log("下标", route.query.id);
        let state = reactive({
            imgdata: null,
            index: route.query.id,
        });
        getsubject_lists().then((data) => {
            state.imgdata = data.index_img;
            console.log("ssss", state.imgdata[route.query.id - 1]);
        });


        let obj = reactive({
          input:"",
        })

        let router = useRouter()





      function  oninput(){
 

          router.push({
            path:"/search",
   
          })
          



        }


      








     

        // console.log(this.$data.yourData)


        return {
            state,
            obj,
            oninput,
        };
    },
    // components: { router }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/mobliebase.css";
@import "../assets/css/subject.css";
.subject_detail {
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
//   .right .home{
//     display: inline-block;
//     width: 54px;
//     height: 54px;
//     background-position: -16px -16px;
//     background: url(../assets/img/jingling.png) no-repeat;
//     margin: 15px 0 0 20px;
//     margin-top: 13px;
// } 

  .footer {
    box-sizing: border-box;
    padding: 0 15px;
    padding-top: 15px;
    background-color: #f5f5f5;
  }
  .footer .searchs {
    position: relative;
  }
  .footer .searchs input {
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
  input::-webkit-input-placeholder {
    color: #999;
  }
  .searchsicon {
    background: url(../assets/img/person_icon.png) 0 -165px no-repeat;
    width: 20px;
    height: 20px;
    background-size: 100%;
    position: absolute;
    top: 10px;
    right: 8px;
  }
  .footer .link {
    box-sizing: border-box;
    width: 100%;
    padding: 0 20px;
    padding-top: 18px;
    display: flex;
    margin-bottom: 14px;
  }
  .footer .link a {
    color: #999;
    font-size: 13px;
    display: inline-block;
    padding: 0 24px;
    border-right: 1px solid #999;
  }
  .footer .link a:last-of-type {
    border: none;
  }
  .footer .link2 {
    height: 22px;
    padding: 0 40px;
    padding-top: 14px;
    margin-bottom: 14px;
  }
  .footer .link2 a {
    display: inline-block;
    padding: 0 23px;
    text-align: center;
    color: #999;
    font-size: 10px;
  }
  .footer .link2 a.con {
    color: #25c4a6;
  }
  .footer .link3 {
    color: #999;
    padding: 14px 0 20px;
    font-size: 10px;
    display: block;
    text-align: center;
  }

  .imgheader {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>