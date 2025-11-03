import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import auth from './routes/auth.js';
import connect from './middlewares/connect.js';
import orders from './routes/orders.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(connect);
app.use(express.json());

app.use("/auth", auth);
app.use("/orders", orders);

app.get('/', (req, res) => {
    console.log('Root path accessed');
    res.send('Welcome to the API');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}:  http://localhost:${PORT}`);
});