import axios from 'axios';

const baseAPIUrl = 'https://swapi.co/api/';

const api = {
    resource: {
        list(name, page) {
            console.log('getting api resource', name, 'page:', page);
            let _page = page ? '?page=' + page : '';
            return axios.get(baseAPIUrl + name + _page);
        },
        get(name, id) {
            return axios.get(baseAPIUrl + name + '/' + id);
        }
    }
};

export default api;