import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import api from './api/index.js';
import axios from "axios";

Vue.prototype.$store = store;
Vue.prototype.$api = api;
Vue.prototype.$axios = axios;
Vue.use(ElementUI, {
    size: 'large'
});
Vue.config.productionTip = false


let sta = {
    isLogin: false,
    adminName: ''
};
Vue.prototype.$sta = sta;

router.beforeEach((to, from, next) => {

    // 若用户未登录且访问的页面需要登录，则跳转至登录页面
    if (!store.state.is_login && to.meta.requireAuth) {
        next({
            name: 'index',
        })
    }
    if (!store.state.is_admin_login && to.meta.requireAdmin){
        this.$message.error('需要管理员身份');
        next({
            name: 'login',
        })
    }

    next()
})

new Vue({
    router,
    store,
    render: function (h) {
        return h(App)
    }
}).$mount('#app')
