//nodemon - for reset server when any file is changed
//mongoose - for easy fork with mongodb
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./authRouter');
const PORT = process.env.PORT || 5000; //try to get port from system variables or set or 5000

const app = express();

app.use(express.json()); //for parse json
app.use("/auth", authRouter); // listen authRouter

//function to start server
const start = async () => { // all db actions is async
    try {
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.fluuiir.mongodb.net/?retryWrites=true&w=majority');
        app.listen(PORT, () => console.log(`server started on port ${PORT}`)); //start server
    } catch (e) {
        console.log(e);
    }
}

start();