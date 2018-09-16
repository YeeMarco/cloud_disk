const fs = require('fs');

function reback(path,cb){
  path = __dirname + path;
  console.log('path: ', path)
  fs.readdir(path,cb);

}
module.exports = {
  reback:reback
}

// function readdir(path, cb) {
//     dir = getdir(path)
//     cb(dir)
// }