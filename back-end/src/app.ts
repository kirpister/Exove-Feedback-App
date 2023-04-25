import express, { urlencoded } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { welcomeRouter } from './router/welcome';
import { authenRouter } from './router/authen';
import { unknownEndpoint } from './middleware/unknownEndpoint';
import { feedBackRouter } from './router/feedback';
import { userRouter } from './router/user';
import { errorHandler } from './middleware/errorHandler';
import { adminRouter } from './router/admin';

const app = express();

// 1.
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(morgan(':method :url :status :response-time ms '));

app.use('/', welcomeRouter);
app.use('/',authenRouter)
app.use('/feedback',feedBackRouter)
app.use('/user',userRouter)
app.use('/admin',adminRouter)

app.use(errorHandler)
app.use(unknownEndpoint)

export default app;


