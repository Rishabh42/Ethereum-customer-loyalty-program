class APICaller {
    setToken(_token){
        this.token = _token;
    }
    apiRequest(options) {
        let { url, method, data, headers } = options;
        headers = headers || {};
if(!options.isUpload){
        let newHeaders = Object.assign({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': this.token
        }, headers);

        return fetch(url, { method: method || "GET", headers: newHeaders, body: data });
    }else{
        return fetch(url, { method: method, headers: {
            'Accept': 'application/json',
            'x-access-token': this.token
        }, body: data });
    }
    }
    
}
export default new APICaller();
