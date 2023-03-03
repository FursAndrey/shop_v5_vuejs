<template>
    <div class="errors" v-if="errors !== ''">
        <p v-for="(er, field) in errors" :key="field">
            <span v-for="error in er" :key="error" class="text-sm">
                {{ error }}
            </span>
        </p>
    </div>
    <form @submit.prevent="saveSku">
        <h4>Редактирование sku {{ $route.params.id }}</h4>
        <p>Product</p>
        <p>
            <select v-model="sku.product_id">
                <option v-for="product in allProducts" :key="product.id" :value="product.id">{{ product.name }}</option>
            </select>
        </p>
        <p>
            <input
                v-model="sku.price"
                type="text"
                placeholder="Цена"
            />
        </p>
        <p>
            <input
                v-model="sku.count"
                type="text"
                placeholder="Соличество"
            />
        </p>
        <p v-for="option in sku.options" :key="option.id">
            {{ option.property.id }}/{{ option.property.name }}:
            {{ option.name }}
        </p>
        <p>
            <button style="margin-top: 15px">
                Сохранить
            </button>
            <router-link :to="{ name: 'sku.index' }">
                Закрыть
            </router-link>
        </p>
    </form>
</template>

<script>
import { onMounted } from 'vue';
import useSku from "../../composition/sku";

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
            sku,
            allProducts,
            getAllProducts,
            getSku,
            updateSku,
        } = useSku();

        const getCurrentSku = () => {
            getSku(props.id);
        }
        
        const saveSku = async () => {
            await updateSku(props.id);
        }

        onMounted(getCurrentSku);
        onMounted(getAllProducts);

        return {
            errors,
            sku,
            allProducts,
            saveSku
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