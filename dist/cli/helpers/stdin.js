'use strict';

var stdin = function (callback) {
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

module.exports = stdin;
