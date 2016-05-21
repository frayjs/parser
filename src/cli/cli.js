#!/usr/bin/env node
'use strict';

var parser = require('../parser');
var stdin = require('./helpers/stdin');
var stdout = require('./helpers/stdout');
var readfile = require('./helpers/readfile');

var parse = function (source) {
  stdout(JSON.stringify(parser.parse(source), null, 2));
};

if (!process.stdin.isTTY) {
  stdin(parse);
  return;
}

var args = process.argv.slice(2);
var filepath = args[0];

parse(readfile(filepath));
