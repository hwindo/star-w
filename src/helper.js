function extractResource(url) {
    const extractor = new RegExp("https?:\\/\\/swapi.(dev|com?|io|net|org)\\/api/([\\w]+)/?([\\d]+)", 'i');
    let res = url.match(extractor);
    return {
        resource: res[2], // type string - e.g. people, ship etc
        id: res[3]
    }
}

/**
 * converting array to object / hash map
 */
function toObj(arr, key) {
    let res = Object.create(null);
    for (let i = 0, y = arr.length; i < y; i++) {
        res[arr[i][key]] = arr[i];
    }
    return res;
}

/**
 * converting obj to array and sort asc by key
 */
function toArr(obj) {
    let newArr = [];
    for (let key in obj) {
        newArr.push(obj[key]);
    }
    return newArr.sort();
}

function isBookmarked(itemUrl, bookmarks) {
    let arr = bookmarks.filter(item => item.url === itemUrl);
    return arr.length > 0;
}

function scrollTop(e) {
    e.preventDefault();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

let helper = {
    extractResource,
    toArr,
    toObj,
    isBookmarked,
    scrollTop
};

export {extractResource, toArr, toObj, isBookmarked, scrollTop};
export default helper;
