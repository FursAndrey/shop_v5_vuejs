<template>
    <h2>Product {{ $route.params.id }}</h2>
    <router-link :to="{ name: 'product.index' }">To products</router-link>
    <table cellspacing="0" cellpadding="0">
        <tr>
            <th>ID</th>
            <td>{{ product.id }}</td>
        </tr>
        <tr>
            <th>Name</th>
            <td>{{ product.name }}</td>
        </tr>
        <tr>
            <th>Description</th>
            <td>{{ product.description }}</td>
        </tr>
        <tr>
            <th>Сategory</th>
            <td>
                {{ product.category }}<hr/>
                ID
                <span v-for="cat in product.category" :key="cat.id">
                    {{ cat }}<br/>
                </span>
            </td>
        </tr>
        <tr>
            <th>Properties</th>
            <td>
                <p v-for="property in product.properties" :key="property.id">
                    {{ property.name }}
                </p>
            </td>
        </tr>
        <tr>
            <th>Skus</th>
            <td>
                <p v-for="sku in product.skus" :key="sku.id">
                    {{ sku.id }}, price: {{ sku.price }}, count: {{ sku.count }}
                </p>
            </td>
        </tr>
    </table>
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
            product,
            getProduct
        } = useProduct();

        const getCurrentProduct = () => {
            getProduct(props.id);
        }
        onMounted(getCurrentProduct);

        return {
            product
        }
    }
}
</script>

<style scoped>
table {
    width: 100%;
    border: 1px solid silver;
}

th {
    font-weight: bold;
    font-size: 1.2rem;
}

th, td {
    border: 1px solid silver;
    padding: 10px;
    width: 30%;
}
</style>