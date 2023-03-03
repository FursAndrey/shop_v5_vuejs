<template>
    <div class="errors" v-if="errors !== ''">
        <p v-for="(er, field) in errors" :key="field">
            <span v-for="error in er" :key="error" class="text-sm">
                {{ error }}
            </span>
        </p>
    </div>
    <form @submit.prevent="saveCurrency">
        <h4>Редактирование валюты {{ $route.params.id }}</h4>
        <p>
            <input
                v-model="currency.code"
                type="text"
                placeholder="Название"
            />
        </p>
        <p>
            <input
                v-model="currency.rate"
                type="text"
                placeholder="Курс"
            />
        </p>
        <p>
            <button style="margin-top: 15px">
                Сохранить
            </button>
            <router-link :to="{ name: 'currency.index' }">
                Закрыть
            </router-link>
        </p>
    </form>
</template>

<script>
import { onMounted } from 'vue';
import useCurrency from "../../composition/currency";

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
            currency,
            getCurrency,
            updateCurrency
        } = useCurrency();

        const getCurrentCurrency = () => {
            getCurrency(props.id);
        }
        

        const saveCurrency = async () => {
            await updateCurrency(props.id);
        }

        onMounted(getCurrentCurrency);

        return {
            errors,
            currency,
            saveCurrency
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