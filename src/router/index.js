import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import index from "vuex";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/index.vue')
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/login.vue')
    }
  },
  {
    path: '/index',
    name: 'index',
    component: function () {
      return import('../views/index.vue')
    }
  },
  {
    path: '/register',
    name: 'register',
    component: function () {
      return import('../views/register.vue')
    }
  },
  {
    path: '/newpost',
    name: 'newpost',
    component: function () {
      return import('../views/newpost.vue')
    }
  },
  {
    path: '/myProfile',
    name: 'myProfile',
    component: function (){
      return import('../views/MyProfile.vue')
    }
  },
  {
    path: '/detail',
    name: 'Detail',
    component: function (){
      return import('../views/details.vue')
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: function (){
      return import('../views/order.vue')
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: function (){
      return import('../views/admin.vue')
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: function (){
      return import('../views/profile.vue')
    }
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
