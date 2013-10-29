# LESSHat Dev Stack

## Structure

- *build* – build results
- *mixins* – mixin source files and tests

The mixin source file path pattern is `mixins/%name%/%name%.js` and the test file path pattern is `mixins/%name%/test.js`.

## Building

To build the `build/mixins.less` file which consists of all mixins specified in the `mixins` directory, you can either run `node build.js` directly or use the provided [grunt](http://gruntjs.com) task.

    node build.js
    grunt
    grunt build

## Mixin Source Files

Mixin source files (`mixins/%name%/%name%.js`) are CommonJS modules which have functions as their exports.

The exported function is the argument processing function of the mixin. This function is, by default, used for all browsers. It is possible to specify custom processors for each browser (by its vendor) or prevent some browsers to be included in the mixin result.

~~~js
module.exports = function (value) {
  return value;
};

module.exports.webkit = function (value) {
  return '-webkit-' + value;
};

module.exports.ms = false;
~~~

### Result Processing

There may be a need for a specifying a kind of a fallback to a default value in the resulting expressions. That can be achieved by specifiying a `$result` method on the export.

It is very likely that such function will need access to the processing function for each vendor. There is a special `%vendor` variable that gets replaced in the code. This is supposed to be used in the form `@{process_%vendor}` which references the argument processing function of the mixin for each supported browser group.

An example of a result processing function can be this piece taken from the  `.transition` mixin:

~~~js
module.exports.$result = function () {
  var arg = '@{process_%vendor}' || 'all 0 ease 0';
  if (!/^\w*([ X])/.test(arg)) {
    arg = arg.replace(/,/g, '');
  }
  return arg;
};
~~~

### LESS-only Mixins

There is definitely a lot of mixins that do not require any JavaScript-based processing of input arguments and a simple LESS file is all that's needed.

You can create `mixins/%name%/%name%.less` files instead of JavaScript files and their contents will be simply copied to the resulting LESS file.

~~~less
.border-radius(...) {
  -moz-border-radius: "@{arguments}";
  -o-border-radius: "@{arguments}";
  -webkit-border-radius: "@{arguments}";
  border-radius: "@{arguments}";
}
~~~
