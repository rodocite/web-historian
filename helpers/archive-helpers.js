var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');
var url = require('url');


exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

exports.initialize = function (pathsObj) {
  _.each(pathsObj, function (path, type) {
    exports.paths[type] = path;
  });
};

exports.readListOfUrls = function (callback) {
  fs.readFile(exports.paths.list, 'utf8', function (err, sites) {

    sitesArr = _.filter(sites.split('\n'), function(site) {
      if(site !== '') {
        return site;
      }
    });

    callback(sitesArr);
  });
};

// archive.isUrlInList('www.google.com', function () {});
exports.isUrlInList = function (url, callback) {
  // read through the list
  exports.readListOfUrls(function (sitesArr) {
    callback(_.contains(sitesArr, url));
  });
};

exports.addUrlToList = function (url, callback) {
  fs.appendFile(exports.paths.list, url + '\n', function(err) {
    if (err) {
      console.log(err);
    }
    if (callback) {
      callback();
    }
  });
};

// archive.isUrlArchived('www.example.com', function () {});
exports.isUrlArchived = function (url, callback) {
  // check out erik's note on slack!
  fs.exists(path.join(exports.paths.archivedSites, url), function (exists) {
    if (!exists) {
      callback(false);
      return;
    }
    callback(true);
  });
};

exports.downloadUrls = function (sitesArr) {
  sitesArr.forEach(function(site) {
    request('http://' + site, function (err, response, body) {
      if (err) {
        throw err;
      }
    }).pipe(fs.createWriteStream(path.join(exports.paths.archivedSites, site)));
  });
};
