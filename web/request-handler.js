var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  res.end(archive.paths.list);
};

var actions = {
  'GET': getSite,
  'POST': saveSite,
}; // actions

var getSite = function () {
  // if url is in list
  if (archive.isUrlInList(TODO)) {
    // redirect accordingly
    // else redirect accordingly
  }
}; // getSite

var saveSite = function () {
  // if url is in the list
  if (archive.isUrlInList(TODO)) {
    // if site is archived
    if (archive.isUrlArchived(TODO)) {
      // redirect client to the site
    }
    // else
      // append to site list
  }

}; // saveSite
