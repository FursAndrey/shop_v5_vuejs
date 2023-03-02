<template>
    <router-link :to="{ name: 'product.create' }">Create product</router-link>
    <p v-if="errors" class="errors">{{ errors }}</p>
    <table cellspacing="0" cellpadding="0">
        <tr>
            <th class="IDcol">ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Сategory</th>
            <th>Properties</th>
            <th></th>
        </tr>
        <tr v-for="product in products" :key="product.id">
            <td class="IDcol">{{ product.id }}</td>
            <td>
                <router-link :to="{ name:'product.show', params:{id: product.id} }">
                    {{ product.name }}
                </router-link>
            </td>
            <td>
                {{ product.description }}
            </td>
            <td>
                {{ product.category.name }}
            </td>
            <td>
                <p v-for="property in product.properties" :key="property.id">
                    {{ property.name }}
                </p>
            </td>
            <td>
                <router-link :to="{ name:'product.edit', params:{id: product.id} }">
                    update
                </router-link>
                /
                <button @click="deleteProduct(product.id)">Delete</button>
            </td>
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

<script>
import { onMounted } from 'vue';
import useProduct from "../../composition/product";

export default {
    setup() {
        const { 
            products, 
            linkPages,
            errors,
            getProducts, 
            destroyProduct,
            clearErrors
        } = useProduct();
        onMounted(getProducts);

        const goToPage = (url) => {
            if (url != null) {
                getProducts(url);
            }
            clearErrors();
        }
        
        const deleteProduct = async (id) => {
            if (!window.confirm('Are you sure?')) {
                return false;
            }
            await destroyProduct(id);
            await getProducts();
        }

        return {
            products,
            linkPages,
            errors,
            goToPage,
            deleteProduct
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
    font-size: 1.5rem;
}

th, td {
    border: 1px solid silver;
    padding: 10px;
    width: 20%;
}

.IDcol {
    width: 5%;
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

.errors {
    color: #c50000;
    padding: 5px;
    background: #ffb1b1;
    border: 2px solid red;
    border-radius: 10px;
    margin: 5px 0;
}
</style>