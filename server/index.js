import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import { db_user, db_password } from './credentials';

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// mongodb
const CONNECTION_URL = 'mongodb+srv://' + db_user() + ':<' + db_password() + '>@cluster0.kkfnl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';