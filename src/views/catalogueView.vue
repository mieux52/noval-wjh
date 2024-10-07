<template>
  <!-- 章节目录 -->
  <div>
    <!-- 头部 -->
    <div class="header">
      <div class="left">
        <a @click="addback"><i></i></a>
      </div>
      <div class="right">
        <router-link to="/" class="home"></router-link>
        <router-link to="/user" class="user"> </router-link>
        <router-link to="/search" class="search"></router-link>
      </div>
    </div>
    <!-- 目录 -->
    <div class="lists" v-if="state.listdata">
      <!-- 下拉菜单 -->
      <div class="menu">
        <div class="menuname" @click="addmenuname" >
          <span>
            {{state.start || 1}}-{{state.end>state.listlength ? state.listlength:state.end}}章
            <i></i>
          </span>
          <ul class="menulist" v-show="state.menulist" v-if="state.yeaoverno">
            <li v-for="item in Math.ceil(state.listlength/100)" :key="item" :class="state.classdata == item ?'con':'' " @click="addmenulist(item)">
                  {{item*100-99}}-{{item*100>state.listlength ? state.listlength:item*100}}章
            </li>

          </ul>
          <ul  class="menulist" v-show="state.menulist" v-if="!state.yeaoverno">
              <li  v-for="item in Math.ceil(state.listlength/100)" :key="item" :class="state.classdata == item ?'con':'' " @click="addmenulist(item)">
                    {{item == 1 ? state.listlength:state.listlength-(item-1)*100-1}}-{{state.listlength-item*100 > 0 ? state.listlength-item*100: 1}}章
              </li>
          </ul>
        </div>
        <div class="sort" >
          <span @click="addsort" ref="sorttext" >
            倒序
          </span>
          <i></i>
        </div>
      </div>
      <!-- 目录列表 -->
      <ul class="listings" v-if="state.yeaoverno">
        <li v-for="(item,index) in state.listdata.slice(state.start == 1 ? 0:state.start,state.end+1) " :key="index" :class="state.numid == item.secId ?'colo':''" @click="jumpread(item.secId)" >
            {{item.title}}
        </li> 
      </ul>
      <ul class="listings" v-if="!state.yeaoverno">
        <li v-for="(item,index) in state.listdata.slice(state.end,state.start+1).reverse() " :key="index" @click="jumpread(item.secId)" >
            {{item.title}}
        </li>
      </ul>
      <!-- 分页 -->
      <div class="paging">
        <van-pagination v-model="state.classdata" :page-count="Math.ceil(state.listlength/100)" mode="simple" @change="addpaging">
          <template #prev-text>
            <div class="page">上一页</div>
          </template>
          <template #next-text>
            <div class="page">下一页</div>
          </template>
        </van-pagination>
      </div>

      <!-- 底部 -->
      <div class="footer">
        <div class="searchs">
          <input type="text" name="" id="" placeholder="书名/作者/关键词" />
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
import { reactive,ref } from "@vue/reactivity";
import { getchapter } from "../api/proxy/newhome";
import { useRouter,useRoute } from 'vue-router';
import { Toast } from "vant"

