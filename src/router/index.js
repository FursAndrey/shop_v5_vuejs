import { createRouter, createWebHistory } from 'vue-router'
import CategoryIndex from '../components/category/Index.vue'
import CategoryCreate from '../components/category/Create.vue'
import CategoryShow from '../components/category/Show.vue'
import CategoryEdit from '../components/category/Edit.vue'

import CurrencyIndex from '../components/currency/Index.vue'
import CurrencyCreate from '../components/currency/Create.vue'
import CurrencyShow from '../components/currency/Show.vue'
import CurrencyEdit from '../components/currency/Edit.vue'

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
            path: '/category/edit/:id',
            name: 'category.edit',
            component: CategoryEdit,
            props: true
        },
        {
            path: '/currency',
            name: 'currency.index',
            component: CurrencyIndex
        },
        {
            path: '/currency/create',
            name: 'currency.create',
            component: CurrencyCreate
        },
        {
            path: '/currency/show/:id',
            name: 'currency.show',
            component: CurrencyShow,
            props: true
        },
        {
            path: '/currency/edit/:id',
            name: 'currency.edit',
            component: CurrencyEdit,
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
