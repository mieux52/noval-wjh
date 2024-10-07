<template>
  <!-- 搜索页 -->
  <div class="searchView">
    <div class="container">
      <!-- 头部 -->
      <div class="header">
        <div class="left">
          <router-link to="/" href="./index.html"><i></i></router-link>
          搜索
        </div>
        <div class="right">
          <router-link to="/" class="home"></router-link>
          <router-link to="/user" class="user"> </router-link>
          <router-link to="/search" class="search"></router-link>
        </div>
      </div>
      <!-- 搜索框 -->
      <div class="searchtext">
        <div class="searchcontent">
          <input
            type="text"
            placeholder="书名/作者/关键词"
            @blur="onblur"
            @keyup.enter="valueinput"
            @focus="onfocus"
            v-model="state.inputvalue"
          />
          <i @click="searchicon" class="searchicon"></i>
        </div>

        <!-- 历史记录 -->
        <div class="inputbox" ref="box" v-if="state.historytext.length">
          <div class="Historybox">
            <div
              @mousedown="HistoryClick(item)"
              class="textbox"
              v-for="(item, index) in state.historytext"
              :key="index"
            >
              <div class="left">
                <svg
                  t="1669997579724"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3753"
                  width="999999"
                  height="999999"
                >
                  <path
                    d="M511.998 64C264.574 64 64 264.574 64 511.998S264.574 960 511.998 960 960 759.422 960 511.998 759.422 64 511.998 64z m353.851 597.438c-82.215 194.648-306.657 285.794-501.306 203.579S78.749 558.36 160.964 363.711 467.621 77.917 662.27 160.132c168.009 70.963 262.57 250.652 225.926 429.313a383.995 383.995 0 0 1-22.347 71.993z"
                    fill="#999999"
                    p-id="3754"
                  ></path>
                  <path
                    d="M543.311 498.639V256.121c0-17.657-14.314-31.97-31.97-31.97s-31.97 14.314-31.97 31.97v269.005l201.481 201.481c12.485 12.485 32.728 12.485 45.213 0s12.485-32.728 0-45.213L543.311 498.639z"
                    fill="#999999"
                    p-id="3755"
                  ></path>
                </svg>
                <span>{{ item }}</span>
              </div>
              <div class="right" @mousedown="del(index)">
                <svg
                  t="1669997416911"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2678"
                  width="999999"
                  height="999999"
                >
                  <path
                    d="M912.526651 867.741144 555.540144 510.712681l356.986507-357.000833c11.171434-11.18576 11.171434-29.257348 0-40.443108-11.20111-11.18576-29.272697-11.18576-40.444131 0L515.096013 470.267527 158.096203 113.267716c-11.187807-11.159154-29.258371-11.159154-40.444131 0-11.186783 11.186783-11.186783 29.286 0 40.47176L474.623229 510.712681 117.623419 867.741144c-11.159154 11.172457-11.159154 29.216415 0 40.443108 11.18576 11.17348 29.284977 11.17348 40.47176 0l357.000833-357.027439 356.985484 357.027439c11.171434 11.17348 29.243021 11.17348 40.444131 0C923.698085 896.957559 923.725714 878.913601 912.526651 867.741144z"
                    p-id="2679"
                    fill="#999999"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 热门搜索，搜素后替换的部分 -->
      <div class="hotsearch" v-if="!state.searchlist">
        <h2>热门搜索</h2>
        <div class="search_text">
          <!-- <router-link  :to="'/detail?id=' + state.data[0].id"
            >爹地，大佬妈咪掉马了</router-link
          > -->
          <a
            @click="hotsearchlist(item.name)"
            v-for="(item, index) in state.hotlists"
            :key="index"
            >{{ item.name }}</a
          >
          <!-- <a>我在绝地求生捡碎片</a>
          <a>仙武帝尊</a>
          <a>团宠公主三岁半</a> -->
        </div>
      </div>
      <!-- 搜索结果 -->
      <div class="searchresult">
        <h2 v-if="state.searchlist">
          共<span>{{ state.lengthlist }}</span
          >条搜索结果...
        </h2>
        <div class="searchresult_both">
          <div class="re_none" v-show=" !state.lengthlist.length ==0">
            <img src="../assets/img/no-results.png" />
            <span>未找到相关的书籍!</span>
          </div>
          <div
            @click="bookjump(item.bookId, item.title)"
            class="searchresult_list"
            v-for="(item, index) in state.searchlist"
            :key="index"
          >
            <div class="img">
              <img :src="item.cover" alt="" />
            </div>
            <div class="search_text">
              <h2>{{ item.title }}</h2>
              <span>{{ item.author }} <i>|</i> {{ item.category }}</span>
              <p>
                {{ item.summary }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { getdetail_lists } from "../api/detail.js";
import { useRoute, useRouter } from "vue-router";
import { getHotsearch, getsearch } from "../api/proxy/newhome.js";
import { ref, onMounted } from "vue";


export default {
  setup() {
    const route = useRoute();
    console.log("传值", route.query.text);

    let oninput = reactive({
      value: "",
    });


    let router =useRouter()



    //搜索事件
    let searchicon = () =>{
      getsearch({ keyword:state.inputvalue }).then((data)=>{
        console.log(data)
        state.searchlist = data.data.books
        state.lengthlist= state.searchlist.length
      })

      let history = JSON.parse(window.localStorage.getItem("history"))
      
      let lists =  history.includes(state.inputvalue)

      if(history){
        if(!lists){
          history.push(state.inputvalue)
          window.localStorage.setItem(("history"),JSON.stringify(history))
        }
       
      }
      else{
        let arr = []
        arr.push(state.inputvalue)
        window.localStorage.setItem(("history"),JSON.stringify(arr))
      }

      state.historytext = JSON.parse(window.localStorage.getItem("history"))
      
    };



    // 删除历史记录
    let del = (event) => {
      console.log("位置", event);
      state.historytext.splice(event, 1);
      window.localStorage.setItem("history", JSON.stringify(state.historytext));
    };

    //书本跳转
    let bookjump = (id, name) => {
      console.log(id, name);
      router.push({
        path: "/detail",
        query: {
          id: id,
          name: name,
        },
      });
    };

    // 热门点击事件
    let hotsearchlist = (event) => {
      state.inputvalue = event;
      getsearch({ keyword: event }).then((data) => {
        console.log(data);
        state.searchlist = data.data.books;
        // console.log("state", state.searchlist);
        state.lengthlist = state.searchlist.length;
      });
      console.log("ssss", event);
    };

    // 历史点击事件
    let HistoryClick = (event) => {
      // state.inputvalue = event;
      getsearch({ keyword: event }).then((data) => {
        console.log(data);
        state.searchlist = data.data.books;
        // console.log("state", state.searchlist);
        state.lengthlist = state.searchlist.length;
      });
      console.log("ssss", event);
    };

    // let clickOther =()=>{
    //   box.value.style.display = "none";
    // }

    // 失去焦点时触发
    let onblur = () => {
      box.value.style.display = "none";
    };

    // 获取标签元素的节点
    let box = ref(null);
    onMounted(() => {
      console.log(box.value);
    });

    // 获得焦点时触发
    let onfocus = () => {
      box.value.style.display = "block";
    };

    let state = reactive({
      data: null,
      value: null,
      hotlists: null, //热门
      searchlist: null, //搜索列表
      lengthlist: 0, //搜索列表长度
      historylist: [], //存入历史缓存数组
      historytext: null, //历史记录
      inputvalue: null,  
    });

    getdetail_lists().then((data) => {
      state.data = data.detail_lists1;
    });

    // 热门搜索
    let getHot = getHotsearch().then((data) => {
      console.log("热门", data.list);
      state.hotlists = data.list;
      console.log("ssss", state.hotlists);
    });

    // 搜索

    // 输入框事件
    function valueinput(Event) {
      // console.log(Event)
      oninput.value = Event.target.value;
      getsearch({ keyword: oninput.value }).then((data) => {
        console.log(data);
        state.searchlist = data.data.books;
        // console.log("state", state.searchlist);
        state.lengthlist = state.searchlist.length;
        // console.log("liss", state.lengthlist);

        // state.historylist.push(oninput.value);

        // console.log("ttt", state.historylist);
        // console.log("sss", oninput.value);
        // window.localStorage.setItem("history",JSON.stringify( state.historylist));
        // state.historytext = JSON.parse(window.localStorage.getItem("history"));
        // console.log("ttttt", state.historytext);
      });
      let history = JSON.parse(window.localStorage.getItem("history"));
      if (history) {
        let num = history.includes(oninput.value);
        if (!num) {
          history.push(oninput.value);
        }
        window.localStorage.setItem("history", JSON.stringify(history));
        state.historytext = JSON.parse(window.localStorage.getItem("history"));
      } else {
        let arr = [];
        arr.push(oninput.value);
        window.localStorage.setItem("history", JSON.stringify(arr));
      }
    }

    state.historytext = JSON.parse(window.localStorage.getItem("history"));

    if(!state.historytext){
      state.historytext = []
    }

    return {
      state,
      oninput,
      getHot,
      valueinput,
      onblur,
      onfocus,
      box,
      del,
      HistoryClick,
      hotsearchlist,
      // clickOther,
      bookjump,
      searchicon,
    };
  },

  // mounted() {
  //   window.addEventListener("click", this.clickOther);
  // },
  // // Unmounted() {
  // //   window.removeEventListener("scroll", this.handleScroll);
  // // },

  // beforeUnmount() {
  //   // 移除事件监听
  //   window.removeEventListener("click", this.clickOther);
  // },
};
</script>
<style lang="scss" scoped>
@import "../assets/css/mobliebase.css";
body {
  background-color: #fff;
}
.searchView {
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

  .searchtext {
    position: relative;
    .inputbox {
      display: none;
      position: absolute;
      padding-top: 2px;
      width: 91%;
      left: 16px;

      .Historybox {
        background-color: #fff;
        padding: 4px 0px;
        border: 1px solid #cfcfcf;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        .textbox {
          &:last-child {
            border: none;
          }
          display: flex;
          justify-content: space-between;
          border-bottom: 2px solid #f7f7f7;
          align-items: baseline;
          padding: 4px 8px;
          .left {
            display: flex;
            align-items: center;
            .icon {
              width: 12px;
              height: 12px;
            }
            span {
              margin-left: 4px;
              font-size: 13px;
              color: #999999;
            }
          }

          .right {
            .icon {
              width: 12px;
              height: 12px;
            }
          }
        }
      }
    }

    width: 100%;
    box-sizing: border-box;
    background: #f5f5f5;
    padding: 15px 15px;
    .searchcontent {
      width: 100%;
      display: flex;
      border-radius: 4px;
      border: 1px solid #cccccc;
      height: 38px;
      background-color: #ffff;
      padding: 0 10px;
      padding-right: 8px;
      box-sizing: border-box;
      justify-content: space-between;
      position: relative;
      input {
        outline: 0;
        width: 80%;
        font-size: 15px;
        border: none;
      }
      input::placeholder {
        color: #eae5e3;
      }
      .searchicon {
        margin-top: 11px;
        background: url(../assets/img/person_icon.png) no-repeat 0 -144px;
        width: 20px;
        height: 20px;
        background-size: 100%;
      }
    }
    .searchhistroy {
      z-index: 5;

      position: absolute;
      top: 38px;
      left: 0;
      width: 100%;
      border: 1px solid #bfbfbf;
      background-color: #ffff;
      border-radius: 4px;
      box-sizing: border-box;
    }
  }
  .searchhistroy {
    ul {
      li {
        a {
          display: inline-block;
          box-sizing: border-box;
          width: 100%;
          padding-left: 10px;
          color: #999;
          font-size: 12px;
          height: 34px;
          line-height: 34px;
          border-bottom: 1px solid #f3f3f3;
          &::before {
            content: "";
            display: inline-block;
            width: 10px;
            height: 10px;
            background: url(../assets/img/person_icon.png) no-repeat 0 -200px;
            background-size: 200%;
            margin-right: 2px;
          }
        }
      }
    }
  }
  .hotsearch {
    padding: 10px 15px 12px;
    h2 {
      font-size: 16px;
      background: #fff;
    }
    .search_text {
      padding-top: 12px;
      a {
        font-size: 13px;
        color: #000;
        padding: 0 12px;
        height: 31px;
        line-height: 29px;
        display: inline-block;
        border: 1px solid #e2e2e2;
        margin: 0 13px 10px 0;
        border-radius: 5px;
      }
    }
  }
  .searchresult {
    .searchresult_both {
      .re_none {
        text-align: center;
        margin-top: 60px;
        img {
          width: 40px;
          margin-top: 10px;
          display: inline-block;
        }
        span {
          display: block;
          color: #b8b8b8;
          font-size: 12px;
          margin: 5px 0 2px;
        }
      }
    }
    & > h2 {
      padding: 0px 15px;
      padding-top: 12px;
      font-size: 14px;
      margin-bottom: 3px;
      span {
        color: #ff6a67;
      }
    }
  }
  .searchresult_list {
    display: flex;
    box-sizing: border-box;
    padding: 10px 15px;
    border-bottom: 1px solid #f6f6f6;
    .img {
      width: 69px;
      height: 95px;
      margin-right: 15px;
      img {
        box-sizing: border-box;
        border: 1px solid #eee;
        height: 100%;
      }
    }
    .search_text {
      width: 76%;
      h2 {
        color: #333;
        font-size: 15px;
        margin-top: 2px;
        margin-bottom: 2px;
      }
      span {
        color: #999;
        margin: 3px 0;
        font-size: 13px;
        display: inline-block;
        i {
          color: #999;
          padding: 0 11px;
          font-size: 13px;
          font-style: normal;
        }
      }
      p {
        font-size: 13px;
        color: #999;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 19px;
      }
    }
  }
}
</style>