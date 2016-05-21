'use strict';

var stdout = function (output) {
  process.stdout.write(output + '\n');
};

module.exports = stdout;
