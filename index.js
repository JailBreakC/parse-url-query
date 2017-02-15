/* url解析类
 * 使用方法
 *
 * var urlQuery = new UrlQuery(window.location.href);
 *
 *
 * urlQuery.push({page: '{{number}}'}).toString(false) # "?page={{number}}"
 *
 * urlQuery.push({page: '{{number}}'}).toString()      # "?page=%7B%7Bnumber%7D%7D"
 *
 * urlQuery.push({test: 'tt'})
 *
 * urlQuery.getObj()                                   # {page: "1", test: "tt"}
 *
 * urlQuery.getUrl();                                  # "http://example.com/?page=%7B%7Bnumber%7D%7D"
 *
 * urlQuery.del('page').getUrl();                      # "http://example.com/?test=tt"
 *
 */


var UrlQuery = function(url) {
    this._url = url.split('?')[0];
    this._query = {};
    var qstr = url.split('?')[1] || '';

    if(!qstr) {
    	return
    }

    var a = qstr.split('&');

    for (var i = 0; i < a.length; i++) {
        var b = a[i].split('=');
        this._query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
    }
};

// params: {'key': 'value'}
// params: 'key', 'value'
UrlQuery.prototype.push = function(obj) {
	var that = this;
    var args = Array.prototype.slice.call(arguments)

    if(args.length == 2) {
        that._query[args[0]] = args[1];
        return this;
    }
    if(typeof obj == 'object') {
        for(var key in obj) {
            if(!obj.hasOwnProperty(key)) {
                continue;
            }
            var key = key,
                val = obj[key];
            that._query[key] = val;
        }
	   return this;
    }
    throw new Error('Unexpected params');
};

UrlQuery.prototype.get = function(key) {

    return this._query[key];

};

UrlQuery.prototype.getObj = function() {

    return this._query;

};


UrlQuery.prototype.getQuery = function(urlEncode) {

	urlEncode = urlEncode === undefined ? true : urlEncode;
    var result = [];
    for(var query in this._query) {
    	
    	if(!this._query.hasOwnProperty(query)) {
            continue;
    	}
    	var key = query,
    		val = this._query[query];

    	if(urlEncode) {
			result.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
		} else {
			result.push(key + '=' + val);
		}
    }
    return ('?' + result.join("&"));

};

UrlQuery.prototype.getUrl = function(urlEncode) {

    return this._url + this.getQuery(urlEncode);

};

UrlQuery.prototype.del = function(key) {

	delete this._query[key];
	return this;

};

UrlQuery.prototype.getStr = UrlQuery.prototype.toString = UrlQuery.prototype.query = UrlQuery.prototype.getQuery 

UrlQuery.prototype.getAll = UrlQuery.prototype.getObj;

UrlQuery.prototype.url = UrlQuery.prototype.getUrl

module.exports = function (url) {
    if(url) {
        return new UrlQuery(url);
    }
    if(typeof window == 'undefined') {
        throw new Error('Can\'t not find window.location.href');
    }
    if(window && window.location && window.location.href) {
        return new UrlQuery(window.location.href);
    }
    throw new Error('Unexpected Error');
};