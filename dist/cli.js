#!/usr/bin/env node
'use strict';

var readFile = require('./helpers/readFile');
var readStdin = require('./helpers/readStdin');
var echo = require('./helpers/echo');
var parser = require('./parser');

var parse = function (source) {
  return JSON.stringify(parser.parse(source), null, 2);
};

if (!process.stdin.isTTY) {
  echo(parse(readStdin()));
  return;
}

var args = process.argv.slice(2);
var filepath = args[0];

echo(parse(readFile(filepath)));
