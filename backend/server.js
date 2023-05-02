//* dotenv
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

// Import the voterRoutes module
const voterRoutes = require('./routes/voterRoutes');

// Import politicalPartyRoutes module
const politicalPartyRoutes = require('./routes/politicalPartyRoutes');

// Import politicalPartyRoutes module
const candidateRoutes = require('./routes/candidateRoutes');

//* express app
const app = express();

//* middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

app.use("/", voterRoutes);
// app.use("/votingCenter", votingCenterRoutes);

// Use politicalPartyRoutes module
app.use("/api/v1/political-parties", politicalPartyRoutes);

// Use candidateRoutes module
app.use("/api/v1/candidates", candidateRoutes);

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
