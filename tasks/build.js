
module.exports = function (grunt) {
  var child_process = require('child_process');
  var exec = child_process.exec;
  var path = require('path');

  grunt.registerTask('build', function () {
    var done = this.async();

    var root_dirname = path.resolve(__dirname, '..');
    var parent_dirname = path.resolve(root_dirname, '..', '..');
    var build_script_path = path.join(root_dirname, 'src', 'build.js');
    var build_result_path = path.join(parent_dirname, 'build', 'lesshat.less');
    var proc;
 
    proc.stderr.on('data', function (chunk) {
      process.stderr.write(chunk);
    });
    proc.on('exit', function (code) {
      if (code !== 0) return done(false);

      console.log('> ' + build_result_path);
      done(true);
    });
  });

};
