<template>
    <div v-if="errors !== ''">
        <p v-for="(er, field) in errors" :key="field">
            <span v-for="error in er" :key="error" class="text-sm">
                {{ error }}
            </span>
        </p>
    </div>
    <form @submit.prevent>
        <h4>Создание категории</h4>
        <p>
            <input
                v-model="category.name"
                type="text"
                placeholder="Название"
            />
        </p>
        <p>
            <button style="margin-top: 15px" @click="createCategory">
                Сохранить
            </button>
            <router-link :to="{ name: 'category.index' }">
                Закрыть
            </router-link>
        </p>
    </form>
</template>

<script>
import { reactive } from "@vue/runtime-core";
import useCategory from "../../composition/category";
export default {
    setup() {
        let category = reactive({
            'name': '',
        });

        const { errors, storeCategory } = useCategory();

        const createCategory = async () => {
            await storeCategory({...category});
        }

        return {
            errors,
            category,
            createCategory
        }
    }
}
</script>