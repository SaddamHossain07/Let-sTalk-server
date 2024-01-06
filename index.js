const express = require('express');
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

// route goes here ========================
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')


dotenv.config()

// mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
//     console.log('connected to mongodb');
// });

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => {
        console.log('connected to mongodb');
    },
    err => { console.log('error'); }
);

// middleware 
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

// API goes here 
// app.get('/', (req, res) => {
//     res.send('welcome to homepage')
// })

app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)



app.listen(port, () => {
    console.log(`server is running on a port : ${port}`)
})