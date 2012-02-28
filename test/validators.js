;(function() {

  module('general')
  
  test('can change default error messages', function() {
    var originalMessage = Form.validators.errMessages.required;
    
    Form.validators.errMessages.required = 'Foo'
    
    var required = Form.validators.required()
    equal(required('').message, 'Foo')
    
    //Restore original message
    Form.validators.errMessages.required = originalMessage;
  })
  
})();


;(function() {

  module('required')
  
  var required = Form.validators.required()

  test('error if field is null or undefined', function() {
    ok(required(null))
    ok(required())
  })
  
  test('error if field is empty string', function() {
    ok(required(''))
    equal(required('test', undefined))
  })
  
  test('ok if field is number 0', function() {
    equal(required(0), undefined)
  })
  
  test('ok if field is boolean', function() {
    equal(required(false), undefined)
    equal(required(true), undefined)
  })

})();


;(function() {

  module('regexp')
  
  var fn = Form.validators.regexp({
    regexp: /foo/
  });

  test('passes empty values', function() {
    equal(fn(''), undefined)
    equal(fn(null), undefined)
    equal(fn(undefined), undefined)
  })
  
  test('fails invalid strings', function() {
    equal(fn('gsurkbfsr').type, 'regexp')
    equal(fn('guerbayf').message, 'Invalid')
  })
  
  test('passes valid strings', function() {
    equal(fn('foo'), undefined)
    equal(fn('_foo_'), undefined)
  })

})();


;(function() {
  module('email')
  
  var fn = Form.validators.email()
  
  test('passes empty values', function() {
    equal(fn(''), undefined)
    equal(fn(null), undefined)
    equal(fn(undefined), undefined)
  })
  
  test('accepts valid emails', function() {
    ok(fn('invalid'))
    ok(fn('email@example'))
    ok(fn('foo/bar@example.com'))
    ok(fn('foo?bar@example.com'))
    ok(fn('foo@exa#mple.com'))
    ok(fn(234))
  })
  
  test('fails invalid emails', function() {
    equal(fn('test@example.com'), undefined)
    equal(fn('john.smith@example.com'), undefined)
    equal(fn('john.smith@example.co.uk'), undefined)
    equal(fn('john-smith@example.com'), undefined)
  })
  
})();


;(function() {
  module('url')
  
  var fn = Form.validators.url()
  
  test('passes empty values', function() {
    equal(fn(''), undefined)
    equal(fn(null), undefined)
    equal(fn(undefined), undefined)
  })
  
  test('accepts valid urls', function() {
    ok(fn('invalid'))
    ok(fn('example.com'))
    ok(fn('www.example.com'))
    ok(fn('htp://example.com'))
    ok(fn('http://example'))
    ok(fn(234))
  })
  
  test('fails invalid url', function() {
    equal(fn('http://example.com'), undefined)
    equal(fn('http://example.co.uk'), undefined)
    equal(fn('http://www.example.com'), undefined)
    equal(fn('http://subdomain.domain.co.uk'), undefined)
    equal(fn('http://example.com/path'), undefined)
    equal(fn('http://www.example.com/path/1/2'), undefined)
    equal(fn('http://www.example.com/path/1/2?q=str'), undefined)
  })
  
})();


;(function() {
  module('match')
  
  var fn = Form.validators.match({
    field: 'confirm'
  });
  
  test('passes empty values', function() {
    equal(fn(''), undefined)
    equal(fn(null), undefined)
    equal(fn(undefined), undefined)
  })
  
  test('accepts when fields match', function() {
    var attrs = {
      password: 'foo',
      confirm: 'foo'
    };
    
    equal(fn('foo', attrs), undefined)
  })
  
  test('fails when fields dont match', function() {
    var attrs = {
      password: 'foo',
      confirm: 'bar'
    };
    
    var err = fn('foo', attrs)
    
    equal(err.type, 'match')
    equal(err.message, 'Must match field "confirm"')
  })
})();
