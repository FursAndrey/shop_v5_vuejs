import { ref } from "vue";
import axios from 'axios';
import { useRouter } from "vue-router";
import getConfig from './config.js'

export default function useOption() {
    const {
        API_URL,
        OPTION_URL,
        ALL_PROPERTY_URL,
    } = getConfig();
    
    const options = ref([]);
    const allProperties = ref([]);
    const linkPages = ref([]);
    const option = ref([]);
    const router = useRouter();
    const errors = ref('');
    
    const getOptions = async (url = API_URL + OPTION_URL) => {
        let response = await axios.get(url);
        options.value = response.data.data;
        linkPages.value = response.data.meta.links;
    }
    
    const getOption = async (id) => {
        let response = await axios.get(API_URL + OPTION_URL + '/' + id);
        option.value = response.data;
        
        //не согласованы данные на сервере
        response.data.property_id = response.data.property.id;
    }

    const getAllProperties = async () => {
        let response = await axios.get(API_URL + ALL_PROPERTY_URL);
        allProperties.value = response.data;
    }

    const storeOption = async (data) => {
        errors.value = '';
        try {
            await axios.post(API_URL + OPTION_URL, data);
            await router.push({ name: 'option.index' });
        } catch(e) {
            //построчный вывод ошибок
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }

    const updateOption = async (id) => {
        errors.value = '';

        try {
            await axios.put(API_URL + OPTION_URL + '/' + id, option.value);
            await router.push({ name: 'option.index' });
        } catch(e) {
            //построчный вывод ошибок
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }
    
    const destroyOption = async (id) => {
        try {
            clearErrors();
            await axios.delete(API_URL + OPTION_URL + '/' + id);
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
        options,
        linkPages,
        errors,
        option,
        allProperties,
        getOptions,
        getOption,
        storeOption,
        updateOption,
        destroyOption,
        clearErrors,
        getAllProperties
    }
}