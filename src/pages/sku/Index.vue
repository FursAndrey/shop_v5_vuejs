<template>
    <router-link :to="{ name: 'sku.create' }">Create sku</router-link>
    <p v-if="errors" class="errors">{{ errors }}</p>
    <table cellspacing="0" cellpadding="0">
        <tr>
            <th class="IDcol">ID</th>
            <th>Product</th>
            <th>Price</th>
            <th>Count</th>
            <th>Properties/Options</th>
            <th></th>
        </tr>
        <tr v-for="sku in skus" :key="sku.id">
            <td class="IDcol">
                <router-link :to="{ name:'sku.show', params:{id: sku.id} }">
                    {{ sku.id }}
                </router-link>
            </td>
            <td>
                {{ sku.product.name }}
            </td>
            <td>
                {{ sku.price }}
            </td>
            <td>
                {{ sku.count }}
            </td>
            <td>
                <p v-for="option in sku.options" :key="option.id">
                    {{ option.property.name }}:
                    {{ option.name }}
                </p>
            </td>
            <td>
                <router-link :to="{ name:'sku.edit', params:{id: sku.id} }">
                    update
                </router-link>
                /
                <button @click="deleteSku(sku.id)">Delete</button>
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
import useSku from "../../composition/sku";

export default {
    setup() {
        const { 
            skus, 
            linkPages,
            errors,
            getSkus, 
            destroySku,
            clearErrors
        } = useSku();
        onMounted(getSkus);

        const goToPage = (url) => {
            if (url != null) {
                getSkus(url);
            }
            clearErrors();
        }
        
        const deleteSku = async (id) => {
            if (!window.confirm('Are you sure?')) {
                return false;
            }
            await destroySku(id);
            await getSkus();
        }

        return {
            skus,
            linkPages,
            errors,
            goToPage,
            deleteSku
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