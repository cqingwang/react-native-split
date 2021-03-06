/**
 * Created by desmond on 4/13/17.
 */
'use strict';

var Utils = require('../utils');
var fs = require('fs');

test('Test resource match', function () {
  var success = ['naruto.png', 'naruto.png.jpeg', 'naruto.j.jpg'];
  var fails = ['naruto.aa', 'naruto.png.jg', 'naruto.j'];

  success.forEach(function (item) {
    expect(Utils.isAssetModule(item)).toBeTruthy();
  });

  fails.forEach(function (item) {
    expect(Utils.isAssetModule(item)).toBeFalsy();
  });
});

test('Test module dependency', function () {
  var code = 'require(12            ); // 12 = react-native require(401              ); // 401 = ./resolveInject require(402                 ); require(406                                                                                 ); // 406 = /Users/desmond/CodeFiles/rn-codes/split-example/src/components/packagea/SampleA.js // 402 = ./modules/index.js require(409                                                                                 ); // 409 = /Users/desmond/CodeFiles/rn-codes/split-example/src/components/packageb/SampleB.js';

  expect(Utils.getModuleDependency(code, 0, code.length)).toEqual(['12', '401', '402', '406', '409']);
});

test('Test module dependency with code range', function () {
  var code = 'require(12            ); // 12 = react-native require(401              ); // 401 = ./resolveInject require(402                 ); require(406                                                                                 ); // 406 = /Users/desmond/CodeFiles/rn-codes/split-example/src/components/packagea/SampleA.js // 402 = ./modules/index.js require(409                                                                                 ); // 409 = /Users/desmond/CodeFiles/rn-codes/split-example/src/components/packageb/SampleB.js';

  expect(Utils.getModuleDependencyCodeRange(code, 0, code.length)).toEqual([{ module: '12', code: 'require(12            )' }, { module: '401', code: 'require(401              )' }, { module: '402', code: 'require(402                 )' }, { module: '406', code: 'require(406                                                                                 )' }, { module: '409', code: 'require(409                                                                                 )' }]);
});