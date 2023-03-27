import express from 'express';
import dotenv from 'dotenv';

dotenv.config()
const app = express();
// Middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import connectDB from "./db/connect.js";
import cors from 'cors';
import morgan from 'morgan'
import {dirname} from 'path'
import { fileURLToPath } from 'url'
import path from 'path'
import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'

if (process.env.NODE_ENV !== 'prod') {
    app.use(morgan('dev'));
}

const __dirname = dirname(fileURLToPath(import.meta.url))
console.log(__dirname)

app.use(cors())
app.use(express.static(path.resolve(__dirname, './client/build')))
app.use(express.json())
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())

app.get('/', (req, res) => {
    res.json({ msg: 'Welcome!' });
});

import authRouter from "./routes/authRoutes.js";
import jobRouter from "./routes/jobRoutes.js";
import authenticateUser from "./middleware/auth.js";

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser,jobRouter)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})


const port = process.env.PORT;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`)
        });
    } catch (e) {
        console.log(e)
    }
}

start()