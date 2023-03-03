import { createRouter, createWebHistory } from 'vue-router'

import AboutView from '../views/AboutView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AboutView
        },
        {
            path: '/sku',
            name: 'sku.index',
            component: () => import('../pages/sku/Index.vue')
        },
        {
            path: '/sku/create',
            name: 'sku.create',
            component: () => import('../pages/sku/Create.vue')
        },
        {
            path: '/sku/show/:id',
            name: 'sku.show',
            component: () => import('../pages/sku/Show.vue'),
            props: true
        },
        {
            path: '/sku/edit/:id',
            name: 'sku.edit',
            component: () => import('../pages/sku/Edit.vue'),
            props: true
        },
        {
            path: '/product',
            name: 'product.index',
            component: () => import('../pages/product/Index.vue')
        },
        {
            path: '/product/create',
            name: 'product.create',
            component: () => import('../pages/product/Create.vue')
        },
        {
            path: '/product/show/:id',
            name: 'product.show',
            component: () => import('../pages/product/Show.vue'),
            props: true
        },
        {
            path: '/product/edit/:id',
            name: 'product.edit',
            component: () => import('../pages/product/Edit.vue'),
            props: true
        },
        {
            path: '/property',
            name: 'property.index',
            component: () => import('../pages/property/Index.vue')
        },
        {
            path: '/property/create',
            name: 'property.create',
            component: () => import('../pages/property/Create.vue')
        },
        {
            path: '/property/show/:id',
            name: 'property.show',
            component: () => import('../pages/property/Show.vue'),
            props: true
        },
        {
            path: '/property/edit/:id',
            name: 'property.edit',
            component: () => import('../pages/property/Edit.vue'),
            props: true
        },
        {
            path: '/option',
            name: 'option.index',
            component: () => import('../pages/option/Index.vue')
        },
        {
            path: '/option/create',
            name: 'option.create',
            component: () => import('../pages/option/Create.vue')
        },
        {
            path: '/option/show/:id',
            name: 'option.show',
            component: () => import('../pages/option/Show.vue'),
            props: true
        },
        {
            path: '/option/edit/:id',
            name: 'option.edit',
            component: () => import('../pages/option/Edit.vue'),
            props: true
        },
        {
            path: '/category',
            name: 'category.index',
            component: () => import('../pages/category/Index.vue')
        },
        {
            path: '/category/create',
            name: 'category.create',
            component: () => import('../pages/category/Create.vue')
        },
        {
            path: '/category/show/:id',
            name: 'category.show',
            component: () => import('../pages/category/Show.vue'),
            props: true
        },
        {
            path: '/category/edit/:id',
            name: 'category.edit',
            component: () => import('../pages/category/Edit.vue'),
            props: true
        },
        {
            path: '/currency',
            name: 'currency.index',
            component: () => import('../pages/currency/Index.vue')
        },
        {
            path: '/currency/create',
            name: 'currency.create',
            component: () => import('../pages/currency/Create.vue')
        },
        {
            path: '/currency/show/:id',
            name: 'currency.show',
            component: () => import('../pages/currency/Show.vue'),
            props: true
        },
        {
            path: '/currency/edit/:id',
            name: 'currency.edit',
            component: () => import('../pages/currency/Edit.vue'),
            props: true
        },
        {
            path: '/about',
            name: 'about',
            component: AboutView
        }
    ]
})

export default router