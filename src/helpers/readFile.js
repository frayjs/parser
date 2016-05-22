'use strict';

var fs = require('fs');
var path = require('path');

var readFile = function () {
  var args = [].slice.call(arguments);
  var paths = [process.cwd()].concat(args);
  var filepath = path.resolve.apply(null, paths);
  return fs.readFileSync(filepath, 'utf8');
};

module.exports = readFile;
