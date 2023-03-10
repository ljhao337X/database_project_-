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
    },
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/myProfile',
    name: 'myProfile',
    component: function (){
      return import('../views/MyProfile.vue')
    },
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/details',
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
    },
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: function (){
      return import('../views/admin.vue')
    },
    meta: {
      requireAdmin: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: function (){
      return import('../views/profile.vue')
    }
  },
  {
    path: '/search',
    name: 'search',
    component: function (){
      return import('../views/search.vue')
    },
    meta: {
      requireAuth: true
    }
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
