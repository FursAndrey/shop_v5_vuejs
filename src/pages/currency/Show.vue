<template>
    <h2>Currency {{ $route.params.id }}</h2>
    <router-link :to="{ name: 'currency.index' }">To currencies</router-link>
    <table cellspacing="0" cellpadding="0">
        <tr>
            <th>ID</th>
            <td>{{ currency.id }}</td>
        </tr>
        <tr>
            <th>Code</th>
            <td>{{ currency.code }}</td>
        </tr>
        <tr>
            <th>Rate</th>
            <td>
                {{ currency.rate }}
            </td>
        </tr>
    </table>
</template>

<script>
import { onMounted } from 'vue';
import useCurrency from "../../composition/currency";

export default {
    props: {
        id: {
            required: true,
            type: String
        }
    },

    setup(props) {
        const { 
            currency,
            getCurrency
        } = useCurrency();

        const getCurrentCurrency = () => {
            getCurrency(props.id);
        }
        onMounted(getCurrentCurrency);

        return {
            currency
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