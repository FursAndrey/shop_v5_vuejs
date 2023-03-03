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
            component: () => import('../pages/SkuIndex.vue'),
        },
        {
            path: '/sku/create',
            name: 'sku.create',
            component: () => import('../pages/SkuCreate.vue'),
        },
        {
            path: '/sku/show/:id',
            name: 'sku.show',
            component: () => import('../pages/SkuShow.vue'),
            props: true
        },
        {
            path: '/sku/edit/:id',
            name: 'sku.edit',
            component: () => import('../pages/SkuEdit.vue'),
            props: true
        },
        {
            path: '/product',
            name: 'product.index',
            component: () => import('../pages/ProductIndex.vue'),
        },
        {
            path: '/product/create',
            name: 'product.create',
            component: () => import('../pages/ProductCreate.vue'),
        },
        {
            path: '/product/show/:id',
            name: 'product.show',
            component: () => import('../pages/ProductShow.vue'),
            props: true
        },
        {
            path: '/product/edit/:id',
            name: 'product.edit',
            component: () => import('../pages/ProductEdit.vue'),
            props: true
        },
        {
            path: '/property',
            name: 'property.index',
            component: () => import('../pages/PropertyIndex.vue'),
        },
        {
            path: '/property/create',
            name: 'property.create',
            component: () => import('../pages/PropertyCreate.vue'),
        },
        {
            path: '/property/show/:id',
            name: 'property.show',
            component: () => import('../pages/PropertyShow.vue'),
            props: true
        },
        {
            path: '/property/edit/:id',
            name: 'property.edit',
            component: () => import('../pages/PropertyEdit.vue'),
            props: true
        },
        {
            path: '/option',
            name: 'option.index',
            component: () => import('../pages/OptionIndex.vue'),
        },
        {
            path: '/option/create',
            name: 'option.create',
            component: () => import('../pages/OptionCreate.vue'),
        },
        {
            path: '/option/show/:id',
            name: 'option.show',
            component: () => import('../pages/OptionShow.vue'),
            props: true
        },
        {
            path: '/option/edit/:id',
            name: 'option.edit',
            component: () => import('../pages/OptionEdit.vue'),
            props: true
        },
        {
            path: '/category',
            name: 'category.index',
            component: () => import('../pages/CategoryIndex.vue'),
        },
        {
            path: '/category/create',
            name: 'category.create',
            component: () => import('../pages/CategoryCreate.vue'),
        },
        {
            path: '/category/show/:id',
            name: 'category.show',
            component: () => import('../pages/CategoryShow.vue'),
            props: true
        },
        {
            path: '/category/edit/:id',
            name: 'category.edit',
            component: () => import('../pages/CategoryEdit.vue'),
            props: true
        },
        {
            path: '/currency',
            name: 'currency.index',
            component: () => import('../pages/CurrencyIndex.vue'),
        },
        {
            path: '/currency/create',
            name: 'currency.create',
            component: () => import('../pages/CurrencyCreate.vue'),
        },
        {
            path: '/currency/show/:id',
            name: 'currency.show',
            component: () => import('../pages/CurrencyShow.vue'),
            props: true
        },
        {
            path: '/currency/edit/:id',
            name: 'currency.edit',
            component: () => import('../pages/CurrencyEdit.vue'),
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