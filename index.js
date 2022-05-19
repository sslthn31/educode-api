const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dummyRouter = require('./routes/dummyRoutes')

const app = express()

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //agar semua website bisa akses API kita
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader("Access-Control-Allow-Credentials", 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})

app.get('/', (req, res) => {
    res.send("Sup Dude");
})

app.use('/v1/dummy', dummyRouter)


mongoose.connect('mongodb://sslth31:Y3v8Bd6JKREKzs2Y@cluster0-shard-00-00.pwm9r.mongodb.net:27017,cluster0-shard-00-01.pwm9r.mongodb.net:27017,cluster0-shard-00-02.pwm9r.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-cx49qk-shard-0&authSource=admin&retryWrites=true&w=majority')
.then(() => {
    console.log("database connected");
    app.listen(5000, () => {
        console.log("app listen in port 5000")
    })
    
})
.catch(err => console.log("Error :", err))


//Y3v8Bd6JKREKzs2Y