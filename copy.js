'use strict';

var path = require('path');
var fs = require('fs-extra');
var glob = require('glob');


// options is optional
glob(process.argv[2], {}, function (er, files) {
  files.forEach(function(file) {

    var destFile = path.normalize(rename(process.argv[3], file));
    fs.copy(file, destFile, function (err) {
      if (err) {
        return console.error(err);
      }
    });
  });
});

function rename(dest, src) {
  var srcPath = src.split('/').reverse();
  // if more deperate dirs needed, include for example " srcPath[3] + '/' " before part 2
  return dest + srcPath[2] + '/' + srcPath[0];
}
