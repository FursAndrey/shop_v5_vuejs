<template>
    <div class="errors" v-if="errors !== ''">
        <p v-for="(er, field) in errors" :key="field">
            <span v-for="error in er" :key="error" class="text-sm">
                {{ error }}
            </span>
        </p>
    </div>
    <form @submit.prevent="saveProduct">
        <h4>Редактирование product {{ $route.params.id }}</h4>
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
            <button style="margin-top: 15px">
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
import useProduct from "../../composition/product";

export default {
    props: {
        id: {
            required: true,
            type: String
        }
    },

    setup(props) {
        const {
            errors,
            product,
            allProperties,
            allCategories,
            getProduct,
            updateProduct,
            getAllProperties,
            getAllCategories
        } = useProduct();

        const getCurrentProduct = () => {
            getProduct(props.id);
        }
        

        const saveProduct = async () => {
            await updateProduct(props.id);
        }

        onMounted(getCurrentProduct);
        onMounted(getAllProperties);
        onMounted(getAllCategories);

        return {
            errors,
            product,
            allProperties,
            allCategories,
            saveProduct
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