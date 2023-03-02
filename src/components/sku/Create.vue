<template>
    <div class="errors" v-if="errors !== ''">
        <p v-for="(er, field) in errors" :key="field">
            <span v-for="error in er" :key="error" class="text-sm">
                {{ error }}
            </span>
        </p>
    </div>
    <form @submit.prevent>
        <h4>Создание sku</h4>
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
        <p>
            <button style="margin-top: 15px" @click="createSku">
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
import { reactive } from "@vue/runtime-core";
import useSku from "../../composition/sku";
export default {
    setup() {
        let sku = reactive({
            'product_id': '',
            'price': '',
            'count': '',
        });

        const { 
            errors,
            allProducts,
            storeSku,
            getAllProducts,
        } = useSku();

        const createSku = async () => {
            await storeSku({...sku});
        }
        onMounted(getAllProducts);

        return {
            errors,
            sku,
            allProducts,
            createSku,
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