const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const TodoRouter = require('./routers/TodoRoute');
const cors = require('cors');
// const path = require('path');
// const exp = require('constants');

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// const _dirname = path.resolve();

mongoose.connect(MONGO_URI)
.then(() => {
    console.log('MongoDb connected')
})
.catch((err) => console.log(err))

app.use(cors({
    origin:'http://localhost:3000',
    methods : ['GET', 'PUT', 'DELETE', 'POST'],
    credentials: true,
}));

app.use(express.json());
app.use('/todo', TodoRouter);

// app.use(express.static(path.join(_dirname, "/frontend/dist")));
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(_dirname, "frontend", "build", "index.html"));
// });

app.listen(PORT, () => {
    console.log(`server is running at port : ${PORT}`)
})