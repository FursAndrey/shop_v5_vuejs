<template>
    <h2>Category {{ $route.params.id }}</h2>
    <router-link :to="{ name: 'category.index' }">To categories</router-link>
    <table cellspacing="0" cellpadding="0">
        <tr>
            <th>ID</th>
            <td>{{ category.id }}</td>
        </tr>
        <tr>
            <th>Name</th>
            <td>{{ category.name }}</td>
        </tr>
        <tr>
            <th>Products</th>
            <td>
                <p v-for="product in category.products" :key="product.id">
                    {{ product.name }}
                </p>
            </td>
        </tr>
    </table>
</template>

<script>
import { onMounted } from 'vue';
import useCategory from "../../composition/category";

export default {
    props: {
        id: {
            required: true,
            type: String
        }
    },

    setup(props) {
        const { 
            category,
            getCategory
        } = useCategory();

        const getCurrentCategory = () => {
            getCategory(props.id);
        }
        onMounted(getCurrentCategory);

        return {
            category
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