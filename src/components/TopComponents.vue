<template>
  <div class="indexHeader">
    <!-- 头部 -->
    <div class="header">
      <div class="logo">
        <!-- <img src="../assets/img/logo.png" alt="" /> -->
        <span>八猪小说</span>
      </div>
      <div class="right">
        <router-link to="/user" href="" class="home"></router-link>
        <router-link to="/search" href="" class="search"></router-link>
        <router-link to="/mybook" href="" class="book"></router-link>
      </div>
    </div>
    <!-- 导航栏 -->
    <div class="nav">
      <div class="nav-item">
        <router-link active-class="con_nav" to="/" href=""
          >首页
          <div class="line"></div>
        </router-link>
        <!-- <router-link active-class="con_nav" to="/girl" href=""
          >女生
          <div class="line"></div>
        </router-link> -->
        <router-link active-class="con_nav" to="/classify" href=""
          >分类
          <div class="line"></div>
        </router-link>
        <router-link active-class="con_nav" to="/Ranking" href=""
          >排行
          <div class="line"></div>
        </router-link>
        <!-- <router-link active-class="con_nav" to="/subject" href=""
          >专题
          <div class="line"></div>
        </router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {

  },
};
</script>

<style lang="scss" >
.indexHeader {
  .header {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 16px 19px 9px 16px;
    .logo {
      width: 125px;
      img {
        width: 100%;
      }

      span{
        color: red;
        font-weight: bold;
      }
    }
    .right {
      box-sizing: border-box;
    }
  }
  .right {
    .home {
      display: inline-block;
      background: url(../assets/img/jingling.png) no-repeat;
      background-size: 83px;
      width: 23px;
      height: 20px;
      background-position: -36px -6px;
      margin: 2px 0 0 15px;
    }
    .book {
      display: inline-block;
      background: url(../assets/img/jingling.png) no-repeat;
      background-size: 83px;
      width: 22px;
      height: 20px;
      background-position: -5px -38px;
      margin: 2px 0 0 20px;
    }
    .search {
      display: inline-block;
      background: url(../assets/img/jingling.png) no-repeat;
      background-size: 83px;
      width: 21px;
      height: 20px;
      background-position: -36px -38px;
      margin: 2px 0 0 20px;
    }
  }
  .nav {
    padding: 13px 19px 8px 16px;
    position: relative;
    background-color: #fff;
    border-bottom: 0.8px solid rgba(204, 212, 227, 0.5);
    .nav-item {
      display: flex;
      justify-content: space-between;
      a {
        display: block;
        color: #8a8f99;
        font-size: 16px;
        position: relative;
        &.con_nav {
          box-sizing: border-box;
          color: #2e3033;
          font-size: 18px;
          top: -1px;
          .line {
            background-color: #ffd338;
          }
        }
      }
    }
    .line {
      width: 21px;
      height: 4px;
      background-color: transparent;
      border-radius: 10px;
      position: absolute;
      left: 8px;
      top: 30px;
    }
  }
}
</style>
