import Vue from 'vue'
import VueRouter from 'vue-router'
import SignInSignUp from '../views/SignInSignUp'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'SignIn',
    component: SignInSignUp,
    meta: {
      title: 'Sign In'
    }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignInSignUp,
    meta: {
      title: 'Create a Student Account'
    }
  },
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.afterEach((to, from) => {
  from;
  document.title = `${to.meta.title ?? ''}${to.meta.title ? ' | ' : ''}${process.env.VUE_APP_NAME}`
})

export default router
