import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/homepage.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/event', name: 'Event', component: ()=> import(/* webpackChunckName: "booking" */"../views/event.vue") },
    { path: '/user', name: 'User', component: ()=> import(/* webpackChunckName: "booking" */"../views/userpage.vue") },
]

const routers = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 }
    }
})

export default routers