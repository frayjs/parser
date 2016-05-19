'use strict';

var parser = require('../dist/parser');

var stdout = function (output) {
  process.stdout.write(output + '\n');
};

stdout(parser.parse('<div class="greeting">Hello world!</div>'));
