<script setup>
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
    <header>
        <div class="wrapper">
        <nav>
            <RouterLink to="/category">Category</RouterLink>
            <RouterLink to="/currency">Currency</RouterLink>
            <RouterLink to="/property">Property</RouterLink>
            <RouterLink to="/option">Option</RouterLink>
            <RouterLink to="/product">Product</RouterLink>
            <RouterLink to="/about">About</RouterLink>
        </nav>
        </div>
    </header>

    <RouterView />
</template>

<style scoped>
header {
    line-height: 1.5;
}

nav {
    width: 100%;
    font-size: 1.5rem;
    text-align: center;
}

nav a.router-link-exact-active {
    color: var(--color-text);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
    border: 0;
}
</style>
