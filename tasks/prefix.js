module.exports = function (grunt) {
  grunt.registerTask('prefix', function () {
    var path_global = require('path');
    var fs = require('fs');
    var parent_dirname = path_global.resolve(__dirname, '..', '..', '..');
    var path = path_global.join(parent_dirname, '/build/');
    // Check whether build folder exists
    if (!fs.existsSync(path)) {
      grunt.fail.fatal('Mixins folder does not exist.');
    }
    // Check whether lesshat.less exists
    if (!fs.existsSync(path + 'lesshat.less')) {
      grunt.fail.fatal('Mixin template does not exist.');
    }
    var mixins = fs.readFileSync(path + 'lesshat.less', 'utf8');
    mixins = mixins.replace(/^\.([a-z0-9-]+\([a-z@., 0-9-]+)/gmi, function (match, sub_1) { return '.lh-' + sub_1; });
    fs.writeFileSync(path + 'lesshat-prefixed.less', mixins);

    grunt.log.ok('Prefixed version – DONE');
  });
};
