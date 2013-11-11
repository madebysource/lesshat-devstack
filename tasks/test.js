module.exports = function(grunt) {
  var child_process = require('child_process');
  var exec = child_process.exec;
  var path = require('path');

  grunt.registerTask('test', function() {
    var done = this.async();

    var parent_dirname = path.resolve(__dirname, '..', '..', '..');
    var mixin_dirname = path.join(parent_dirname, 'mixins');
    var setup_path = path.resolve(__dirname, '..', 'src', 'test-env.js');

    var listTests = exec('find ' + mixin_dirname + ' -name test.js');
    var test_list_data = '';
    listTests.stdout.on('data', function(chunk) {
      test_list_data += chunk;
    });
    listTests.stderr.on('data', function(chunk) {
      process.stderr.write(chunk);
    });
    listTests.on('exit', function(code) {
      if (code !== 0) return done(false);

      var test_list = test_list_data.trim().split(/\r?\n/);
      var mocha_args = ('-c -R spec -s 1000 -r ' + setup_path).split(' ');
      mocha_args = mocha_args.concat(test_list);

      console.log('$ mocha ' + mocha_args.join(' '));

      var proc = exec(path.join(parent_dirname, 'node_modules', '.bin', 'mocha') + ' ' + mocha_args.join(' '));
      proc.stdout.on('data', function(chunk) {
        process.stdout.write(chunk);
      });
      proc.stderr.on('data', function(chunk) {
        process.stdout.write(chunk);
      });
      proc.on('exit', function(code) {
        done(code === 0);
      });
    });
  });
};
