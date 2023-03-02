import { createRouter, createWebHistory } from 'vue-router'
import CategoryIndex from '../components/category/Index.vue'
import CategoryCreate from '../components/category/Create.vue'
import CategoryShow from '../components/category/Show.vue'
import CategoryEdit from '../components/category/Edit.vue'

import CurrencyIndex from '../components/currency/Index.vue'
import CurrencyCreate from '../components/currency/Create.vue'
import CurrencyShow from '../components/currency/Show.vue'
import CurrencyEdit from '../components/currency/Edit.vue'

import PropertyIndex from '../components/property/Index.vue'
import PropertyCreate from '../components/property/Create.vue'
import PropertyShow from '../components/property/Show.vue'
import PropertyEdit from '../components/property/Edit.vue'

import OptionIndex from '../components/option/Index.vue'
import OptionCreate from '../components/option/Create.vue'
import OptionShow from '../components/option/Show.vue'
import OptionEdit from '../components/option/Edit.vue'

import ProductIndex from '../components/product/Index.vue'
import ProductCreate from '../components/product/Create.vue'
import ProductShow from '../components/product/Show.vue'
import ProductEdit from '../components/product/Edit.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/AboutView.vue')
        },
        {
            path: '/product',
            name: 'product.index',
            component: ProductIndex
        },
        {
            path: '/product/create',
            name: 'product.create',
            component: ProductCreate
        },
        {
            path: '/product/show/:id',
            name: 'product.show',
            component: ProductShow,
            props: true
        },
        {
            path: '/product/edit/:id',
            name: 'product.edit',
            component: ProductEdit,
            props: true
        },
        {
            path: '/property',
            name: 'property.index',
            component: PropertyIndex
        },
        {
            path: '/property/create',
            name: 'property.create',
            component: PropertyCreate
        },
        {
            path: '/property/show/:id',
            name: 'property.show',
            component: PropertyShow,
            props: true
        },
        {
            path: '/property/edit/:id',
            name: 'property.edit',
            component: PropertyEdit,
            props: true
        },
        {
            path: '/option',
            name: 'option.index',
            component: OptionIndex
        },
        {
            path: '/option/create',
            name: 'option.create',
            component: OptionCreate
        },
        {
            path: '/option/show/:id',
            name: 'option.show',
            component: OptionShow,
            props: true
        },
        {
            path: '/option/edit/:id',
            name: 'option.edit',
            component: OptionEdit,
            props: true
        },
        {
            path: '/category',
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