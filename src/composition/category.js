import { ref } from "vue";
import axios from 'axios';
import { useRouter } from "vue-router";

export default function useCategory() {
    const categories = ref([]);
    const linkPages = ref([]);
    const category = ref([]);
    const router = useRouter();
    const errors = ref('');

    const getCategories = async (url = 'http://shopv5/api/categories') => {
        let response = await axios.get(url);
        categories.value = response.data.data;
        linkPages.value = response.data.meta.links;
    }
    
    const getCategory = async (id) => {
        let response = await axios.get('http://shopv5/api/categories/' + id);
        category.value = response.data;
    }

    const storeCategory = async (data) => {
        errors.value = '';
        try {
            await axios.post('http://shopv5/api/categories', data);
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
            await axios.delete('http://shopv5/api/categories/'+id);
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
        destroyCategory,
        clearErrors
    }
}