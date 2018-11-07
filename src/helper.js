function extractResource(url) {
    const extractor = new RegExp("https:\\/\\/swapi.co\\/api\/([\\w]+)\/?([\\d]+)", 'i');
    let res = url.match(extractor);
    return {
        resource: res[1],
        id: res[2]
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

let helper = {
    extractResource,
    toArr,
    toObj,
    isBookmarked
};

export {extractResource, toArr, toObj, isBookmarked};
export default helper;
