var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function (pathsObj) {
  _.each(pathsObj, function (path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function (callback) {
  // read the file (sites.txt)
  fs.readFile(exports.paths.list, function (err, sites) {
    sitesArr = sites.toString().split('\n');

    callback(sitesArr);
  });
};

// archive.isUrlInList('www.google.com', function () {});
exports.isUrlInList = function (callback) {
  // read through the list
  exports.readListOfUrls(function (sitesArr) {
    // iterate through sites, see if any site === url
    // _.each
    callback(webSiteFoundOrNot);
  });
};

exports.addUrlToList = function (callback) {
  fs.appendFile(TODO, function (exisits) {
    callback();
  });
};

// archive.isUrlArchived('www.google.com', function () {});
exports.isUrlArchived = function (callback) {
  fs.exisits(TODO, function (exisits) {
    callback();
  });
};

exports.downloadUrls = function () {
  // checkout the request module
  // use the .pipe function
};
