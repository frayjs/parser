'use strict';

var parser = require('../tmp/build/parser');
var stdout = require('../src/cli/helpers/stdout');

var parse = function (source) {
  stdout(JSON.stringify(parser.parse(source), null, 2));
};

parse('<div class="greeting">Hello world!</div>');
