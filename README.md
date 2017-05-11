# parse-url-query 

[![Build Status](https://travis-ci.org/JailBreakC/parse-url-query.svg?branch=master)](https://travis-ci.org/JailBreakC/parse-url-query)

A url-query parser

### Method

```js
var urlQuery = new UrlQuery('http://example.com?foo=oof&bar=rab')

urlQuery.push({page: '{{number}}'}).toString() /* "?foo=oof&bar=rab&page=%7B%7Bnumber%7D%7D" */

urlQuery.push({page: '{{number}}'}).toString(false) /* "?foo=oof&bar=rab&page={{number}}" */

urlQuery.push({test: 'value'})                      

urlQuery.getObj() /* {test: "value", foo: "oof", bar: "rab", page: "{{number}}"} */

urlQuery.getUrl() /* "http://example.com?test=value&foo=oof&bar=rab&page=%7B%7Bnumber%7D%7D" */

urlQuery.del('page').getUrl() /* "http://example.com?test=value&foo=oof&bar=rab" */
```