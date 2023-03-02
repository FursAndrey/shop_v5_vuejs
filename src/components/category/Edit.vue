<template>
    <div class="errors" v-if="errors !== ''">
        <p v-for="(er, field) in errors" :key="field">
            <span v-for="error in er" :key="error" class="text-sm">
                {{ error }}
            </span>
        </p>
    </div>
    <form @submit.prevent="saveCategory">
        <h4>Редактирование категории {{ $route.params.id }}</h4>
        <p>
            <input
                v-model="category.name"
                type="text"
                placeholder="Название"
            />
        </p>
        <p>
            <button style="margin-top: 15px">
                Сохранить
            </button>
            <router-link :to="{ name: 'category.index' }">
                Закрыть
            </router-link>
        </p>
    </form>
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
            errors,
            category,
            getCategory,
            updateCategory
        } = useCategory();

        const getCurrentCategory = () => {
            getCategory(props.id);
        }
        

        const saveCategory = async () => {
            await updateCategory(props.id);
        }

        onMounted(getCurrentCategory);

        return {
            errors,
            category,
            saveCategory
        }
    }
}
</script>

<style scoped>
.errors {
    color: #c50000;
    padding: 5px;
    background: #ffb1b1;
    border: 2px solid red;
    border-radius: 10px;
    margin: 5px 0;
}
</style>