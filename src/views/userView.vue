<template>
<!-- 个人中心 -->
  <div class="userView">
    <!-- 头部 -->
    <div class="container">
      <div class="header">
        <div class="left">
          <router-link  to="/" href="./index.html"
            ><i></i
          ></router-link>
          个人中心
        </div>
        <div class="right">
          <router-link  to="/home" class="home"></router-link>
          <router-link  to="/user" class="user"> </router-link>
          <router-link  to="/search" class="search"></router-link>
        </div>
      </div>
      <!-- 头像页面 -->
      <div class="profile_photo">
        <div class="profile_photos">
          <div class="img">
            <img src="../assets/img/shuping_mokey.png" alt="" />
          </div>
          <div class="profile_photo_name">td185220793</div>
        </div>
      </div>
      <!-- 个人中心列表页 -->
      <div class="user_lists">
        <router-link to="/Readrecord"  class="recent_reading">
          <span class="recent_reading_list"> 最近阅读 </span>
          <i></i>
        </router-link>
        <!-- 我的书架 -->
        <router-link to="/mybook"  class="my_book">
          <span class="recent_reading_list"> 我的书架 </span>
          <i></i>
        </router-link>
        <div class="setfenge"></div>
        <div class="user_agreement">
          <span class="recent_reading_list"> 用户协议 </span>
          <i></i>
        </div>

        <span class="privacy_agreement">
          <span class="recent_reading_list"> 隐私协议 </span>
          <i></i>
        </span>
        <div class="setfenge"></div>
        <div class="log_out" @click="exitlogon">
          <span class="recent_reading_list"> 退出登录 </span>
          <i></i>
        </div>
      </div>
      <!-- 底部广告 -->
      <div class="advert" v-show="advert_show"> 
        <img src="../assets/img/gg2.png" alt="">
        <div class="xbtn" @click="close()"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
  setup() {
    let router = useRouter()




    let exitlogon = ()=>{
      window.localStorage.removeItem("userdata");
      router.push("/")
    }

    return{
      exitlogon,
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../assets/css/mobliebase.css";
.userView {
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

  .profile_photo {
    background: url(../assets/img/center_header2.jpg) no-repeat;

    background-size: 100%;
    padding: 2px 20px 0 15px;
    height: 102px;
    .profile_photos {
      display: flex;

      line-height: 75px;

      .img {
        width: 67px;
        height: 67px;
        border-radius: 50%;
        overflow: hidden;

        margin: 5px 14px 0 0;
      }
      .profile_photo_name {
        color: #fff;
        font-size: 17px;
      }
    }
  }
  .user_lists {
    .setfenge {
      height: 6px;
      background-color: #f5f5f5;
    }
    .recent_reading {
      background-color: #fff;
      border-top: 1px solid #e7e7e7;
      border-bottom: 1px solid #f1f1f1;
      padding: 0 15px;
      display: flex;
      justify-content: space-between;
      height: 55px;
      color: #000;

      .recent_reading_list {
        margin-top: 18px;
        font-size: 16px;
        &::before {
          content: "";
          display: inline-block;
          width: 22px;
          height: 23px;
          background: url(../assets/img/home.png) no-repeat;
          background-size: 900%;
          vertical-align: middle;
          margin-right: 18px;
        }
      }
      i {
        width: 7px;
        height: 14px;
        background: url(../assets/img/arrow_right_b.png) 100% no-repeat;

        margin-top: 22px;
      }
    }
    .my_book {
      background-color: #fff;
      color: #000;
      border-bottom: 1px solid #f1f1f1;
      padding: 0 15px;
      display: flex;
      justify-content: space-between;
      height: 55px;

      .recent_reading_list {
        margin-top: 18px;
        font-size: 16px;
        &::before {
          content: "";
          display: inline-block;
          width: 22px;
          height: 22px;
          background: url(../assets/img/home.png) -26px 0 no-repeat;
          background-size: 900%;
          vertical-align: -3px;
          margin-right: 18px;
        }
      }
      i {
        width: 7px;
        height: 14px;
        background: url(../assets/img/arrow_right_b.png) 100% no-repeat;

        margin-top: 22px;
      }
    }
    .user_agreement {
      background-color: #fff;

      border-bottom: 1px solid #f1f1f1;
      padding: 0 15px;
      display: flex;
      justify-content: space-between;
      height: 55px;

      .recent_reading_list {
        margin-top: 18px;
        font-size: 16px;
        &::before {
          content: "";
          display: inline-block;
          width: 22px;
          height: 22px;
          background: url(../assets/img/center_task-2.png) no-repeat;
          background-size: 100%;
          vertical-align: -4px;
          margin-right: 18px;
        }
      }
      i {
        width: 7px;
        height: 14px;
        background: url(../assets/img/arrow_right_b.png) 100% no-repeat;

        margin-top: 22px;
      }
    }
    .privacy_agreement {
      background-color: #fff;

      border-bottom: 1px solid #f1f1f1;
      padding: 0 15px;
      display: flex;
      justify-content: space-between;
      height: 55px;

      .recent_reading_list {
        margin-top: 18px;
        font-size: 16px;
        &::before {
          content: "";
          display: inline-block;
          width: 22px;
          height: 22px;
          background: url(../assets/img/center_bar.png) no-repeat;
          background-size: 100%;
          vertical-align: -4px;
          margin-right: 18px;
        }
      }
      i {
        width: 7px;
        height: 14px;
        background: url(../assets/img/arrow_right_b.png) 100% no-repeat;

        margin-top: 22px;
      }
    }
    .log_out {
      background-color: #fff;

      border-bottom: 1px solid #f1f1f1;
      padding: 0 15px;
      display: flex;
      justify-content: space-between;
      height: 55px;

      .recent_reading_list {
        margin-top: 18px;
        font-size: 16px;
        &::before {
          content: "";
          display: inline-block;
          width: 22px;
          height: 22px;
          background: url(../assets/img/home.png) -156px 0 no-repeat;
          background-size: 900%;
          vertical-align: -5px;
          margin-right: 18px;
        }
      }
      i {
        width: 7px;
        height: 14px;
        background: url(../assets/img/arrow_right_b.png) 100% no-repeat;

        margin-top: 22px;
      }
    }
  }
  .advert{
    position: absolute;
    bottom: 0px;
    left: 0;
    right: 0;
    .xbtn{
      width: 10px;
      height: 10px;
  
       position: absolute;
        top: 32px;
    z-index: 5;
    right: 17px;
    }
  }
}
</style>