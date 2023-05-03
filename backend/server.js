//* dotenv
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

// Import the voterRoutes module
const voterRoutes = require('./routes/voterRoutes');
// Import the votingCenterRoutes module
const votingCenterRoutes = require('./routes/votingCenterRoutes');


// Import politicalPartyRoutes module
const politicalPartyRoutes = require('./routes/politicalPartyRoutes');

//* express app
const app = express();

//* middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

app.use("/api/v1/voters", voterRoutes);
app.use("/api/v1/voting-centers", votingCenterRoutes);

// Use politicalPartyRoutes module
app.use("/api/v1/political-parties", politicalPartyRoutes);

//* Connect to db
mongoose
    .connect(process.env.MONGO_URI, { dbName: process.env.DB_NAME })
    .then(() => {

        console.log(`Connected to the database`);

        app.listen(process.env.PORT, (req, res) => {
            console.log(`Backend server is running on ${process.env.PORT}`)
        });

    })
    .catch(error => {
        console.log(error);
    });
