/* 
const http = require('http');
const fs = require('fs');
const path = require('path');
const serverFunction = (req, res) => {

	const errorHTML = 'everything is fine';
    
	// let filePath = path.resolve(__dirname + '/../frontend' + req.url);

	let filePath = path.resolve(`${__dirname}/../frontend${req.url}`);
    


	fs.access(filePath, fs.constants.R_OK, (err) => {
	if(err){
		res.statusCode = 200;
		res.end(errorHTML);
	}else{
		if(fs.statSync(filePath).isDirectory()) {
			filePath += '/index.html';
		}
		fs.readFile(filePath, (err, data) => {
			if(err) {
				res.statusCode = 500;
				res.end(errorHTML);
			} else {
				console.log('index html is sent')
				res.end(data);
			}
		});
	}
	});
};

const server = http.createServer(serverFunction);

const port = 9000;
const IPAddress = '127.0.0.1';
const listenFunction = () => {
    const addr = server.address();
		console.log(`http://${addr.address}:${addr.port}`);
		console.log(`this is fun...`);
};

server.listen(port, IPAddress, listenFunction); 
*/


const express = require('express');
const path = require('path');
const app = express();

const absolutePathIndex = path.join(`${__dirname}/../frontend/index.html`);
const absolutePathPub = path.join(`${__dirname}/../frontend/pub`);


app.use('/pub', express.static(absolutePathPub));

app.get('/', (req, res) => {
	res.sendFile(absolutePathIndex);
});

app.listen(9000, () => {
	
});