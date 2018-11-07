import axios from 'axios';
import {toArr, toObj} from "./helper";

const baseAPIUrl = 'https://swapi.co/api/';
const storageName = 'bookmarks';

const api = {
    resource: {
        list(name, page) {
            let _page = page ? '?page=' + page : '';
            return axios.get(baseAPIUrl + name + _page);
        },
        get(name, id) {
            return axios.get(baseAPIUrl + name + '/' + id);
        }
    },
    storage: {
        check() {
            return localStorage[storageName];
        },
        load() {
            let objBookmarks = localStorage.getItem(storageName);
            objBookmarks = JSON.parse(objBookmarks);
            return toArr(objBookmarks, 'url');
        },
        save(bookmarks) {
            let newBookmarks = toObj(bookmarks, 'url');
            newBookmarks = JSON.stringify(newBookmarks);
            localStorage.setItem(storageName, newBookmarks);
        },
        clear() {
            localStorage.removeItem(storageName);
        }
    }
};

export {baseAPIUrl};
export default api;