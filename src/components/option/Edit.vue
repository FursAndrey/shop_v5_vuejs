<template>
    <div v-if="errors !== ''">
        <p v-for="(er, field) in errors" :key="field">
            <span v-for="error in er" :key="error" class="text-sm">
                {{ error }}
            </span>
        </p>
    </div>
    <form @submit.prevent="saveOption">
        <h4>Редактирование option {{ $route.params.id }}</h4>
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
            <button style="margin-top: 15px">
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
            errors,
            option,
            allProperties,
            getOption,
            updateOption,
            getAllProperties
        } = useOption();

        const getCurrentOption = () => {
            getOption(props.id);
        }
        

        const saveOption = async () => {
            await updateOption(props.id);
        }

        onMounted(getCurrentOption);
        onMounted(getAllProperties);

        return {
            errors,
            option,
            allProperties,
            saveOption
        }
    }
}
</script>