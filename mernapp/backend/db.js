const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://hdheyddudjdj:food295@cluster0.g64ss.mongodb.net/goodfoodmern?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

        console.log("Connected to MongoDB");

        const fetched_data = await mongoose.connection.db.collection("food_items");
        const data = await fetched_data.find({}).toArray();  // Fetch food items

        const foodCategory = await mongoose.connection.db.collection("food_category");
        const catData = await foodCategory.find({}).toArray();  // Fetch food categories

        global.food_items = data;  // Save food items globally
        global.foodCategory = catData;  // Save food categories globally

        console.log(global.food_items);  // Log food items
        console.log(global.foodCategory);  // Log food categories
    } catch (err) {
        console.log("Error connecting to MongoDB: ", err);
    }
};

module.exports = mongoDB;



