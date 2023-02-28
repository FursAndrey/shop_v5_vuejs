import { ref } from "vue";
import axios from 'axios';
import { useRouter } from "vue-router";
import getConfig from './config.js'

export default function useCategory() {
    const {
        API_URL,
        CATEGORY_URL
    } = getConfig();

    const categories = ref([]);
    const linkPages = ref([]);
    const category = ref([]);
    const router = useRouter();
    const errors = ref('');

    const getCategories = async (url = API_URL + CATEGORY_URL) => {
        let response = await axios.get(url);
        categories.value = response.data.data;
        linkPages.value = response.data.meta.links;
    }
    
    const getCategory = async (id) => {
        let response = await axios.get(API_URL + CATEGORY_URL + '/' + id);
        category.value = response.data;
    }

    const storeCategory = async (data) => {
        errors.value = '';
        try {
            await axios.post(API_URL + CATEGORY_URL, data);
            await router.push({ name: 'category.index' });
        } catch(e) {
            //построчный вывод ошибок
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }

    const updateCategory = async (id) => {
        errors.value = '';
        
        try {
            await axios.put(API_URL + CATEGORY_URL + '/' + id, category.value);
            await router.push({ name: 'category.index' });
        } catch(e) {
            //построчный вывод ошибок
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }
    
    const destroyCategory = async (id) => {
        try {
            clearErrors();
            await axios.delete(API_URL + CATEGORY_URL + '/' + id);
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
        categories,
        linkPages,
        category,
        errors,
        getCategories,
        getCategory,
        storeCategory,
        updateCategory,
        destroyCategory,
        clearErrors
    }
}