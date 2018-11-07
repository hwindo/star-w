import axios from 'axios';

const baseAPIUrl = 'https://swapi.co/api/';

const api = {
    resource: {
        list(name, page) {
            console.log('getting api resource', name, page);
            let _page = page ? '?page' + page : '';
            return axios.get(baseAPIUrl + name + _page);
        }
    }
};

export default api;