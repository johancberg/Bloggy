import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { db_user, db_password, db_name } from './credentials.js';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello to memories API!');
})

// mongodb
const CONNECTION_URL = 'mongodb+srv://' + db_user() + ':' + db_password() + '@cluster0.kkfnl.mongodb.net/' + db_name() + '?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));