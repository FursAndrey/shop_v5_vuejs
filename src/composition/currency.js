import { ref } from "vue";
import axios from 'axios';
import { useRouter } from "vue-router";
import getConfig from './config.js'

export default function useCurrency() {
    const {
        API_URL,
        CURRENCY_URL
    } = getConfig();

    const currencies = ref([]);
    const linkPages = ref([]);
    const currency = ref([]);
    const router = useRouter();
    const errors = ref('');

    const getCurrencies = async (url = API_URL + CURRENCY_URL) => {
        let response = await axios.get(url);
        currencies.value = response.data.data;
        linkPages.value = response.data.meta.links;
    }
    
    const getCurrency = async (id) => {
        let response = await axios.get(API_URL + CURRENCY_URL + '/' + id);
        currency.value = response.data;
    }

    const storeCurrency = async (data) => {
        errors.value = '';
        try {
            await axios.post(API_URL + CURRENCY_URL, data);
            await router.push({ name: 'currency.index' });
        } catch(e) {
            //построчный вывод ошибок
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }

    const updateCurrency = async (id) => {
        errors.value = '';
        
        try {
            await axios.put(API_URL + CURRENCY_URL + '/' + id, currency.value);
            await router.push({ name: 'currency.index' });
        } catch(e) {
            //построчный вывод ошибок
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }
    
    const destroyCurrency = async (id) => {
        try {
            clearErrors();
            await axios.delete(API_URL + CURRENCY_URL + '/' + id);
        } catch(e) {
            //вывод ошибок
            if (e.response.status === 409) {
                errors.value = e.response.data
            }
        }
    }

    const clearErrors = () => {        
        if (errors != null) {
            errors.value = null;
        }
    }

    return {
        currencies,
        linkPages,
        currency,
        errors,
        getCurrencies,
        getCurrency,
        storeCurrency,
        updateCurrency,
        destroyCurrency,
        clearErrors
    }
}