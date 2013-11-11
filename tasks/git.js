module.exports = function(grunt) {
  grunt.registerTask('git', function() {
    var child_process = require('child_process');
    var exec = child_process.exec;
    var version = grunt.config('version').settings.version;
    var done = this.async();

    // git tag
    var command_gitcommit = 'git add .; git commit -m "Version %%%"'.replace('%%%', version);
    var command_gittag = 'git tag -a v' + version + ' -m "Version %%%"'.replace('%%%', version);
    exec(command_gitcommit, function(error, stdout, stderr) {
      if (error !== null) {
        console.log('exec error: ' + error);
        return false;
      }
      exec(command_gittag, function(error, stdout, stderr) {
        if (error !== null) {
          console.log('exec error: ' + error);
        }
        done();
      });
    });

    grunt.log.ok('Git tag added!');

  });
};
