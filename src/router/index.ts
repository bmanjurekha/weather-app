import WeatherView from  '@/views/WeatherView.vue'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: WeatherView
    }
  ]
})

export default router
