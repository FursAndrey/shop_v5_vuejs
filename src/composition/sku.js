import { ref } from "vue";
import axios from 'axios';
import { useRouter } from "vue-router";
import getConfig from './config.js'

export default function useSku() {
    const {
        API_URL,
        SKU_URL,
        ALL_PROPERTY_URL,
        ALL_CATEGORIES_URL,
        ALL_PRODUCT_URL,
    } = getConfig();
    
    const skus = ref([]);
    const allProperties = ref([]);
    const allCategories = ref([]);
    const allProducts = ref([]);
    const linkPages = ref([]);
    const sku = ref([]);
    const router = useRouter();
    const errors = ref('');
    
    const getSkus = async (url = API_URL + SKU_URL) => {
        let response = await axios.get(url);
        skus.value = response.data.data;
        linkPages.value = response.data.meta.links;
    }
    
    const getSku = async (id) => {
        let response = await axios.get(API_URL + SKU_URL + '/' + id);
        sku.value = response.data;
        
        //не согласованы данные на сервере
        response.data.product_id = response.data.product.id;
        //доработать
        response.data.option_id = [];
        for (let index = 0; index < response.data.options.length; index++) {
            response.data.option_id.push(response.data.options[index].id);
        }
    }

    const getAllProperties = async () => {
        let response = await axios.get(API_URL + ALL_PROPERTY_URL);
        allProperties.value = response.data;
    }

    const getAllCategories = async () => {
        let response = await axios.get(API_URL + ALL_CATEGORIES_URL);
        allCategories.value = response.data;
    }

    const getAllProducts = async () => {
        let response = await axios.get(API_URL + ALL_PRODUCT_URL);
        allProducts.value = response.data;
    }

    const storeSku = async (data) => {
        errors.value = '';
        try {
            await axios.post(API_URL + SKU_URL, data);
            await router.push({ name: 'sku.index' });
        } catch(e) {
            //построчный вывод ошибок
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }

    const updateSku = async (id) => {
        errors.value = '';

        try {
            await axios.put(API_URL + SKU_URL + '/' + id, sku.value);
            await router.push({ name: 'sku.index' });
        } catch(e) {
            //построчный вывод ошибок
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }
    
    const destroySku = async (id) => {
        try {
            clearErrors();
            await axios.delete(API_URL + SKU_URL + '/' + id);
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
        skus,
        linkPages,
        errors,
        sku,
        allProperties,
        allCategories,
        allProducts,
        getSkus,
        getSku,
        storeSku,
        updateSku,
        destroySku,
        clearErrors,
        getAllProperties,
        getAllCategories,
        getAllProducts,
    }
}