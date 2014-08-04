var _ = require('underscore');
var chai = require('chai');
var Chance = require('../chance');

global.define = function (arr, fun) {
  fun(Chance, undefined, chai, _);
};