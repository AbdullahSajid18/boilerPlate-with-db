// ------- IMPORTING PACKAGES ---------//
import express from 'express'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import usersRoutes from './routes/usersRoutes.js';

// ------DOT ENV CONFIG------//
dotenv.config();

const app = express();
const PORT = 8000;

// MIDDLEWARES
app.use(cookieParser())
app.use(express.json())
app.use(morgan('common'))
app.use(cors())

// CONNECTING DB

const connectDB = () => {
    mongoose
      .connect(process.env.MONGO_URL)
      .then(() => {
        console.log(`connected to db`);
      })
      .catch((err) => {
        throw err;
    });
  };


// --------ROUTES---------//

app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)


//---------ERROR MIDDLEWARE---------//
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).send({
        status: "falied",
        errorStatus: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})

// --------SERVER LISTENING--------//

app.listen(PORT || 8000, ()=> {
    connectDB();
    console.log(`Server is running on port no ${PORT}`)
  })