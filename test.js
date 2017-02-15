var UrlQuery = require('./index.js');

var urlQuery = UrlQuery('https://www.insta360.com?foo=oof&bar=rab')

if (urlQuery.push({'someParam': 'someValue'}).getStr() != '?foo=oof&bar=rab&someParam=someValue') {
  throw new Error('Test fail');
}
if (urlQuery.push('otherParam', 'otherValue').getStr() != '?foo=oof&bar=rab&someParam=someValue&otherParam=otherValue') {
  throw new Error('Test fail');
}
if (urlQuery.del('foo').getStr() != '?bar=rab&someParam=someValue&otherParam=otherValue') {
  throw new Error('Test fail');
}
if (urlQuery.get('bar') != 'rab') {
  throw new Error('Test fail');
}
if (urlQuery.getUrl() != 'https://www.insta360.com?bar=rab&someParam=someValue&otherParam=otherValue') {
  throw new Error('Test fail');
}
if(JSON.stringify(urlQuery.getObj()) != '{"bar":"rab","someParam":"someValue","otherParam":"otherValue"}') {
  throw new Error('Test fail');
}

console.log('Test complete');