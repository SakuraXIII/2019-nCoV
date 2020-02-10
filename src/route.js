import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import head from './components/head.vue'
import echarts from './components/echarts.vue'


let router = new VueRouter({
    routes: [{
        path: '/',
        component: head,
        children: [{
            path: '/*',
            component: echarts
        }]
    }]
})

export default router