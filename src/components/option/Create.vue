<template>
    <div class="errors" v-if="errors !== ''">
        <p v-for="(er, field) in errors" :key="field">
            <span v-for="error in er" :key="error" class="text-sm">
                {{ error }}
            </span>
        </p>
    </div>
    <form @submit.prevent>
        <h4>Создание option</h4>
        <p>
            <input
                v-model="option.name"
                type="text"
                placeholder="Название"
            />
        </p>
        <p>Property</p>
        <p>
            <select v-model="option.property_id">
                <option v-for="property in allProperties" :key="property.id" :value="property.id">{{ property.name }}</option>
            </select>
        </p>
        <p>
            <button style="margin-top: 15px" @click="createOption">
                Сохранить
            </button>
            <router-link :to="{ name: 'option.index' }">
                Закрыть
            </router-link>
        </p>
    </form>
</template>

<script>
import { onMounted } from 'vue';
import { reactive } from "@vue/runtime-core";
import useOption from "../../composition/option";
export default {
    setup() {
        let option = reactive({
            'name': '',
            'property_id': '',
        });

        const { 
            errors,
            allProperties,
            storeOption,
            getAllProperties
        } = useOption();

        const createOption = async () => {
            await storeOption({...option});
        }
        onMounted(getAllProperties);

        return {
            errors,
            option,
            allProperties,
            createOption,
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