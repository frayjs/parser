#!/usr/bin/env node
'use strict';

var echo = require('cli/echo');
var cat = require('cli/cat');
var parser = require('./parser');

var parse = function (source) {
  return JSON.stringify(parser.parse(source), null, 2);
};

if (!process.stdin.isTTY) {
  echo(parse(cat()));
  return;
}

var args = process.argv.slice(2);
var filepath = args[0];

echo(parse(cat(filepath)));
