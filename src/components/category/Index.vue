<template>
    <p>Create category</p>
    <table cellspacing="0" cellpadding="0">
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Products</th>
            <th></th>
        </tr>
        <tr v-for="category in categories" :key="category.id">
            <td>{{ category.id }}</td>
            <td>{{ category.name }}</td>
            <td>
                <p v-for="product in category.products" :key="product.id">
                    {{ product.name }}
                </p>
            </td>
            <td>update/delete</td>
        </tr>
    </table>
    <ul class="pagination">
        <li v-for="page in linkPages" 
            :key="page.label" 
            >
            <span 
                v-html="page.label" 
                :class="{ currentPage:page.active }"
                @click="goToPage(page.url)"
                >
            </span>
        </li>
    </ul>
</template>

<style scoped>
table {
    width: 100%;
    border: 1px solid silver;
}

th {
    font-weight: bold;
    font-size: 1.5rem;
}

th, td {
    border: 1px solid silver;
    padding: 10px;
    width: 30%;
}

.pagination {
    list-style-type: none;
}
.pagination li {
    display: inline-block;
    margin: 5px 5px;
    cursor: pointer;
}
.currentPage {
    font-weight: bold;
}
</style>

<script>
import { onMounted } from 'vue';
import useCategory from "../../composition/category";

export default {
    setup() {
        const { categories, linkPages, getCategories } = useCategory();
        onMounted(getCategories);

        const goToPage = (url) => {
            if (url != null) {
                getCategories(url);
            }
        }

        return {
            categories,
            linkPages,
            goToPage
        }
    }
}
</script>