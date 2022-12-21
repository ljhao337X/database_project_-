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
    id: '1',
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

// router.beforeEach((to, from, next) => {
//     document.title = `${to.meta.title}`;
//     // console.log(to.path,'userInfo:',Vue.prototype.$globalData.userInfo);
//     const nickname = Vue.prototype.$globalData.userInfo.nickname;
//     if (!nickname
//         &&(to.path === '/me'
//         || to.path === '/message'
//         || to.path === '/release'
//         || to.path === '/order')) {
//         api.getUserInfo().then(res=>{
//            console.log('getUserInfo:',res);
//            if(res.status_code!==1){
//                next('/login');
//            }else {
//                res.data.signInTime=res.data.signInTime.substring(0,10);
//                Vue.prototype.$globalData.userInfo=res.data;
//                next();
//            }
//         }).catch(e=>{
//             next('/login');
//         });
//
//     }else{
//         next();
//     }
// });



new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
