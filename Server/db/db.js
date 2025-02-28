const mongoose = require('mongoose');

async function connectToDb() {
     try {
       await mongoose.connect(process.env.MONGO_URI);
       console.log("Connected to Database");
     }catch(error) {
       console.log(`Failed to connect with Database`);
       throw new Error(error)
     }
};

module.exports = connectToDb