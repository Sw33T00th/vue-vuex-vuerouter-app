import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    meta : {
      title: 'Easy Task',
    },
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Create.vue')
  },
  {
    path: '/list',
    meta : {
      title: 'Easy Task',
    },
    name: ' List',
    component: () => import(/* webpackChunkName: "about" */ '../views/List.vue')
  },
  {
    path: '/task/:id',
    meta : {
      title: 'Easy Task',
    },
    name: 'Task',
    component: () => import(/* webpackChunkName: "about" */ '../views/Task.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;
