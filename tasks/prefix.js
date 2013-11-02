module.exports = function (grunt) {
  grunt.registerTask('prefix', function () {
    var path = path_global.join(__dirname, '/build/');
    // Check whether build folder exists
    if (!fs.existsSync(path)) {
      grunt.fail.fatal('Build folder does not exist.');
    }
    // Check whether lesshat.less exists
    if (!fs.existsSync(path + 'lesshat.less')) {
      grunt.fail.fatal('lesshat.less does not exist.');
    }
    var mixins = fs.readFileSync(path + 'lesshat.less', 'utf8');
    mixins = mixins.replace(/^\.([a-z0-9-]+\([a-z@., 0-9-]+)/gm, function (match, sub_1) { return '.lh-' + sub_1; });
    fs.writeFileSync(path + 'lesshat-prefixed.less', mixins);

    grunt.log.ok('Prefixed version – DONE');
  });
};
