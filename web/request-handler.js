var fs = require('fs');
var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var utils = require('./http-helpers');
var queryString = require('querystring');

exports.handleRequest = function (req, res) {
  console.log("Serving request type " + req.method + " for url " + req.url);

  router[req.method](req, res);
};

var router = {
  'GET': function (req, res) {
    var urlParts = url.parse(req.url);
    var urlPath = urlParts.pathname === '/' ? '/index.html' : urlParts.pathname;
    utils.serveAssets(res, urlPath);
  }, // GET
  'POST': function (req, res) {
    console.log('POSTING!!!!');
    saveSite(req, res);
  }, // POST
};


var saveSite = function(request, response){
  utils.collectData(request, function(data) {
    var url = queryString.parse(data).url;
    // check sites.txt for web site
    archive.isUrlInList(url, function(found){
      if (found) { // found site
        // check if site is on disk
        archive.isUrlArchived(url, function(exists) {
          if (exists) {
            // redirect to site page (/www.google.com)
            utils.sendRedirect(response, '/' + url);
          } else {
            // Redirect to loading.html
            utils.sendRedirect(response, '/loading.html');
          }
        });
      } else { // not found
        // add to sites.txt
        archive.addUrlToList(url, function(){
          // Redirect to loading.html
          utils.sendRedirect(response, '/loading.html');
        });
      }
    });
  });
};
