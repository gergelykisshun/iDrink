
const express = require('express');
const path = require('path');
const app = express();

const absolutePathIndex = path.join(`${__dirname}/../frontend/index.html`);
const absolutePathPublic = path.join(`${__dirname}/../frontend/public`);


app.use('/public', express.static(absolutePathPublic));

app.get('/', (req, res) => {
	res.sendFile(absolutePathIndex);
});


const port = 9000;
const ipAddress = `http://127.0.0.1:${port}`;


app.listen(port, () => {
	console.log(ipAddress);
});