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

    return {
        categories,
        linkPages,
        category,
        errors,
        getCategories
    }
}
// {"data":[
//     {"id":3,"name":"test 1qqq","products":[{"id":1,"name":"prod1","description":"long text"},{"id":4,"name":"prod4","description":"long text"}]},
//     {"id":4,"name":"test 2","products":[{"id":3,"name":"prod3","description":"long text"}]},
//     {"id":7,"name":"test 5","products":[{"id":5,"name":"qwertewrtertertert","description":"qwertewrtertertert"}]},
//     {"id":14,"name":"wwwwwwwwwwwwwwww","products":[{"id":6,"name":"admin","description":"werwerwer"}]},
//     {"id":16,"name":"ghjghj","products":[]}
// ],
// "links":{
//     "first":"http:\/\/shopv5\/api\/categories?page=1",
//     "last":"http:\/\/shopv5\/api\/categories?page=2",
//     "prev":null,
//     "next":"http:\/\/shopv5\/api\/categories?page=2"
// },
// "meta":{
//     "current_page":1,
//     "from":1,
//     "last_page":2,
//     "links":[
//         {"url":null,"label":"&laquo; Previous","active":false},
//         {"url":"http:\/\/shopv5\/api\/categories?page=1","label":"1","active":true},
//         {"url":"http:\/\/shopv5\/api\/categories?page=2","label":"2","active":false},
//         {"url":"http:\/\/shopv5\/api\/categories?page=2","label":"Next &raquo;","active":false}
//     ],
//     "path":"http:\/\/shopv5\/api\/categories",
//     "per_page":5,
//     "to":5,
//     "total":10
// }}