<template>
  <!-- 首页 -->
  <div class="back" v-cloak>
    
    
    <div class="container">
      <keep-alive>
        <TopComponents />
      </keep-alive>
      <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <!-- 轮播图 -->
      <div class="index_content">
        <div class="img">
          <img
            v-if="state.index_lists1"
            :src="state.index_lists1.firstimg"
            alt=""
          />
        </div>
        <!-- 广告 -->
        <!-- <div class="text">
          <van-swipe
            style="height: 18px"
            vertical
            :show-indicators="false"
            :loop="true"
            :autoplay="2000"
          >
            <van-swipe-item
              ><a href=""
                >【公告】【通知】塔读文学编辑部启用企业QQ</a
              ></van-swipe-item
            >
            <van-swipe-item
              ><a href=""
                >【惊喜】【京东】帮你专业挑选合适的美妆工具</a
              ></van-swipe-item
            >
            <van-swipe-item
              ><a href=""
                >买好物来【京东】健康新势力【新品】不止6折</a
              ></van-swipe-item
            >
            <van-swipe-item
              ><a href=""
                >【京东】健康好物 购实在 海量优惠等你来</a
              ></van-swipe-item
            >
          </van-swipe>
        </div> -->
      </div>
      <!-- 主编推荐 -->
      <div class="list">
        <div class="titles">主编推荐</div>
        <router-link
          :to="'/detail?id='+state.recommend[0].id+'&name='+state.recommend[0].title"
          class="list_first"
          v-if="state.recommend.length != 0"
        >
          <div class="img">
            <img :src="state.recommend[0].cover " alt="" />
          </div>
          <div class="list_text">
            <h2>{{ state.recommend[0].title }}</h2>
            <p v-html="state.recommend[0].content" class="list_text_p"></p>
            <div class="text_bottom">
              <span>{{ state.recommend[0].author }}</span> 
              <i> ·  {{ state.recommend[0].category }}</i> 
            </div>
          </div>
        </router-link>

        <div class="list_second" v-if="state.recommend.length != 0">
          <router-link
            :to="'/detail?id='+ item.id +'&name='+item.title"
            class="list_item"
            v-for="item in state.recommend.slice(1,5)"
            :key="item.id"
          >
            <div class="img">
              <img :src="item.cover "  @error.once="useDefaultImage" alt="" />
            </div>
            <div class="book_title">{{ item.title }}</div>
            <span class="author">
              {{ item.author }}
            </span>
          </router-link>
        </div>
        
      </div>

      <!-- 精品推荐 -->
      <div class="list">
        <div class="titles">精品推荐</div>
        <div class="list_second" v-if="state.recommend.length != 0">
          <div
            class="list_item"
            v-for="item in state.recommend.slice(5,9)"
            :key="item.id"
            @click="godetail(item.id,item.title)"
          >
            <div class="img">
              <img :src="item.cover" @error.once="useDefaultImage"  alt="" />
            </div>
            <div class="book_title">{{ item.title }}</div>
            <span class="author">
              {{ item.author }}
            </span>
          </div>
        </div>
        <div class="list_second" v-if="state.recommend.length != 0">
          <div
            class="list_item"
            v-for="item in state.recommend.slice(9,13)"
            :key="item.id"
             @click="godetail(item.id,item.title)"
          >
            <div class="img">
              <img :src="item.cover" @error.once="useDefaultImage"  alt="" />
            </div>
            <div class="book_title">{{ item.title }}</div>
            <span class="author">
              {{ item.author }}
            </span>
          </div>
        </div>
      </div>

      <!-- 新书优选 -->
      <div class="list">
        <div class="titles">新书优选</div>
        <div
          class="newbook"
        >
          <div class="newbook_item" v-for="data in state.recommend.slice(10,20)" :key="data.id"  @click="godetail(data.id,data.title)">
            <div class="img"><img :src="data.cover" @error.once="useDefaultImage"  alt="" /></div>

            <div class="newbook_text">
              <p>{{ data.title }}</p>
              <span>{{ data.author }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 完本精选 -->
      <div class="list cons">
        <div class="titles">完本精选</div>
        <div class="list_second">
          <div
            class="list_item"
            v-for="item in state.recommend.slice(12,16)"
            :key="item.id"
             @click="godetail(item.id,item.title)"
          >
            <div class="img">
              <img :src="item.cover" @error.once="useDefaultImage"  alt="" />
            </div>
            <div class="book_title">{{ item.title }}</div>
            <span class="author"> {{ item.author }} </span>
          </div>
        </div>
      </div>

      <!-- 尾部 -->
      <div class="index_footer">
        <div class="footer_first">
          <a @click="gotop()"
            >回到顶部
            <i></i>
          </a>
        </div>
        <div class="footer_last">
          <div>
            京ICP证080655号
            <a href="">京ICP备09017823号-5</a>
          </div>
          <div>
            <a href="">京公网安备 11010202003943号</a>
          </div>
          <div>
            Copyright(C) 2008-2022 www.tadu.com All Rights Reserved 版权所有
            北京易天新动网络科技有限公司 塔读小说版权所有， 未经许可不得转载
          </div>
        </div>
      </div>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import TopComponents from "../components/TopComponents.vue";
import { getindex_lists } from "../api/home.js";
import { getnewhome } from "../api/proxy/newhome"
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { Toast } from 'vant';
export default {
  components: {
    TopComponents,
  },
  setup() {
    let state = reactive({
      index_lists1: null,
      recommend:[],// 主编推荐 
    });

    let router = useRouter();
    console.log(router);

    // 获取加载不出来的图片的数据
    getindex_lists().then((data) => {
      state.index_lists1 = data.index_lists1;
      console.log("图片",state.index_lists1.taduwx);
    });


// 获取书单数据
    getnewhome().then(data=>{
      console.log("数据",data);
      if(data){    //当有数据的时候，用接口的数据
        state.recommend = data.list
        window.localStorage.setItem("addrecommend",JSON.stringify(data.list)) //存到缓存中
      }else{
        state.recommend = JSON.parse(window.localStorage.getItem("addrecommend"))  //当获取不了数据，用之前缓存到数据
      }
      
      console.log("数据的长度", state.recommend.length);
    })
   
  //  图片加载失败 添加默认图片
    let useDefaultImage = (event) => {
            event.target.src = state.index_lists1.taduwx;
        }

        // 回到顶部
    let gotop = ()=>{
      window.scrollTo(0,0)
    }
    // 跳转详情
    let godetail = (id,title)=>{
      router.push({
        path:"/detail",
        query:{
          id:id,       //传入对应的书本的id
          name:title    //传入对应的书本的标题
        }
      })
    }


    // 刷新效果，用vant组件
    const loading = ref(false);
    const onRefresh = () => {
      setTimeout(() => {
        Toast('刷新成功');
        loading.value = false;
      }, 1000);
    };

    return {
      state,
      loading,
      useDefaultImage,
      gotop,
      godetail,
      onRefresh
    };
  },


};
</script>

<style lang="scss" scoped>
@import "../assets/css/mobliebase.css";
@import "../assets/css/index.css";
[v-cloak] {
  display: none;
}
.back {
  .footer_first {
    justify-content: center;
  }
}
</style>