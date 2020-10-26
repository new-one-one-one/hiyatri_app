const express  = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors')
require('dotenv').config();
const app = express();

const authRouter = require('./routers/auth_router');

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', authRouter);

mongoose.connect(process.env.DATABASE, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	})
	.then(() => console.log('Connected to Database'))
	.catch((err) => console.log(`Error: ${err}`));

const Port = process.env.PORT || 8000;
app.listen(Port, () => console.log(`Listening on port ${Port}`))
