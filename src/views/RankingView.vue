<template>
<!-- 排行 -->
  <div>
    <div class="container">
      <TopComponents />
      <!-- 内容 -->
      <article id="container" class="oneLevel">
        <h1>排行</h1>
        <div class="boy">
          <a  @click="boyJump(item.Leaderboard)" class="box" v-for="(item,index) in obj.boy" :key="index">
            <div>
              <h2>{{item.Leaderboard}}</h2>
              <span>{{item.textList}}&gt;</span>
            </div>
            <i class="renqi"></i>
          </a>
        </div>
        
      </article>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import TopComponents from "../components/TopComponents.vue";
import { useRouter } from 'vue-router';
export default {
    components:{
        TopComponents
    },
    setup() {
        
      let obj = reactive({
        boy:[
          {
            Leaderboard:"人气榜",
            textList:"查看榜单"
          },
          {
            Leaderboard:"新书榜",
            textList:"查看榜单"
          },
          {
            Leaderboard:"银票榜",
            textList:"查看榜单"
          },
          {
            Leaderboard:"互动榜",
            textList:"查看榜单"
          },
          {
            Leaderboard:"完本榜",
            textList:"查看榜单"
          },
        ],
        
      })

      let router = useRouter()

      let boyJump =(e)=>{
        router.push({
          path:"/Boy_topic_detail",
          query:{id:e}
        })
      }

      return{
        obj,
        boyJump,
      }
    },
}
</script>

<style lang="scss" scoped>
@import "../assets/css/mobliebase.css";
@import "../assets/css/topic.css";
</style>