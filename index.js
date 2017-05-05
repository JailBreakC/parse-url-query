/* url解析类
 * 使用方法
 *
 * var urlQuery = new UrlQuery(window.location.href);
 *
 *
 * urlQuery.push({page: '{{number}}'}).toString(false) # "?page={{number}}"
 *
 * urlQuery.push({page: '{{number}}'}).toString()   # "?page=%7B%7Bnumber%7D%7D"
 *
 * urlQuery.push({test: 'tt'})
 *
 * urlQuery.getObj()                  # {page: "1", test: "tt"}
 *
 * urlQuery.getUrl();                 # "http://example.com/?page=%7B%7Bnumber%7D%7D"
 *
 * urlQuery.del('page').getUrl();           # "http://example.com/?test=tt"
 *
 */


var UrlQuery = function(url) {
  if(!(this instanceof UrlQuery)) {
    return new UrlQuery(url)
  }

  if(!url) {
    url = window.location.href
  }

  var querySplit = url.split('?');
  this._url = querySplit[0];
  this._query = {};

  var getQueryStr = function() {
    var qstr = querySplit[1] ? querySplit[1].split('#')[0] : false
    return qstr || ''
  }

  var getHashStr = function() {
    var hstr = querySplit[1] ? querySplit[1].split('#')[1] : false
    return hstr ? '#' + hstr : ''
  }

  var qstr = getQueryStr()
  this._hash = getHashStr()

  if (!qstr) {
    return this
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

  if (args.length == 2) {
    that._query[args[0]] = args[1];
    return this;
  }
  if (typeof obj == 'object') {
    for (var key in obj) {
      if (!obj.hasOwnProperty(key)) {
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
  for (var query in this._query) {

    if (!this._query.hasOwnProperty(query)) {
      continue;
    }
    var key = query,
      val = this._query[query];

    if (urlEncode) {
      result.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
    } else {
      result.push(key + '=' + val);
    }
  }
  var ret = result.join("&")
  return ret ? '?' + ret : ''

};

UrlQuery.prototype.getUrl = function(urlEncode) {

  return this._url + this.getQuery(urlEncode) + this._hash;

};

UrlQuery.prototype.del = function(key) {

  delete this._query[key];
  return this;

};

UrlQuery.prototype.getStr = UrlQuery.prototype.toString = UrlQuery.prototype.query = UrlQuery.prototype.getQuery

UrlQuery.prototype.getAll = UrlQuery.prototype.getObj;

UrlQuery.prototype.url = UrlQuery.prototype.getUrl

module.exports = UrlQuery