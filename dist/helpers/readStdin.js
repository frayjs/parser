'use strict';

var readStdinAsync = function (callback) {
  var data = '';
  process.stdin.setEncoding('utf-8');

  process.stdin.on('readable', function () {
    var chunk;

    while ((chunk = process.stdin.read())) {
      data += chunk;
    }
  });

  process.stdin.on('end', function () {
    callback(data);
  });
};

/**
 * readStdinSync()
 *
 * references:
 *
 *   * <http://stackoverflow.com/questions/3430939/node-js-readsync-from-stdin/16048083#16048083>
 *   * <https://github.com/shelljs/shelljs/issues/18#issuecomment-220848692>
 */

var readStdinSync = function () {
  var fs = require('fs');

  var BUFSIZE = 256;
  var buf = new Buffer(BUFSIZE);
  var bytesRead = 0;
  var data = '';

  for (;;) {
    bytesRead = fs.readSync(process.stdin.fd, buf, 0, BUFSIZE);
    if (bytesRead === 0) { break; }
    data += buf.toString(null, 0, bytesRead);
  }

  return data;
};

var readStdin = function (callback) {
  if (typeof callback === 'function') {
    return readStdinAsync(callback);
  }

  return readStdinSync();
};

module.exports = readStdin;
