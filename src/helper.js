function extractResource(url) {
    const extractor = new RegExp("https:\\/\\/swapi.co\\/api\/([\\w]+)\/?([\\d]+)", 'i');
    let res = url.match(extractor);
    return {
        resource: res[1],
        id: res[2]
    }
}

let helper = {
    extractResource
};

export {extractResource};
export default helper;
