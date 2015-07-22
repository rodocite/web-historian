// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = ('../helpers/archive-helpers');

archive.readListOfUrls(archive.downloadUrls);
