import Vue from 'vue'
import Router from 'vue-router'
import A from '@/components/A'
import BC from '@/components/BC'
import DE from '@/components/DE'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'A',
      component: A
    },
    {
      path: '/BC',
      name: 'BC',
      component: BC
    },
     {
      path: '/DE',
      name: 'DE',
      component: DE
    }
  ]
})
