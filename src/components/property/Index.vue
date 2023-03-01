<template>
    <router-link :to="{ name: 'property.create' }">Create property</router-link>
    <p v-if="errors" class="errors">{{ errors }}</p>
    <table cellspacing="0" cellpadding="0">
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th></th>
        </tr>
        <tr v-for="property in properties" :key="property.id">
            <td>{{ property.id }}</td>
            <td>
                <router-link :to="{ name:'property.show', params:{id: property.id} }">
                    {{ property.name }}
                </router-link>
            </td>
            <td>
                <router-link :to="{ name:'property.edit', params:{id: property.id} }">
                    update
                </router-link>
                /
                <button @click="deleteProperty(property.id)">Delete</button>
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
import useProperty from "../../composition/property";

export default {
    setup() {
        const { 
            properties, 
            linkPages,
            errors,
            getProperties, 
            destroyProperty,
            clearErrors
        } = useProperty();
        onMounted(getProperties);

        const goToPage = (url) => {
            if (url != null) {
                getProperties(url);
            }
            clearErrors();
        }
        
        const deleteProperty = async (id) => {
            if (!window.confirm('Are you sure?')) {
                return false;
            }
            await destroyProperty(id);
            await getProperties();
        }

        return {
            properties,
            linkPages,
            errors,
            goToPage,
            deleteProperty
        }
    }
}
</script>