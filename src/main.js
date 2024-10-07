import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


createApp(App).use(store).use(router).mount('#app')

import { Swipe, SwipeItem,Pagination,Loading,PullRefresh   } from 'vant';

const app = createApp();
app.use(Swipe).use(SwipeItem).use(Pagination).use(Loading).use(PullRefresh);
