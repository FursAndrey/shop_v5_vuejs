<template>
    <div class="errors" v-if="errors !== ''">
        <p v-for="(er, field) in errors" :key="field">
            <span v-for="error in er" :key="error" class="text-sm">
                {{ error }}
            </span>
        </p>
    </div>
    <form @submit.prevent>
        <h4>Создание property</h4>
        <p>
            <input
                v-model="property.name"
                type="text"
                placeholder="Название"
            />
        </p>
        <p>
            <button style="margin-top: 15px" @click="createProperty">
                Сохранить
            </button>
            <router-link :to="{ name: 'property.index' }">
                Закрыть
            </router-link>
        </p>
    </form>
</template>

<script>
import { reactive } from "@vue/runtime-core";
import useProperty from "../../composition/property";
export default {
    setup() {
        let property = reactive({
            'name': '',
        });

        const { errors, storeProperty } = useProperty();

        const createProperty = async () => {
            await storeProperty({...property});
        }

        return {
            errors,
            property,
            createProperty
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