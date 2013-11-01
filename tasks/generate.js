module.exports = function(grunt) {
  grunt.registerTask('generator', function() {

    grunt.task.requires('prompt');

    var config = grunt.config('generator.settings');
    var path = path_global.join(__dirname, '/mixins/');

    // Check whether mixins folder exists
    if (!fs.existsSync(path)) {
      grunt.fail.fatal('Mixins folder does not exist. Try to install the whole workflow again,\nor send issue on github.');
    }

    // Check whether concrete mixin folder exists
    if (fs.existsSync(path + config.mixin_css_name)) {
      grunt.fail.fatal(config.mixin_css_name + ' folder already exists. Choose another name.');
    }

    // Create folder
    var folder = fs.mkdirSync(path + config.mixin_css_name);
    grunt.log.ok('Folder created – DONE');

    // Create files inside folder
    var lesshatdev_path = path_global.resolve(__dirname, './node_modules/lesshat-dev/src/');

    // Check whether mixin template exists
    if (fs.existsSync(lesshatdev_path + 'mixin-template.js')) {
      grunt.fail.fatal('Mixin template does not exist. Try to install the whole workflow again,\nor send issue on github.');
    }

    function fileCreator(mixin_name, path, data, exported, done) {
      var mixin_template_path = path.global.join(path.template, mixin_name + '.js');
      var mixin_template = fs.readFileSync(mixin_template_path, 'utf8');

      mixin_template = mixin_template.replace(/{{\s*(\w+\s*\|?\s*\w+)\s*}}/g, function(match, variable) {
        return (!(config[variable] instanceof Array) && (config[variable])) || (JSON.stringify(data[variable]).replace(/"/g, '\''));
      });
      fs.writeFileSync(path.global.join(path.local, exported.path, exported.file + '.js'), mixin_template);

      if (done) done();
    }

    fileCreator('mixin-template', {
      global: path_global,
      local: path,
      template: lesshatdev_path
    }, config, {
      path: config.mixin_css_name,
      file: config.mixin_css_name
    }, function() {
      grunt.log.ok('Mixin file created – DONE');
    });

    fileCreator('test-template', {
      global: path_global,
      local: path,
      template: lesshatdev_path
    }, config, {
      path: config.mixin_css_name,
      file: 'test'
    }, function() {
      grunt.log.ok('Test file created – DONE');
    });

  });
};
