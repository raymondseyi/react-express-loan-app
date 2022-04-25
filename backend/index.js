const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const URL = process.env.MONGO_URL;

mongoose.connect(URL, (err)=> {
    if (err) {
        console.log("Mongo ko ti connect")
    } else {
        console.log("Mongo ti connect")
    }
})

const PORT = process.env.PORT || 2000;
const userRouter = require('./routers/user.route');
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/users', userRouter);

app.listen(PORT, ()=> {
    console.log(`app is listening on PORT: ${PORT}`)
})
