const fs = require('fs');
const path = require("path")
let arr = fs.readdirSync(__dirname)
let msgarr = [];

arr.forEach( (value, key, map) => {
  let root = path.join(__dirname);
  let arr = [];
  let status = fs.statSync( root +'/'+ value);
  arr.push(value);
  arr.push(status.size);
  arr.push(status.ctime);
  msgarr.push(arr);
})
console.log(msgarr)


// var fs = require("fs")
// var path = require("path")
 
// var root = path.join(__dirname)
// console.log(typeof(root),'1')
// console.log(typeof(__dirname),'2')
// readDirSync(root)
// function readDirSync(path){
// 	var pa = fs.readdirSync(path);
// 	pa.forEach(function(ele,index){
// 		var info = fs.statSync(path+"/"+ele)	
		
// 	})
// }