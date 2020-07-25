const express = require('express');
const config = require('./config');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const path = require('path');
const cors = require('cors');
const app = express();

const PORT = config['PORT'];
// APP setting
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Database Connection
const isDev = process.env.NODE_ENV ? process.env.NODE_ENV : 'production';
mongoose.connect(config.mongo_uri[isDev], { useNewUrlParser: true });
mongoose.connection.on('error', error => {
	console.log(error);
});
// Routes Setup

app.use('/api/v1/transactions', routes);

app.get('/', (req, res) => {
	return res.render('index');
});

// Server
app.listen(PORT, () => {
	console.log('Server is running....', PORT);
});
