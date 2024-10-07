<template>
<!-- 分类 -->
  <div class="typeView" v-cloak>
    <div class="container" v-if="state.lists">
      <TopComponents />
      <div class="type_content">
        <div class="menlist">
          <h2>分类</h2>
          <div class="menlist_item" v-if="state.lists.typelistsMen">
            <a @click="boyjump( item.title)"
              v-for="item in state.lists.typelistsMen"
              :key="item.id"
            >
              <h2>{{ item.title }}</h2>
              <div class="img">
                <img :src="item.img" class="img1" alt="" />
                <img :src="item.img2" class="img2" alt="" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { gettype_lists } from "../api/type.js";
import TopComponents from "../components/TopComponents.vue";
import { useRouter } from 'vue-router';
export default {
  components: {
    TopComponents,
  },
  setup() {
    let state = reactive({
      lists: null,

    });

    gettype_lists().then((data) => {
      state.lists = data;
    });


    let router = useRouter()

    let boyjump =(e)=>{
      router.push({
        path:"/Boy_topic_detail",
        query:{id:e}
      })
    }


    

    return {
      state,
      boyjump,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/mobliebase.css";
@import "../assets/css/type.css";
.typeView {
  background-color: #fff;
}
[v-cloak] {
  display: none;
}
</style>