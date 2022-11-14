const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
require('dotenv').config();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

// Bodyparser middleware
app.use(
	bodyParser.urlencoded({
		extended: false,
	}),
);
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use(cookieParser());
app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Connect to MongoDB
mongoose
	.connect(
		process.env.MONGOURI,
		{useNewUrlParser: true, useUnifiedTopology: true},
	)
	.then(() => console.log('MongoDB successfully connected'))
	.catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Routes
const users = require('./routes/api/users');
const draw = require('./routes/api/draw');
const taxUsers = require('./routes/api/taxUsers');
const transactions = require('./routes/api/transactions');
const saleTransactions = require('./routes/api/saleTransactions');
const adminroute = require("./routes/api/adminroute");

app.use('/api/users', users);
app.use('/api/draw', draw);
app.use('/api/taxUsers', taxUsers);
app.use('/api/transactions', transactions);
app.use('/api/saleTransactions', saleTransactions);
app.use("/api/admin", adminroute);

// Passport config
require('./config/passport')(passport);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
