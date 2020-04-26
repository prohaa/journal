import VueRouter from 'vue-router'
import home from './pages/home.vue'
import list from './pages/list.vue'
import login from './pages/login.vue'

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: home
    },
    {
      path: '/list',
      component: list,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      component: login,
      meta: {
        guest: true
      }
    }
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      const user = JSON.parse(localStorage.getItem('user'))
      if (to.matched.some(record => record.meta.is_admin)) {
        if (user.is_admin === 1) {
          next()
        } else {
          next({ name: 'userboard' })
        }
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('jwt') == null) {
      next()
    } else {
      next({ name: 'userboard' })
    }
  } else {
    next()
  }
})

export default router
