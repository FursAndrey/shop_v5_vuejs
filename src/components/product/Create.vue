<template>
    <div class="errors" v-if="errors !== ''">
        <p v-for="(er, field) in errors" :key="field">
            <span v-for="error in er" :key="error" class="text-sm">
                {{ error }}
            </span>
        </p>
    </div>
    <form @submit.prevent>
        <h4>Создание product</h4>
        <p>
            <input
                v-model="product.name"
                type="text"
                placeholder="Название"
            />
        </p>
        <p>Description</p>
        <p>
            <textarea v-model="product.description" rows="4" cols="100"></textarea>
        </p>
        <p>Category</p>
        <p>
            <select v-model="product.category_id">
                <option v-for="category in allCategories" :key="category.id" :value="category.id">{{ category.name }}</option>
            </select>
        </p>
        <p>Properties</p>
        <p>
            <select v-model="product.property_id" multiple size="7">
                <option v-for="property in allProperties" :key="property.id" :value="property.id">{{ property.name }}</option>
            </select>
        </p>
        <p>
            <button style="margin-top: 15px" @click="createProduct">
                Сохранить
            </button>
            <router-link :to="{ name: 'product.index' }">
                Закрыть
            </router-link>
        </p>
    </form>
</template>

<script>
import { onMounted } from 'vue';
import { reactive } from "@vue/runtime-core";
import useProduct from "../../composition/product";
export default {
    setup() {
        let product = reactive({
            'name': '',
            'property_id': [],
            'category_id': '',
        });

        const { 
            errors,
            allProperties,
            allCategories,
            storeProduct,
            getAllProperties,
            getAllCategories
        } = useProduct();

        const createProduct = async () => {
            await storeProduct({...product});
        }
        onMounted(getAllProperties);
        onMounted(getAllCategories);

        return {
            errors,
            product,
            allProperties,
            allCategories,
            createProduct,
        }
    }
}
</script>

<style scoped>
.errors {
    color: #c50000;
    padding: 5px;
    background: #ffb1b1;
    border: 2px solid red;
    border-radius: 10px;
    margin: 5px 0;
}
</style>