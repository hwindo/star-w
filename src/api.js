import axios from 'axios';
import {toArr, toObj} from "./helper";

const baseAPIUrl = 'https://swapi.dev/api/';
const storageName = 'bookmarks';
const resources = ['people', 'films', 'starships', 'vehicles', 'species', 'planets'];

const api = {
    resource: {
        list(name, page) {
            let _page = page ? '?page=' + page : '';
            if (window.fetch) {
                return fetch(baseAPIUrl + name + _page)
                    .then(res => {
                        return Promise.resolve({data: res.json()});
                    })
                    .catch(err => {
                        return Promise.reject(err);
                    });
            } else {
                return axios.get(baseAPIUrl + name + _page);
            }
        },
        get(name, id) {
            return axios.get(baseAPIUrl + name + '/' + id);
        },
        search(text) {
            return Promise.all([
                axios.get(baseAPIUrl + resources[0] + '/?search=' + text),
                axios.get(baseAPIUrl + resources[1] + '/?search=' + text),
                axios.get(baseAPIUrl + resources[2] + '/?search=' + text),
                axios.get(baseAPIUrl + resources[3] + '/?search=' + text),
                axios.get(baseAPIUrl + resources[4] + '/?search=' + text),
                axios.get(baseAPIUrl + resources[5] + '/?search=' + text)
            ]).then(res => {
                console.log('res', res);
                let arr = [];
                arr = arr.concat(res[0].data.results, res[1].data.results, res[2].data.results, res[3].data.results, res[4].data.results, res[5].data.results)
                return Promise.resolve({data: {results: arr}});
            })
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

export {baseAPIUrl, resources, storageName};
export default api;
