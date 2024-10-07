<template>
<!-- 排行榜 -->
  <div class="topic_detail">
    <!-- 头部 -->
    <div class="container">
      <div class="header">
        <div class="left">
          <a @click="goback"><i></i></a>
          {{obj.tittle}}
        </div>
        <div class="right">
          <router-link  to="/" class="home"></router-link>
          <router-link  to="/user" class="user"> </router-link>
          <router-link  to="/search" class="search"></router-link>
        </div>
      </div>

      <!-- 排行榜的分类标签 -->
      <div class="topic_label">
        <div class="label_one">
          
          <div class="label_two">
            <span  @click="clickone(item.id)" v-for="(item,index) in obj.one" :key="index"  :class="obj.oneindex === index ? 'con':''">{{item.name}}</span>
            <!-- <span >男频文创</span> -->
          </div>
        </div>

        <div class="label_one">
      
          <div class="label_two">
            <span :class="obj.twoindex === index ? 'con':''" @click="clicktwo(item.id)"  v-for="(item,index) in obj.two" :key="index">{{item.name}}</span>
            <!-- <span>完结</span>
            <span>连载</span>
            <span>3日内更新</span>
            <span>7日内更新</span> -->
          </div>
        </div>

        <div class="label_one">
       
          <div class="label_two">
            <span @click="clickthree(item.id)" :class="obj.threeindex === index ? 'con':''" v-for="(item,index) in obj.three"  :key="index">{{item.name}}</span>
            <!-- <span>30万字以下</span>
            <span>30-100万字</span>
            <span>100-200万字以上</span> -->
          </div>
        </div>
        <div class="label_default">
      
          <div class="default_two">
            <span @click="clickfour(item.id)" v-for="(item,index) in obj.four" :class="obj.fourindex === index ? 'con':''" :key="index">{{item.name}}</span>
            <!-- <span>周人气</span>
            <span>周银票</span>
            <span>最近更新</span>
            <span>最新发布</span> -->
          </div>
        </div>
      </div>
      <div class="dividerLine"></div>
      <!-- 排行榜列表 -->
      <div class="topic_item"  v-for="(item,index) in obj.topic_data" :key="index">
        <div class="topic_item_list" @click="bookjump(item.bookId,item.title)">
          <div class="img">
            <img :src="item.cover"  @error.once="useDefaultImage" alt="" />
          </div>
          <div class="topic_item_text">
            <h2>{{ item.title }}</h2>
            <p>{{ item.summary }}</p>
            <span
              >{{ item.author }}<i>&nbsp;·</i><em>{{ item.category }}</em></span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import {getsearch} from "../api/proxy/newhome.js";
