var fs = require('fs');
var path = require('path');


var MixinLoader = function (dirname) {
  this.dirname_ = dirname;
};


MixinLoader.prototype.getMixinKeys = function () {
  var mixin_descs = this.getMixinDescriptors();
  return mixin_descs.map(function (desc) {
    return desc.key;
  });
};


MixinLoader.prototype.getMixinDescriptors = function () {
  var mixin_descs = [];

  var dirs = fs.readdirSync(this.dirname_).sort();
  dirs.forEach(function (dir) {
    var mixin_path_noext = path.join(this.dirname_, dir, dir);

    var type = null;
    if (fs.existsSync(mixin_path_noext + '.less')) {
      type = 'less';
    } else if (fs.existsSync(mixin_path_noext + '.js')) {
      type = 'js';
    }

    if (type) {
      mixin_descs.push({
        key: dir,
        type: type,
        path: mixin_path_noext + '.' + type
      });
    }

  }, this);

  return mixin_descs;
};


module.exports = MixinLoader;
