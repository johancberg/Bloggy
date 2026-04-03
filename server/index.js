import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
const { DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors({ origin: "*" }));

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello to memories API!');
});

// mongodb
const CONNECTION_URL = 'mongodb+srv://' + DB_USER + ':' + DB_PASSWORD + '@cluster0.kkfnl.mongodb.net/?appName=' + DB_NAME + '&retryWrites=true&w=majority';
const PORT = DB_PORT || 8000;

mongoose.set('strictQuery', false);
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));