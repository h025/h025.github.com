const http = require('http');
const fs = require('fs');
const path = require('path');

// 设置服务器的根目录，可根据实际情况修改
const rootDirectory = path.join(__dirname, '/');

const server = http.createServer((req, res) => {
  // 获取请求路径，去除开头可能存在的斜杠，保留参数部分
  let requestPath = req.url.replace(/^\/+/, '').replace(/\?.*$/, '');
  // 根据请求路径拼接出服务器上对应的文件路径
  let filePath = path.join(rootDirectory, requestPath);
  console.log(filePath);

  fs.stat(filePath, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // 文件不存在，返回404错误
        res.statusCode = 404;
        res.end('404 Not Found');
      } else {
        // 其他错误，返回500错误
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
      return;
    }

    if (stats.isDirectory()) {
      // 如果是目录，尝试查找目录下的index.html文件
      filePath = path.join(filePath, 'index.html');
      fs.stat(filePath, (err, stats) => {
        if (err) {
          if (err.code === 'ENOENT') {
            res.statusCode = 404;
            res.end('404 Not Found');
          } else {
            res.statusCode = 500;
            res.end('Internal Server Error');
          }
          return;
        }
        serveFile(filePath, res);
      });
    } else {
      serveFile(filePath, res);
    }
  });
});

function serveFile(filePath, res) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end('Internal Server Error');
      return;
    }

    const extname = path.extname(filePath);
    let contentType;
    switch (extname) {
      case '.html':
        contentType = 'text/html';
        break;
      case '.css':
        contentType = 'text/css';
        break;
      case '.js':
        contentType = 'application/javascript';
        break;
      case '.png':
        contentType = 'image/png';
        break;
      case '.jpg':
        contentType = 'image/jpeg';
        break;
      case '.gif':
        contentType = 'image/gif';
        break;
      default:
        contentType = 'application/octet-stream';
        break;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', contentType);
    res.end(data);
  });
}

const port = 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});