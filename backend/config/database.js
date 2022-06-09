require("dotenv").config();
const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI, {
        // useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useFindAndModify: false
    }).then((data) => {
        console.log(`mongodb connected with server : ${data.connection.host}`)
    });
    
}

module.exports = connectDatabase