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
const orderRouter = require('./routers/order_router');
const userRouter = require('./routers/user_router');
// const bulkbookingRouter=require('./routers/bulkbooking_router');

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', authRouter);
app.use('/api', bookingRouter);
app.use('/api', commentRouter);
app.use('/api', orderRouter);
app.use('/api', userRouter);
// app.use('/api',bulkbookingRouter)



mongoose.connect(process.env.DATABASE, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
}, (err, database)=>{
	if(err){
		console.log("Can't connect",err)
	}
	else{
		console.log("Connected to database");
	}
})

const Port = process.env.PORT || 8000;
app.listen(Port, () => console.log(`Listening on port ${Port}`))
