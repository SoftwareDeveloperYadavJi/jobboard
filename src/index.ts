import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { userRouter } from './routers';
import connectDB  from './DB';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/api/user', userRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { 
    console.log(`Connecting to MongoDB...`);
    connectDB()
    console.log(`Server running on port ${PORT}`);
});
