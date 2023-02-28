import { createRouter, createWebHistory } from 'vue-router'
import CategoryIndex from '../components/category/Index.vue'
import CategoryCreate from '../components/category/Create.vue'
import CategoryShow from '../components/category/Show.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'category.index',
            component: CategoryIndex
        },
        {
            path: '/category/create',
            name: 'category.create',
            component: CategoryCreate
        },
        {
            path: '/category/show/:id',
            name: 'category.show',
            component: CategoryShow,
            props: true
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue')
        }
    ]
})

export default router
