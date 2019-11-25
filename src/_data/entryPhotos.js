var fs = require("fs"),
  path = require("path");

var walkSync = function(dir, filelist) {
  var fs = fs || require("fs"),
    files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + file).isDirectory()) {
      filelist = walkSync(dir + file + "/", filelist);
    } else {
      file = file.replace(".jpg", "");
      var imageURL = dir + file;
      var ext = path.extname(imageURL).toUpperCase();
      if (ext === ".JPG" || ext === ".PNG" || ext === ".JPEG") {
        filelist.push(
          imageURL.replace(process.env.PWD + "/src/assets/images/entries", "")
        );
      }
    }
  });
  return filelist;
};

module.exports = walkSync(process.env.PWD + "/src/assets/images/entries/");
