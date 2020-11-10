const express  = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors')
require('dotenv').config();
const app = express();

const authRouter    = require('./routers/auth_router');
const bookingRouter = require('./routers/booking_router');
const commentRouter = require('./routers/comment_router');
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', authRouter);
app.use('/api', bookingRouter);
app.use('/api', commentRouter);

mongoose.connect('', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
}, (err, database)=>{
	if(err){
		console.log("Can't connect")
	}
	else{
		console.log("Connected to database");
	}	
})

const Port = process.env.PORT || 8000;
app.listen(Port, () => console.log(`Listening on port ${Port}`))
