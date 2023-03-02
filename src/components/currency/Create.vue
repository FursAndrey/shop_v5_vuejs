<template>
    <div class="errors" v-if="errors !== ''">
        <p v-for="(er, field) in errors" :key="field">
            <span v-for="error in er" :key="error" class="text-sm">
                {{ error }}
            </span>
        </p>
    </div>
    <form @submit.prevent>
        <h4>Создание валюты</h4>
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
            <button style="margin-top: 15px" @click="createCurrency">
                Сохранить
            </button>
            <router-link :to="{ name: 'currency.index' }">
                Закрыть
            </router-link>
        </p>
    </form>
</template>

<script>
import { reactive } from "@vue/runtime-core";
import useCurrency from "../../composition/currency";
export default {
    setup() {
        let currency = reactive({
            'name': '',
        });

        const { errors, storeCurrency } = useCurrency();

        const createCurrency = async () => {
            await storeCurrency({...currency});
        }

        return {
            errors,
            currency,
            createCurrency
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