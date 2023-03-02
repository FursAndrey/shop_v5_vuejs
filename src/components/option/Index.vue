<template>
    <router-link :to="{ name: 'option.create' }">Create option</router-link>
    <p v-if="errors" class="errors">{{ errors }}</p>
    <table cellspacing="0" cellpadding="0">
        <tr>
            <th class="IDcol">ID</th>
            <th>Name</th>
            <th>Property</th>
            <th></th>
        </tr>
        <tr v-for="option in options" :key="option.id">
            <td class="IDcol">{{ option.id }}</td>
            <td>
                <router-link :to="{ name:'option.show', params:{id: option.id} }">
                    {{ option.name }}
                </router-link>
            </td>
            <td>
                {{ option.property.name }}
            </td>
            <td>
                <router-link :to="{ name:'option.edit', params:{id: option.id} }">
                    update
                </router-link>
                /
                <button @click="deleteOption(option.id)">Delete</button>
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

<script>
import { onMounted } from 'vue';
import useOption from "../../composition/option";

export default {
    setup() {
        const { 
            options, 
            linkPages,
            errors,
            getOptions, 
            destroyOption,
            clearErrors
        } = useOption();
        onMounted(getOptions);

        const goToPage = (url) => {
            if (url != null) {
                getOptions(url);
            }
            clearErrors();
        }
        
        const deleteOption = async (id) => {
            if (!window.confirm('Are you sure?')) {
                return false;
            }
            await destroyOption(id);
            await getOptions();
        }

        return {
            options,
            linkPages,
            errors,
            goToPage,
            deleteOption
        }
    }
}
</script>