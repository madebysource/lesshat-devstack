/**
 * Requires
 */

var fs = require('fs');
var path = require('path');
var LESSGenerator = require('./less-generator');
var MixinLoader = require('./mixin-loader');

/**
 * Dirs
 */

var parent_dirname = path.resolve(__dirname, '..', '..', '..');
var mixin_dirname = path.join(parent_dirname, 'mixins');

/**
 * Chunk - in this array are all mixin
 */

var chunks = [];

/**
 * Header of mixins
 */

var header_path = path.join(mixin_dirname, 'header.less');
if (fs.existsSync(header_path)) {
  var header = fs.readFileSync(header_path, 'utf8');
  header += '\n// TABLE OF MIXINS:\n';
}

/**
 * Version of mixins
 */

if (process.argv[2] === 'prod') {
  var version_path = path.join(mixin_dirname, 'VERSION');
  if (fs.existsSync(version_path)) {
    var version = parseFloat(fs.readFileSync(version_path, 'utf8'), 10);
    version = (version + 0.1).toFixed(1);
    chunks.push('// version: ' + version);
    fs.writeFileSync(version_path, version, 'utf8');
  }
}

/**
 * Global toggles
 */

chunks.push(LESSGenerator.generateGlobalToggles());

/**
 * Mixin Loader
 */

var loader = new MixinLoader(mixin_dirname);
var mixin_descs = loader.getMixinDescriptors();

mixin_descs.forEach(function(desc) {
  switch (desc.type) {
    case 'less':
      var less = fs.readFileSync(desc.path, 'utf8');
      less = less.trim();
      chunks.push(less);
      break;

    case 'js':
      var mixin = require(desc.path);
      /**
       * LESS Generator
       */
      var generator = new LESSGenerator(mixin, desc.key, desc);
      chunks.push(generator.generate());
      break;
  }
  header += '\t// ' + desc.key + '\n';
});

/**
 * Add header as first
 */

chunks.unshift(header.trim());

/**
 * Fotter of mixins
 */

var footer_path = path.join(mixin_dirname, 'footer.less');
if (fs.existsSync(footer_path)) {
  var footer = fs.readFileSync(footer_path, 'utf8');
  chunks.push(footer.trim());
}

console.log(chunks.join('\n\n'));
