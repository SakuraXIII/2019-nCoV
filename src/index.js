import Vue from 'vue'
import _ from 'lodash'
import Elements from './element'
Vue.use(Elements)
import app from './App.vue'
import router from './route'

new Vue({
    router,
    render: (h) => h(app),
}).$mount('#app')