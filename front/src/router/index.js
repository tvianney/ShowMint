import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/homepage.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/event', name: 'Event', component: ()=> import(/* webpackChunckName: "booking" */"../views/event.vue") },
]

const routers = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 }
    }
})

export default routers