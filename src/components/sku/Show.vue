<template>
    <h2>Sku {{ $route.params.id }}</h2>
    <router-link :to="{ name: 'sku.index' }">To skus</router-link>
    <table cellspacing="0" cellpadding="0">
        <tr>
            <th>ID</th>
            <td>{{ sku.id }}</td>
        </tr>
        <tr>
            <th>Product</th>
            <td>{{ sku.product }}</td>
        </tr>
        <tr>
            <th>Price</th>
            <td>{{ sku.price }}</td>
        </tr>
        <tr>
            <th>Count</th>
            <td>{{ sku.count }}</td>
        </tr>
        <tr>
            <th>Properties/Options</th>
            <td>
                <p v-for="option in sku.options" :key="option.id">
                    {{ option.property.name }}:
                    {{ option.name }}
                </p>
            </td>
        </tr>
    </table>
    {{ sku }}
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
            sku,
            getSku
        } = useSku();

        const getCurrentSku = () => {
            getSku(props.id);
            console.log(sku);
        }
        onMounted(getCurrentSku);

        return {
            sku
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