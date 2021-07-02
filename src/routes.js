import VueRouter from 'vue-router'
import Tests from './pages/Tests'
import Test from './pages/Test'

export default new VueRouter({
  routes: [
    {
      path: '',
      component: Tests
    },
    {
      path: '/test/:id',
      component: Test
    }
  ],
  mode: 'history'
})
