var path = require('path');
var TestSuite = require('./test-suite');


var tester = new TestSuite();

var parent_dirname = path.resolve(__dirname, '..', '..', '..');
var build_result_path = path.join(parent_dirname, 'build', 'lesshat.less');
tester.addBuildResult(build_result_path);

global.test = tester;
