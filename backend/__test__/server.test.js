require("dotenv").config();

// Import mongoose module
const mongoose = require("mongoose");

// Testing the DB connection
test("DB Connection", async () => {
    const res = await mongoose.connect(process.env.MONGO_URI, { dbName: process.env.DB_NAME });

    // Expect the res variable to be not null
    expect(res).toBeDefined();

    // Terminate the connection
    mongoose.disconnect();

});


