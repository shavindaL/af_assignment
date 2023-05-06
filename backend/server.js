//* dotenv
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

// Import cors module
const cors = require('cors');

// Import the voterRoutes module
const voterRoutes = require('./routes/voterRoutes');
// Import the votingCenterRoutes module
const votingCenterRoutes = require('./routes/votingCenterRoutes');

const voteRoutes = require('./routes/voteRoutes');



// Import politicalPartyRoutes module
const politicalPartyRoutes = require('./routes/politicalPartyRoutes');

// Import candidateRoutes module
const candidateRoutes = require('./routes/candidateRoutes');

// Import multer module
const multer = require('multer');
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage
});

//* express app
const app = express();

//* middleware
app.use(express.json());

app.use(upload.single("politicalPartyLogo"));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Use cors module
app.use(cors({
    origin: 'http://localhost',
}));

app.use("/api/v1/voters", voterRoutes);
app.use("/api/v1/voting-centers", votingCenterRoutes);
app.use("/api/v1/vote", voteRoutes);

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