import express, { urlencoded } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { welcomeRouter } from './router/welcome';
import { authenRouter } from './router/authen';
import { unknownEndpoint } from './middleware/unknownEndpoint';
import { feedBackRouter } from './router/feedback';
import { userRouter } from './router/user';
import { errorHandler } from './middleware/errorHandler';
import { adminRouter } from './router/admin';
import { validateRouter } from './router/validate';
import { authenticationAdmin } from './middleware/authenticationAdmin';
import { authenticationUser } from './middleware/authenticationUser';

const app = express();

// 1.
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(morgan(':method :url :status :response-time ms '));
app.use(cookieParser());
app.use('/api/private/validate', validateRouter);
app.use('/api/', welcomeRouter);
app.use('/api/', authenRouter);
app.use('/api/feedback', authenticationAdmin, feedBackRouter);
app.use('/api/user', authenticationUser, userRouter);
app.use('/api/admin', authenticationAdmin, adminRouter);

app.use(errorHandler);
app.use(unknownEndpoint);

export default app;
