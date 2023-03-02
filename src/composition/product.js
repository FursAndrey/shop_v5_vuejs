import { ref } from "vue";
import axios from 'axios';
import { useRouter } from "vue-router";
import getConfig from './config.js'

export default function useProduct() {
    const {
        API_URL,
        PRODUCT_URL,
        ALL_PROPERTY_URL,
        ALL_CATEGORIES_URL,
    } = getConfig();
    
    const products = ref([]);
    const allProperties = ref([]);
    const allCategories = ref([]);
    const linkPages = ref([]);
    const product = ref([]);
    const router = useRouter();
    const errors = ref('');
    
    const getProducts = async (url = API_URL + PRODUCT_URL) => {
        let response = await axios.get(url);
        products.value = response.data.data;
        linkPages.value = response.data.meta.links;
    }
    
    const getProduct = async (id) => {
        let response = await axios.get(API_URL + PRODUCT_URL + '/' + id);
        product.value = response.data;
        
        //не согласованы данные на сервере
        response.data.category_id = response.data.category.id;
        response.data.property_id = [];
        for (let index = 0; index < response.data.properties.length; index++) {
            response.data.property_id.push(response.data.properties[index].id);
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

    const storeProduct = async (data) => {
        errors.value = '';
        try {
            await axios.post(API_URL + PRODUCT_URL, data);
            await router.push({ name: 'product.index' });
        } catch(e) {
            //построчный вывод ошибок
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }

    const updateProduct = async (id) => {
        errors.value = '';

        try {
            await axios.put(API_URL + PRODUCT_URL + '/' + id, product.value);
            await router.push({ name: 'product.index' });
        } catch(e) {
            //построчный вывод ошибок
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }
    
    const destroyProduct = async (id) => {
        try {
            clearErrors();
            await axios.delete(API_URL + PRODUCT_URL + '/' + id);
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
        products,
        linkPages,
        errors,
        product,
        allProperties,
        allCategories,
        getProducts,
        getProduct,
        storeProduct,
        updateProduct,
        destroyProduct,
        clearErrors,
        getAllProperties,
        getAllCategories
    }
}