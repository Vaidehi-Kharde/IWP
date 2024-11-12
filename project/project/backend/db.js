const mongoose = require('mongoose');
require('events').EventEmitter.defaultMaxListeners = 15;

const mongoURI = 'mongodb+srv://bt22cse037:finalProject@travelapp.3w7fi.mongodb.net/finalProject?retryWrites=true&w=majority&appName=travelApp'; // Add your database name here

const mongoDB = async (err, result) => {
    try {
        if (err) console.log("---", err)
        else {
            await mongoose.connect(mongoURI);
            console.log('MongoDB connected successfully');
            const db = mongoose.connection.db;
            const collections = await db.listCollections().toArray();
            console.log('Collections in the database:', collections.map(col => col.name));

            const fetchedData = db.collection("updated");

            const data = await fetchedData.find({}).toArray();
            global.packages = data; 
            // console.log('Fetched packages:', global.packages); 
        }

    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};

module.exports = mongoDB;
