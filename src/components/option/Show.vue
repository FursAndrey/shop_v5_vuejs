<template>
    <h2>Option {{ $route.params.id }}</h2>
    <router-link :to="{ name: 'option.index' }">To options</router-link>
    <table cellspacing="0" cellpadding="0">
        <tr>
            <th>ID</th>
            <td>{{ option.id }}</td>
        </tr>
        <tr>
            <th>Name</th>
            <td>{{ option.name }}</td>
        </tr>
        <tr>
            <th>Property</th>
            <td>
                {{ option.property }}<hr/>
                ID
                <span v-for="prop in option.property" :key="prop.id">
                    {{ prop }}<br/>
                </span>
            </td>
        </tr>
    </table>
</template>

<script>
import { onMounted } from 'vue';
import useOption from "../../composition/option";

export default {
    props: {
        id: {
            required: true,
            type: String
        }
    },

    setup(props) {
        const { 
            option,
            getOption
        } = useOption();

        const getCurrentOption = () => {
            getOption(props.id);
        }
        onMounted(getCurrentOption);

        return {
            option
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