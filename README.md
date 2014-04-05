## Jbm (under planning stage)
JavaScript benchmark tool. Jbm combines the fancy Webworker and DOMHighResTimeStamp to test performance.

## Installation

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

#### runTest(name, fn)
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
`fn` also accepts an optional argument `done`. If you specified `done` in the argument list, the test case will be marked finished only when the `done` is called. This is super great when you are testing async functions.

```
jbm.runTest('TestAsync', function(done) {
  doSomeThingAsync(function() {
    done();
  });
});
```

## Reporter
Once the test case finishes, reporter will output the time usage in the following format.

```
[name] => [time used]
```

For example:

```
Test1 => 9386.461999965832
```

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
