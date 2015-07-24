var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var typeCheck = require('mime');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

// utils.serveAssets(res, 'index.html')
exports.serveAssets = function(res, asset, callback) {
  var type = typeCheck.lookup(asset);
  fs.readFile(archive.paths.siteAssets + asset, 'utf-8', function(err, data) {
    if(err) {
      // If can't find file in public, go archives
      fs.readFile(archive.paths.archivedSites + asset, 'utf-8', function(err, data) {
        if(err) {
          exports.sendResponse(res, '404: Not found', 404, type);
        } else {
          exports.sendResponse(res, data, 200, 'text/html');
        }
      });
    } else {
      exports.sendResponse(res, data, 200, type);
    }
  });
};

exports.sendResponse = function (res, data, statusCode, contentType) {
  contentType = {'Content-Type': contentType} || {'Content-Type': 'text/plain'};
  res.writeHead(statusCode, contentType);
  res.end(data);
};

exports.collectData = function(request, callback){
  var data = "";
  request.on("data", function(chunk){
    data += chunk;
  });
  request.on("end", function(){
    callback(data);
  });
};

exports.sendRedirect = function(response, location, status){
  status = status || 302;
  response.writeHead(status, {Location: location});
  response.end();
};
