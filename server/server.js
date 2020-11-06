const express  = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors')
require('dotenv').config();
const app = express();

const authRouter = require('./routers/auth_router');
const bookingRouter = require('./routers/booking_router');
const orderRouter = require('./routers/order_router');
const userRouter = require('./routers/user_router');


app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', authRouter);
app.use('/api', bookingRouter);
app.use('/api', orderRouter);
app.use('/api', userRouter);

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