import {reactive} from "vue";
import { getindex_lists } from "../api/home.js";
export default {
  setup() {

    let router = useRouter()
    // let first = ["全部","男频文创"]

    let route = useRoute()

    console.log("打印",route.query.id)

    let obj = reactive({
      one: [
        {
          name:"全部",
          id:0,
        },
        {
          name:"男频文学",
          id:1,
        },
      ],
      two:[
        {
          name:"全部",
          id:0
        },
        {
          name:"完结",
          id:1
        },
        {
          name:"连载",
          id:2
        },
        {
          name:"3日内更新",
          id:3
        },
        {
          name:"7日内更新",
          id:4
        },
   
      ],
      three:[
        {
          name:"30万字以下",
          id:0
        },
        {
          name:"30-50万字",
          id:1
        },
        {
          name:"50-100万字",
          id:2
        },
        {
          name:"100万字以上",
          id:3
        },
     
      ],
      four:[
        {
          name:"全部",
          id:0
        },
        {
          name:"完结",
          id:1
        },
        {
          name:"连载",
          id:2
        }
      ],

      tittle:route.query.id,

      index_lists1:null,


      topic_data:null,   
      oneindex:0,  //下标
      twoindex:0 , //下标
    threeindex:0 , //下标
    fourindex:0 , //下标
      
    })

    // 返回
    // 返回
    let goback=()=>{
          router.back()
      }


    // 完结与连载状态切换
    let clickfour=(e)=>{
      getsearch({bookStatus:e}).then((data)=>{
      console.log(data.data.books)
      obj.topic_data = data.data.books
      
      
    })

    obj.fourindex = e
    }


    //字数类型跳转
    let clickthree=(e)=>{
      getsearch({wordCount:e}).then((data)=>{
      console.log(data.data.books)
      obj.topic_data = data.data.books
      
      
    })

    obj.threeindex = e
    }


  

// 全部与男频文学类型切换 
   let clickone=(e)=>{
    getsearch({channel:e}).then((data)=>{
      console.log(data.data.books)
      obj.topic_data = data.data.books
      
      
    })
    obj.oneindex = e
    console.log("点击",e)
   }


  //  完结和连载时间类型切换
  let clicktwo = (e)=>{
    getsearch({sort:e}).then((data)=>{
      // console.log(data.data.books)
      obj.topic_data = data.data.books
      // console.log("Ss",obj.topic_data)
    })

    obj.twoindex = e
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







  //  获取列表数据内容
   getsearch({channel:1}).then((data)=>{
      // console.log(data.data.books)
      obj.topic_data = data.data.books
      // console.log("Ss",obj.topic_data)
    })



    //  获取加载不出的图片的数据
   getindex_lists().then((data) => {
      obj.index_lists1 = data.index_lists1;
      console.log(obj.index_lists1.taduwx);
    });


   //  图片加载失败 添加默认图片
   let useDefaultImage = (event) => {
            event.target.src = obj.index_lists1.taduwx;
        }

    return {
        goback,
        obj,
        clickone,
        clicktwo,
        clickthree,
        clickfour,
        bookjump,
        useDefaultImage
    };

    


  },
};
</script>

<style lang="scss" scoped>

@import "../assets/css/mobliebase.css";
.topic_detail {
  .dividerLine {
    background: #f5f7f9;
    height: 9px;
  }
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

  .topic_label {
    padding: 8px 0;
    background-color: #fff;
    box-sizing: border-box;
    /* padding-top: 13px; */
  }
  .topic_label .label_one {
    height: 31px;
    line-height: 31px;
    position: relative;
  }
  .topic_label .label_one > span {
    font-size: 14px;
    position: absolute;
    top: 0;
    left: 0;
    margin-left: 16px;
  }
  .topic_label .label_one .con {
    color: #953a00;
  }
  .topic_label .label_one .label_two {
    display: inline-block;
    // padding-left: 50px;
  }
  .topic_label .label_one .label_two > span {
    font-size: 14px;
    margin-left: 16px;
  }

  .topic_label .label_default {
    height: 31px;
    line-height: 31px;
    position: relative;
  }
  .topic_label .label_default > span {
    font-size: 14px;
    position: absolute;
    top: 0;
    left: 0;
    margin-left: 16px;
  }
  .topic_label .label_default .con {
    color: #953a00;
  }
  .topic_label .label_default .default_two {
    display: inline-block;
    // padding-left: 50px;
  }
  .topic_label .label_default .default_two > span {
    font-size: 14px;
    margin-left: 16px;
  }

  .topic_item {
    width: 100%;
    box-sizing: border-box;
    padding: 0 21px;
    padding-top: 16px;
    background-color: #ffff;
  }

  .topic_item_list {
    display: flex;
  }
  .topic_item .img {
    border-radius: 4px;
    overflow: hidden;
    margin-right: 8px;
  }
  .topic_item .img img {
    width: 68px;
    height: 92px;
  }

  .topic_item .topic_item_text {
    width: 78%;
  }
  .topic_item .topic_item_text h2 {
    color: #2e3033;
    font-size: 15px;
    margin-top: 2px;
  }
  .topic_item .topic_item_text p {
    color: #8a8f99;
    font-size: 13px;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 4px;
    margin-bottom: 8px;
  }

  .topic_item .topic_item_text span {
    color: #8a8f99;
    font-size: 13px;
  }
  .topic_item .topic_item_text span i {
    font-style: normal;
  }
  .topic_item .topic_item_text span em {
    font-style: normal;
  }
  .topic_item .topic_item_text span em::after {
    content: "";
    display: inline-block;
    background: url(../assets/img/grain.jfif) no-repeat center center;
    background-size: 100%;
    height: 12px;
    width: 43px;
    margin-left: 4px;
  }
}
</style>