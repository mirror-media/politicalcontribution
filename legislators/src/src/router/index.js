import Vue from 'vue'
import Router from 'vue-router'

const Explore = () => import('../views/Explore')
// import Explore from '@/views/Explore'
// import Topic from '@/views/Topic'
const Story1 = () => import('../views/topic/Story1')
const Story2 = () => import('../views/topic/Story2')
const Story3 = () => import('../views/topic/Story3')
const Story4 = () => import('../views/topic/Story4')
// import Story1 from '@/views/topic/Story1'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/explore',
      name: 'explore',
      component: Explore
    },
    {
      path: '/story1',
      name: 'story1',
      component: Story1
    },
    {
      path: '/story2',
      name: 'story2',
      component: Story2
    },
    {
      path: '/story3',
      name: 'story3',
      component: Story3
    },
    {
      path: '/story4',
      name: 'story4',
      component: Story4
    }
    // {
    //   path: '/topic/:story',
    //   name: 'Topic',
    //   component: Topic,
    //   props: true
    // }
  ]
})
