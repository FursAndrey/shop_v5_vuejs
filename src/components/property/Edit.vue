<template>
    <div v-if="errors !== ''">
        <p v-for="(er, field) in errors" :key="field">
            <span v-for="error in er" :key="error" class="text-sm">
                {{ error }}
            </span>
        </p>
    </div>
    <form @submit.prevent="saveProperty">
        <h4>Редактирование property {{ $route.params.id }}</h4>
        <p>
            <input
                v-model="property.name"
                type="text"
                placeholder="Название"
            />
        </p>
        <p>
            <button style="margin-top: 15px">
                Сохранить
            </button>
            <router-link :to="{ name: 'property.index' }">
                Закрыть
            </router-link>
        </p>
    </form>
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
            errors,
            property,
            getProperty,
            updateProperty
        } = useProperty();

        const getCurrentProperty = () => {
            getProperty(props.id);
        }
        

        const saveProperty = async () => {
            await updateProperty(props.id);
        }

        onMounted(getCurrentProperty);

        return {
            errors,
            property,
            saveProperty
        }
    }
}
</script>