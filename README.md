# parse-url-query
a url-query parser
 
## url解析类

### 使用方法

	var urlQuery = new UrlQuery(window.location.href);


	urlQuery.push({page: '{{number}}'}).toString(false) # "?page={{number}}"

	urlQuery.push({page: '{{number}}'}).toString()      # "?page=%7B%7Bnumber%7D%7D"

	urlQuery.push({test: 'tt'})

	urlQuery.getObj()                                   # {page: "1", test: "tt"}

	urlQuery.getUrl();                                  # "http://example.com/?page=%7B%7Bnumber%7D%7D"

	urlQuery.del('page').getUrl();                      # "http://example.com/?test=tt"
