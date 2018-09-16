let http = require('http');
let fs = require('fs');
const url = require('url');
let response = 0;
let reback = require('./filesname').reback

process.title = 'NODE_WEB';
http.createServer((req,res)=>{ 
  route(req,res)
  // console.log(response++)
}).listen(8888,'127.0.0.1',()=>{console.log('server is runing at localhost:8888','pid-->',process.pid)})


 function route(req,res){
  let URL = url.parse(req.url);
  let method = req.method.toLowerCase();
  let route;
  if (URL.pathname.indexOf('.') === -1) {
    if(URL.pathname.indexOf('ttf')!==-1){console.log(URL.pathname)}
    route = routes[URL.pathname];
  } else {
    route = routes['src']
  }
  
  switch (method) {
    case 'get':
    return route.get(req,res)
      break;
    case 'post':
    return route.post(req,res)
      break;
    case 'delete':
      //
      break;
    case 'put':
      //
      break;
    default:
      break;
  } 
}

const contenttype = {
  'js': 'application/javascript',
  'css': 'text/css',
  'ico':'image/x-icon',
  'html': 'text/html',
  'gif': 'image/gif',
  'ttf':'application/x-font-ttf',
  'jpg':'image/jpge',
  'mp4':'video/mp4'
}
const routes = {
  '/':{
    get:function(req,res){
      let stream = fs.createReadStream('./index.html');
      res.writeHead(200,{'Content-Type':'text/html'});
      stream.pipe(res);
      stream.on('end', function(){res.end()})
    },
    post:function(req,res){}
  },
  'src':{
    get:function(req,res){
      let path = url.parse(req.url).pathname;
      let type = path.substr(path.indexOf('.')+1,path.length);
      let __path = path.substr(1,path.length)
      let stream = fs.createReadStream('./'+ __path);
      res.writeHead(200,{'Content-Type':contenttype[type]});
      stream.pipe(res);
      stream.on('end', function(){res.end()})
    }
  },
  '/data':{
    get:function(req,res){
      let urlarr = url.parse(req.url);
      let path = urlarr.query;
      let callback = function(err,arr){
        if (err) {
          console.log('readdir err happend!')
          res.writeHead(200,{'Content-Type':'text/plain'});
          res.write('readdir err happend!');
          res.end()  
        } else {
          res.writeHead(200,{'Content-Type':'application/json'});
          let data = JSON.stringify(arr)
          res.write(data);
          res.end()   
      }
        }
      let arr = reback(path,callback)
    }
  },
  'bitefile':{

  }
}

// const c = require('child_process');
// c.exec('start http://127.0.0.1:8888');
  //--------------------reback=====dir---[]-------------


