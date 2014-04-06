## Jbm 
JavaScript benchmark tool. Jbm will tell you how long does your test case run with a precision of **10 µs**.

## Installation
You can use it as a AMD style module, simply reference it via `require` function.

```
require(['path/to/module/jbm'], function(jbm) {

});
```

Or use it as a standalone library.

```
<script src="//path/to/jbm/jbm.js"></script>
```

Because you will only use jbm in development stage, I don't think it is necessary to offer a minified version of Jbm. And it is already really small, isn't it? ;)

## Usage
If `window.define` is detected, then you can use AMD style module loader.

```
define('myModule', ['jbm'], function (jbm) {
    return ...;
});
```

If `window.define` is not detected, then you can reference jbm via `window.jbm`

```
var jbm = window.jbm
```

## API
#### noConflict
If you don't want Jbm pollute your `window` object, you can use `noConflict` to restore `window.jbm`. `noConflict` also returns `jbm` object itself.

```
(function(window) {
  var jbm = window.jbm.noConflict();
})(window);
```

#### runTest(name, fn[, reporterCallback])
Start a test. `name` would be the name of the test, which helps you distinguish test cases.  
You have to put all code to be tested in the `fn` function, the main body of the test case. 

```
jbm.runTest('Test1', function() {
  var i;
  for (i = 0; i < 1000; i ++) {
    doSomeThing();
  }
});
```

When the test case finishes, the reporter will tell you how long does your test case run with a precision of **10 µs**.  
`fn` also accepts an optional argument `done`. If you specified `finish` in the argument list, the test case will be marked finished only when the `done` is called. This is super great when you are testing async functions.

```
jbm.runTest('TestAsync', function(done) {
  doSomeThingAsync(function() {
    done();
  });
});
```

You can pass in a callback function `reporterCallback`, which accepts two parameters `name` as the first parameter and `timeUsed` as the second parameter. If `reporterCallback` is specified, the built-in reporter will not output the results. Instead, you can customize the way you handle the result (such as writing result to a file).  

```
jbm.runTest('TestAsync', function(done) {
  doSomeThingAsync(function() {
    done();
  });
}, function(name, timeUsed) {
  writeToFile(name + " => " + timeUsed);
});
```

> Jbm test cases run asynchronously.

## Reporter
Once the test case finishes, reporter will output the time usage in the following format.

```
[name] => [time used]
```

For example:

```
Test1 => 9386.461999965832
```

## Testing

Jbm uses karma test runner to run test.

```
$ [sudo] npm install
$ karma start karma.conf.js
```

## Contributing

Submit issues & feature request on github. If you want, you can send me a lovely pull request.

- Fork this repo
- Do some awesome thing
- Create a pull request
- Waiting for review

## Browser compability

- Chrome 6
- FireFox 7
- Opera 15
- Internet Explorer 10
- __No support for Safari__

## MIT License
The MIT License (MIT)

Copyright (c) 2014 John Wu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
