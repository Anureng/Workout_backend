require('dotenv').config()
const express = require('express');
const workroutes = require('./routes/workout');
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
//express app
const app = express();
// listen for request
// app.listen(process.env.PORT,()=>{
//     console.log('listen on 3000');
// })
//routes

//cors
app.use(cors({
    credentials: true,
    origin: [
        'http://localhost:3000',
    ],
    optionsSuccessStatus: 200,
}))

//middleware if we want to add or update we can use middleware

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
});

//routes
app.use('/api/workouts', workroutes)
app.use('/api/user', userRoutes)


//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connect to the db and listening', process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error);
    })


