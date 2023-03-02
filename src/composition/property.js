import { ref } from "vue";
import axios from 'axios';
import { useRouter } from "vue-router";
import getConfig from './config.js'

export default function useProperty() {
    const {
        API_URL,
        PROPERTY_URL
    } = getConfig();
    
    const properties = ref([]);
    const linkPages = ref([]);
    const property = ref([]);
    const router = useRouter();
    const errors = ref('');
    
    const getProperties = async (url = API_URL + PROPERTY_URL) => {
        let response = await axios.get(url);
        properties.value = response.data.data;
        linkPages.value = response.data.meta.links;
    }
    
    const getProperty = async (id) => {
        let response = await axios.get(API_URL + PROPERTY_URL + '/' + id);
        property.value = response.data;
    }

    const storeProperty = async (data) => {
        errors.value = '';
        try {
            await axios.post(API_URL + PROPERTY_URL, data);
            await router.push({ name: 'property.index' });
        } catch(e) {
            //построчный вывод ошибок
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }

    const updateProperty = async (id) => {
        errors.value = '';
        
        try {
            await axios.put(API_URL + PROPERTY_URL + '/' + id, property.value);
            await router.push({ name: 'property.index' });
        } catch(e) {
            //построчный вывод ошибок
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }
    
    const destroyProperty = async (id) => {
        try {
            clearErrors();
            await axios.delete(API_URL + PROPERTY_URL + '/' + id);
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
        properties,
        linkPages,
        errors,
        property,
        getProperties,
        getProperty,
        storeProperty,
        updateProperty,
        destroyProperty,
        clearErrors
    }
}