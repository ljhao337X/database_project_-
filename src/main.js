import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import api from './api/index.js';
Vue.prototype.$api = api;
Vue.use(ElementUI, {
  size: 'large'
});
Vue.config.productionTip = false

let globalData={
  userInfo:{
    id: '',
    nickname:'',
    avatar: ''
  }
};
Vue.prototype.$globalData=globalData;

let sta={
  isLogin:false,
  adminName:''
};
Vue.prototype.$sta = sta;

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
