
const express = require('express');
const path = require('path');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const app = express();

const absolutePathIndex = path.join(`${__dirname}/../frontend/index.html`);
const absolutePathPublic = path.join(`${__dirname}/../frontend/public`);
const absolutePathCommentsJSON = path.join(`${__dirname}/../backend/comments.json`);
const absolutePathStarsJSON = path.join(`${__dirname}/../backend/stars.json`);

app.use(fileUpload());
app.use('/public', express.static(absolutePathPublic));

app.get('/', (req, res) => {
	res.sendFile(absolutePathIndex);
});

app.get('/comment-download', (req, res) => {
	try {
		const allComments = getFile(absolutePathCommentsJSON);
		res.status(200).send(allComments);
	} catch (error) {
		console.log(error);
	}

});

app.post('/comment-upload', (req, res) => {
	console.log(req.body);
	try {
		const commentsDb = getFile(absolutePathCommentsJSON);
		commentsDb.push(req.body);
		writeFile(commentsDb, absolutePathCommentsJSON);
		res.status(200).send('Posted a comment!');
	} catch {
		res.status(400).send('Something went wrong!');
	}
});

app.post('/star-upload', (req, res) => {
	console.log(req.body);
	try {
		const starsDb = getFile(absolutePathStarsJSON);
		starsDb.push(req.body);
		writeFile(starsDb, absolutePathStarsJSON);
		res.status(200).send('Posted a star rating!');
	} catch {
		res.status(400).send('Something went wrong during post process!')
	}
});

app.get('/get-stars', (req, res) => {
	try {
		const currentStars = getFile(absolutePathStarsJSON);
		res.status(200).send(currentStars);
	} catch {
		res.status(404).send('Data was not found!')
	}
});

const port = 9000;
const ipAddress = `http://127.0.0.1:${port}`;


app.listen(port, () => {
	console.log(ipAddress);
});


// Helper Functions

const getFile = (url) => {
	return JSON.parse(fs.readFileSync(url));
};

const writeFile = (data, url) => {
	fs.writeFileSync(url, JSON.stringify(data));
};