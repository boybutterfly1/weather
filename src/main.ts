import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {createPinia} from 'pinia'
import { createYmaps } from 'vue-yandex-maps';
import {YMAP_API_KEY} from "@/api/constants";

const app = createApp(App)
  app
    .use(createYmaps({
      apikey: YMAP_API_KEY,
    }))
    .use(router)
    .use(createPinia())
    .mount('#app')
