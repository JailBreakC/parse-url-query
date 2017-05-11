var should = require('should');
var UrlQuery = require('./index.js');

describe('urlQuery', function () {
  var urlQuery = UrlQuery('https://www.insta360.com?foo=oof&bar=rab')

  it('should init whit params', function() {
    urlQuery.getObj().should.have.properties({
      foo: 'oof',
      bar: 'rab'
    })
  })

  it('should push obj in params', function() {
    urlQuery.push({'someParam': 'someValue'}).getObj().should.have.properties({
      someParam: 'someValue',
      foo: 'oof',
      bar: 'rab'
    })
  })

  it('should del obj in params', function() {
    urlQuery.del('someParam').getObj().should.not.have.properties({
      someParam: 'someValue'
    })
  })

  it('should get a string params value', function() {
    urlQuery.get('foo').should.equal('oof')
  })

  it('should get a full url string', function() {
    urlQuery.getUrl().should.equal('https://www.insta360.com?foo=oof&bar=rab')
  })

  it('should maintain hash value', function() {
    var urlQuery = UrlQuery('https://www.insta360.com?foo=oof&bar=rab#hash')
    urlQuery.getUrl().should.equal('https://www.insta360.com?foo=oof&bar=rab#hash')
  })

  it('should not have params', function() {
    var urlQuery = UrlQuery('https://www.insta360.com#hash')
    urlQuery.getUrl().should.equal('https://www.insta360.com#hash')
  })

  it('should not have params and hash', function() {
    var urlQuery = UrlQuery('https://www.insta360.com')
    urlQuery.getUrl().should.equal('https://www.insta360.com')
  })

  it('should not encode URL params', function() {
    var urlQuery = UrlQuery('https://www.insta360.com')
    urlQuery.push({page: '{{number}}'}).toString(false).should.equal('?page={{number}}')
  })

  it('should encode URL params', function() {
    var urlQuery = UrlQuery('https://www.insta360.com')
    urlQuery.push({page: '{{number}}'}).toString().should.equal('?page=%7B%7Bnumber%7D%7D')
  })

  it('should work with new or not', function() {
    var urlQuery = new UrlQuery('https://www.insta360.com')
    urlQuery.getUrl().should.equal('https://www.insta360.com')
  })
})