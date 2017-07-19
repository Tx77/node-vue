const express = require('express');
const app = express();
const fs = require('fs');
const http = require('http');
const path = require('path');
const resolve = (file) => path.resolve(__dirname, file);

app.set('port', process.env.PORT || 3000);
app.use('/dist', express.static(resolve('./dist')));

app.get('/', (req, res)=>{
	let html = fs.readFileSync(resolve('./index.html'), 'utf-8');
	res.send(html);
});

http.createServer(app).listen(app.get('port'), ()=>{
	console.log('server launched...');
});
