<template>
    <router-link :to="{ name: 'currency.create' }">Create currency</router-link>
    <p v-if="errors" class="errors">{{ errors }}</p>
    <table cellspacing="0" cellpadding="0">
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Products</th>
            <th></th>
        </tr>
        <tr v-for="currency in currencies" :key="currency.id">
            <td>{{ currency.id }}</td>
            <td>
                <router-link :to="{ name:'currency.show', params:{id: currency.id} }">
                    {{ currency.code }}
                </router-link>
            </td>
            <td>
                {{ currency.rate }}
            </td>
            <td>
                <router-link :to="{ name:'currency.edit', params:{id: currency.id} }">
                    update
                </router-link>
                /
                <button @click="deleteCurrency(currency.id)">Delete</button>
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

.errors {
    color: #c50000;
    padding: 5px;
    background: #ffb1b1;
    border: 2px solid red;
    border-radius: 10px;
    margin: 5px 0;
}
</style>

<script>
import { onMounted } from 'vue';
import useCurrency from "../../composition/currency";

export default {
    setup() {
        const { 
            currencies, 
            linkPages,
            errors,
            getCurrencies, 
            destroyCurrency,
            clearErrors
        } = useCurrency();
        onMounted(getCurrencies);

        const goToPage = (url) => {
            if (url != null) {
                getCurrencies(url);
            }
            clearErrors();
        }
        
        const deleteCurrency = async (id) => {
            if (!window.confirm('Are you sure?')) {
                return false;
            }
            await destroyCurrency(id);
            await getCurrencies();
        }

        return {
            currencies,
            linkPages,
            errors,
            goToPage,
            deleteCurrency
        }
    }
}
</script>