export default {
  setup() {
    let state = reactive({
      listdata: null,// 章节目录
      listlength:null,// 数据长度
      start:0,// 开始
      end:100,// 结束
      classdata:1, 
      menulist:false,
      yeaoverno:true,
      numid:null,// 阅读页面
      bookid:null,//书籍id
    });
    const loading = ref(false);
    const onRefresh = () => {
      console.log(loading.value);
      setTimeout(() => {
        Toast('刷新成功');
        loading.value = false;
        console.log(loading.value);
      }, 1000);
    };

    let router = useRouter();
    let route = useRoute();
    console.log(route.query);
    console.log(router)
    state.bookid = route.query.id
    if(route.query.num){
      state.numid = route.query.num
    }
    

    // 章节数据
    getchapter(route.query.id).then((data) => {
      console.log(data.data);
      if (data) {
        state.listdata = data.data.catalog;
        window.localStorage.setItem(
          "addchapter",JSON.stringify(data.data.catalog)
        );
      } else {
        state.listdata = JSON.parse(
          window.localStorage.getItem("addchapter")
        );
      }
      state.listlength = state.listdata.length - 1,
      console.log(state.listdata);
    });

    // 章节目录列表选择是否显示
    let addmenuname = ()=>{
      state.menulist = !state.menulist
    }
    // 章节目录列 遍历
    let addmenulist = (item)=>{
      state.classdata = item;
      if(state.yeaoverno){
        state.end = item * 100;
        state.start = item * 100 - 99;
      }else{
        if(item == 1){
          state.start =state.listlength;
          state.end = state.listlength - item*100;
        }else{
          state.start =state.listlength-(item-1)*100-1;
          state.end = state.listlength - item*100;
        }
        
      }
    }
    // 上一页 下一页 点击事件
    let addpaging = ()=>{
      if(state.yeaoverno){
        state.end = state.classdata * 100;
        state.start = state.classdata * 100 - 99;
        let num = state.listlength % 100;
        if(state.end>state.listlength){
          state.end = state.listlength 
        }
        if(state.start>state.listlength){
          state.start = state.listlength - num 
        }
      }else{
        if(state.classdata == 1){
          state.start = state.listlength;
          state.end = state.listlength - state.classdata*100;
        }else{
          state.start =state.listlength-(state.classdata-1)*100-1;
          state.end = state.listlength - state.classdata*100;
        }
      }
    }
    // 返回上一页
    let addback = ()=>{
      router.back(); 
    }

    const sorttext = ref(null)
    console.log("获取DOM节点",sorttext)

    
     //不能放在外面，也就是不能放在setup钩子里面,否则报错，因为执行函数是从上到下执行，页面还没渲染完成，所以打印不了
    // console.dir("该DOM节点的内容",sorttext.value.innerHTML); 
    
   

    // 倒序 正序 切换
    let addsort = ()=>{
      console.dir("该DOM节点的内容",sorttext.value.innerHTML);  
      if(sorttext.value.innerText == "倒序"){
        sorttext.value.innerText= "正序";
        state.yeaoverno = false;
        addmenulist(1)
        console.log(1);
      }else{
        sorttext.value.innerText = "倒序";
        state.yeaoverno = true;
        addmenulist(1)
      }

    }

    let jumpread = (itemid)=>{
        router.push({
          path: "/reads",
          query: { id:state.bookid, listid:itemid},
        });
    }
    
    

    return {
      state,
      loading,
      sorttext,
      addback,
      addmenuname,
      addmenulist,
      addpaging,
      onRefresh,
      addsort,
      jumpread

    };
  
  },
 
};
</script>

<style lang="scss" scoped>
.lists {
  width: 100%;
  .menu {
    height: 45px;
    border-bottom: 1px solid #25c4a6;
    padding-left: 15px;
    display: flex;
    justify-content: space-between;
    line-height: 45px;
    color: #25c4a6;
    .menuname {
      width: 88px;
      font-size: 14px;
      position: relative;
      span {
        position: relative;
        i {
          width: 12px;
          height: 6px;
          background: url(../assets/img/home.png) -188px 0 no-repeat;
          background-size: 200px auto;
          position: absolute;
          right: -18px;
          top: 50%;
          margin-top: -3px;
        }
      }
      .menulist {
        position: absolute;
        left: 10px;
        background-color: #fff;
        box-shadow: 0 1px 5px 0px #313131;
        li{
          width: 88px;
          border: 1px solid rgb(236, 235, 235);
        }
        li.con{
          width: 88px;
          background-color: #767676;
          color:#fff;
        }
      }
    }
    .sort {
      font-size: 13px;
      position: relative;
      padding-right: 30px;
      i {
        width: 10px;
        height: 12px;
        position: absolute;
        right: 15px;
        top: 50%;
        margin-top: -6px;
        background: url(../assets/img/catalog_sort.png) no-repeat;
        background-size: 20px auto;
      }
    }
  }
  .listings {
    padding-left: 15px;
    color: #000;
    line-height: 52px;
    font-size: 14px;
    .colo{
      color: #25c4a6;
    }
  }

  .paging {
    padding: 15px;
    .page {
      height: 35px;
      line-height: 35px;
      border-radius: 17px;
      background-color: #25c4a6;
      color: #fff;
    }
    .van-pagination {
      --van-pagination-height: 35px;
      --van-pagination-item-default-color: #fff;
    }
  }
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
// 底部
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
</style>