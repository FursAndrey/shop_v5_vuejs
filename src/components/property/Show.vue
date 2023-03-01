<template>
    <h2>Property {{ $route.params.id }}</h2>
    <router-link :to="{ name: 'property.index' }">To properties</router-link>
    <table cellspacing="0" cellpadding="0">
        <tr>
            <th>ID</th>
            <td>{{ property.id }}</td>
        </tr>
        <tr>
            <th>Name</th>
            <td>{{ property.name }}</td>
        </tr>
    </table>
</template>

<script>
import { onMounted } from 'vue';
import useProperty from "../../composition/property";

export default {
    props: {
        id: {
            required: true,
            type: String
        }
    },

    setup(props) {
        const { 
            property,
            getProperty
        } = useProperty();

        const getCurrentProperty = () => {
            getProperty(props.id);
        }
        onMounted(getCurrentProperty);

        return {
            property
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