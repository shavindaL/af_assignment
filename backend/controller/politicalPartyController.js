// Import the PoliticalParty model
const PoliticalParty = require('../models/politicalParty');

// Import the PoliticalPartyAuditTrail mode
const PoliticalPartyAuditTrail = require('../models/politicalPartyAuditTrail');

// Import crypter module
const Cryptr = require('cryptr');

// Import stream module
const stream = require("stream");

// Import the googleapis module
const { google } = require("googleapis");

// Method to encrypt sensitive data
async function encryptData(cryptr, phone_no, email, competitor_count, vote_results) {
    // Encrypt the given details
    phone_no = await cryptr.encrypt(phone_no);
    email = await cryptr.encrypt(email);
    competitor_count = await cryptr.encrypt(competitor_count);
    vote_results = await cryptr.encrypt(vote_results);

    // Return the encrypted data
    return {
        phone_no, email, competitor_count, vote_results
    }
}

// Method to decrypt sensitive data
async function decryptData(cryptr, phone_no, email, competitor_count, vote_results) {
    // Decrypt the given details
    phone_no = await cryptr.decrypt(phone_no);
    email = await cryptr.decrypt(email);
    competitor_count = await cryptr.decrypt(competitor_count);
    vote_results = await cryptr.decrypt(vote_results);

    // Return the decrypted data
    return {
        phone_no, email, competitor_count, vote_results
    }
}

// Method to get all available political parties
const getAllPoliticalParties = async (req, res) => {
    try {
        // Instantiate new Crypter object
        const cryptr = new Cryptr(process.env.SECRET_KEY);

        // Get all existing documents
        const politicalParties = await PoliticalParty.find();


        if (politicalParties) {
            // Loop through the politicalParties object array and decrypt sensistive data
            for (let politicalParty of politicalParties) {
                const { phone_no, email, competitor_count, vote_results } = await decryptData(
                    cryptr,
                    politicalParty.phone_no,
                    politicalParty.email,
                    politicalParty.competitor_count,
                    politicalParty.vote_results
                );

                // Assign decrypted data to respective properties of the object
                politicalParty.phone_no = phone_no;
                politicalParty.email = email;
                politicalParty.competitor_count = competitor_count;
                politicalParty.vote_results = vote_results;
            }

            // Respond with status code 200 (OK) if sucessful
            res.status(200).send(politicalParties);

            // Insert an audit log document
            new PoliticalPartyAuditTrail({
                userIPAddress: req.socket.remoteAddress,
                operation: "read",
                documentID: "",
                dataBefore: politicalParties,
                dataAfter: politicalParties,
                outcome: "success",
            }).save();

        } else {
            // Repond with status code 400 (Bad Request) if unsucessful
            res.status(400).send("Failed to get political parties");

            // Insert an audit log document
            new PoliticalPartyAuditTrail({
                userIPAddress: req.socket.remoteAddress,
                operation: "read",
                documentID: "",
                dataBefore: "",
                dataAfter: "",
                outcome: "failure",
            }).save();
        }
    } catch (err) {
        // Print error message
        console.log(err.message);
    }
};


// Method to get details of a particular political party
const getPoliticalParty = async (req, res) => {
    try {
        // Instantiate new Crypter object
        const cryptr = new Cryptr(process.env.SECRET_KEY);

        const politicalParty = await PoliticalParty.findOne({ partyID: req.params.id });

        if (politicalParty) {
            const { phone_no, email, competitor_count, vote_results } = await decryptData(
                cryptr,
                politicalParty.phone_no,
                politicalParty.email,
                politicalParty.competitor_count,
                politicalParty.vote_results
            );

            // Assign decrypted data to respective properties of the object
            politicalParty.phone_no = phone_no;
            politicalParty.email = email;
            politicalParty.competitor_count = competitor_count;
            politicalParty.vote_results = vote_results;

            // Respond with status code 200 (OK) if successful
            res.status(200).send(politicalParty);

            // Insert audit log document
            new PoliticalPartyAuditTrail({
                userIPAddress: req.socket.remoteAddress,
                operation: "read",
                documentID: politicalParty._id,
                dataBefore: politicalParty,
                dataAfter: politicalParty,
                outcome: "success",
            }).save();

        } else {
            // Respond with status code 400 (Bad Request) if unsucessful
            res.status(400).send("Failed to find the political party");

            // Insert audit log document
            new PoliticalPartyAuditTrail({
                userIPAddress: req.socket.remoteAddress,
                operation: "read",
                documentID: "",
                dataBefore: "",
                dataAfter: "",
                outcome: "failure",
            }).save();
        }

    } catch (err) {
        // Print error message
        console.log(err.message);
    }
};


// Method to add new political party
const addPoliticalParty = async (req, res) => {
    try {

        // Instantiate new Crypter object
        const cryptr = new Cryptr(process.env.SECRET_KEY);

        // Object array to hold existing emails and phone numbers
        const emails_phoneNumbers = await PoliticalParty.find({}, { email: 1, phone_no: 1, _id: 0 });

        // Boolean variable to check if the political party with the given email and phone number already exists
        let isPoltPartyExists = false;

        // Loop through the object array array
        for (let i = 0; i < emails_phoneNumbers.length; i++) {
            // Check if email is matching after decrypting
            if (
                cryptr.decrypt(emails_phoneNumbers[i].email).toString() ===
                req.body.email
            ) {
                isPoltPartyExists = true;

                // Respond with status code 400 (Bad Request) if email already exists
                res.status(400).send("Sorry, this email is already taken");

                // Insert audit log document
                new PoliticalPartyAuditTrail({
                    userIPAddress: req.socket.remoteAddress,
                    operation: "create",
                    documentID: "",
                    dataBefore: "",
                    dataAfter: "",
                    outcome: "failure",
                }).save();
            }

            // Check if phone number is matching after decrypting
            if (
                cryptr.decrypt(emails_phoneNumbers[i].phone_no).toString() ===
                req.body.phone_no
            ) {
                isPoltPartyExists = true;

                // Respond with status code 400 (Bad Request) if phone number already exists
                res.status(400).send("Sorry, this phone number is already taken");

                // Insert audit log document
                new PoliticalPartyAuditTrail({
                    userIPAddress: req.socket.remoteAddress,
                    operation: "create",
                    documentID: "",
                    dataBefore: "",
                    dataAfter: "",
                    outcome: "failure",
                }).save();
            }
        }

        if (isPoltPartyExists === false) {
            // Variable to hold the last document in the collection
            let lastDoc = await PoliticalParty.find().limit(1).sort({ $natural: -1 });

            // Variable to hold the partyID of the last document in the collection
            let lastDocPartyID;

            if (lastDoc.length !== 0) {
                lastDocPartyID = await lastDoc[0].partyID;
            } else {
                lastDocPartyID = 0;
            }


            // Encrypt sensitive data
            const { phone_no, email, competitor_count, vote_results } = await encryptData(
                cryptr, req.body.phone_no, req.body.email, req.body.competitor_count, 0
            );

            // Create new document if isPoltPartyExists variable is false
            const politicalParty = new PoliticalParty({
                partyID: lastDocPartyID + 1,
                name: req.body.name,
                phone_no: phone_no,
                email: email,
                leader_name: req.body.leader_name,
                description: req.body.description,
                competitor_count: competitor_count,
                vote_results: vote_results
            });

            // Insert the new document
            const newPoltParty = await politicalParty.save();

            if (newPoltParty) {
                // Respond with status code 201 (Created) if successful
                res.status(201).send("Political Party added successfully");

                // Decrypt sensitive data
                const { phone_no, email, competitor_count, vote_results } = await decryptData(
                    cryptr,
                    newPoltParty.phone_no,
                    newPoltParty.email,
                    newPoltParty.competitor_count,
                    newPoltParty.vote_results
                );

                // Assign decrypted data to respective properties of the newPoltParty object
                newPoltParty.phone_no = phone_no;
                newPoltParty.email = email;
                newPoltParty.competitor_count = competitor_count;
                newPoltParty.vote_results = vote_results;

                // Insert audit log document
                new PoliticalPartyAuditTrail({
                    userIPAddress: req.socket.remoteAddress,
                    operation: "create",
                    documentID: newPoltParty._id,
                    dataBefore: "",
                    dataAfter: newPoltParty,
                    outcome: "success",
                }).save();

            } else {
                // Respond with status code 400 (Bad Request) if unsucessful
                res.status(400).send("Failed to add the political party");

                // Insert audit log document
                new PoliticalPartyAuditTrail({
                    userIPAddress: req.socket.remoteAddress,
                    operation: "create",
                    documentID: "",
                    dataBefore: "",
                    dataAfter: "",
                    outcome: "failure",
                }).save();
            }
        }


    } catch (err) {
        // Print error message
        console.log(err.message);
    }
}


// Method to update a particular political party
const updatePoliticalParty = async (req, res) => {
    try {
        // Instantiate new Crypter object
        const cryptr = new Cryptr(process.env.SECRET_KEY);

        // Object array to hold existing emails and phone numbers
        const emails_phoneNumbers = await PoliticalParty.find({}, { email: 1, phone_no: 1, _id: 0 });

        // Boolean variable to check if the political party with the given email and phone number already exists
        let isPoltPartyExists = false;

        let tempPoltParty;

        // Loop through the object array array
        for (let i = 0; i < emails_phoneNumbers.length; i++) {
            // Check if email is matching after decrypting
            if (
                cryptr.decrypt(emails_phoneNumbers[i].email).toString() ===
                req.body.email
            ) {
                // Get politicalParty object that matches email
                let politicalPartyObj = await PoliticalParty.findOne(
                    { email: emails_phoneNumbers[i].email },
                    { partyID: 1, _id: 0 }
                );

                // Get the partyID value from the politicalParty object
                let existingPartyID = politicalPartyObj.partyID;

                if (existingPartyID == req.params.id) {
                    // isPolPartyExists = false if existingPartyID is the same as req.params.id
                    isPoltPartyExists = false;
                } else {
                    isPoltPartyExists = true;

                    // Respond with status code 400 (Bad Request) if email already exists
                    res.status(400).send("Sorry, this email is already taken");

                    tempPoltParty = await PoliticalParty.findOne({ partyID: req.params.id });

                    const { phone_no, email, competitor_count, vote_results } = await decryptData(
                        cryptr,
                        tempPoltParty.phone_no,
                        tempPoltParty.email,
                        tempPoltParty.competitor_count,
                        tempPoltParty.vote_results
                    );

                    // Assign decrypted data to respective properties of the object
                    tempPoltParty.phone_no = phone_no;
                    tempPoltParty.email = email;
                    tempPoltParty.competitor_count = competitor_count;
                    tempPoltParty.vote_results = vote_results;


                    // Insert audit log document
                    new PoliticalPartyAuditTrail({
                        userIPAddress: req.socket.remoteAddress,
                        operation: "update",
                        documentID: tempPoltParty._id,
                        dataBefore: tempPoltParty,
                        dataAfter: tempPoltParty,
                        outcome: "failure",
                    }).save();
                }
            }


            // Check if phone number is matching after decrypting
            if (
                cryptr.decrypt(emails_phoneNumbers[i].phone_no).toString() ===
                req.body.phone_no
            ) {


                // Get politicalParty object that matches phone number
                let politicalPartyObj = await PoliticalParty.findOne(
                    { phone_no: emails_phoneNumbers[i].phone_no },
                    { partyID: 1, _id: 0 }
                );

                // Get the partyID value from the politicalParty object
                let existingPartyID = politicalPartyObj.partyID;

                if (existingPartyID == req.params.id) {
                    // isPolPartyExists = false if existingPartyID is the same as req.params.id
                    isPoltPartyExists = false;
                } else {
                    isPoltPartyExists = true;

                    // Respond with status code 400 (Bad Request) if phone number already exists
                    res.status(400).send("Sorry, this phone number is already taken");

                    tempPoltParty = await PoliticalParty.findOne({ partyID: req.params.id });

                    const { phone_no, email, competitor_count, vote_results } = await decryptData(
                        cryptr,
                        tempPoltParty.phone_no,
                        tempPoltParty.email,
                        tempPoltParty.competitor_count,
                        tempPoltParty.vote_results
                    );

                    // Assign decrypted data to respective properties of the object
                    tempPoltParty.phone_no = phone_no;
                    tempPoltParty.email = email;
                    tempPoltParty.competitor_count = competitor_count;
                    tempPoltParty.vote_results = vote_results;

                    // Insert audit log document
                    new PoliticalPartyAuditTrail({
                        userIPAddress: req.socket.remoteAddress,
                        operation: "update",
                        documentID: tempPoltParty._id,
                        dataBefore: tempPoltParty,
                        dataAfter: tempPoltParty,
                        outcome: "failure",
                    }).save();
                }


            }
        }

        if (isPoltPartyExists === false) {
            const { phone_no, email, competitor_count, vote_results } = await encryptData(
                cryptr,
                req.body.phone_no,
                req.body.email,
                req.body.competitor_count,
                req.body.vote_results
            );

            const updatedPoltParty = await PoliticalParty.findOneAndUpdate(
                {
                    partyID: req.params.id
                },
                {
                    $set: {
                        name: req.body.name,
                        phone_no: phone_no,
                        email: email,
                        leader_name: req.body.leader_name,
                        description: req.body.description,
                        competitor_count: competitor_count,
                        vote_results: vote_results
                    },
                },
                {
                    new: true,
                }
            );

            if (updatedPoltParty) {
                // Respond with status code 200 (OK) if successful
                res.status(200).send("Political party updated successfully");

                // Get previous details of the document that is being updated
                tempPoltParty = await Seller.findOne({ partyID: req.params.id });

                // Insert audit log document
                new PoliticalPartyAuditTrail({
                    userIPAddress: req.socket.remoteAddress,
                    operation: "update",
                    documentID: updatedPoltParty._id,
                    dataBefore: tempPoltParty,
                    dataAfter: updatedPoltParty,
                    outcome: "success",
                }).save();

            } else {
                // Respond with status code 400 (Bad Request) if unsuccessful
                res.status(400).send("Failed to update political party");

                // Get previous details of the document that is being updated
                tempPoltParty = await Seller.findOne({ partyID: req.params.id });

                // Insert audit log document
                new PoliticalPartyAuditTrail({
                    userIPAddress: req.socket.remoteAddress,
                    operation: "update",
                    documentID: tempPoltParty._id,
                    dataBefore: tempPoltParty,
                    dataAfter: tempPoltParty,
                    outcome: "failure",
                }).save();
            }
        }

    } catch (err) {
        // Print error message
        console.log(err.message);
    }
}


// Method to update the vote results of a particular political party
const updateVoteResults = async (req, res) => {
    try {
        // Instantiate Cryptr object
        const cryptr = new Cryptr(process.env.SECRET_KEY);

        // Get previous vote results of the given political party
        const tempPoltParty = await PoliticalParty.findOne({ partyID: req.params.id });

        const updatedPoltParty = await PoliticalParty.findOneAndUpdate(
            {
                partyID: req.params.id
            },
            {
                $set: {
                    vote_results: cryptr.encrypt(req.body.vote_results)
                },
            },
            {
                new: true,
            }
        );

        if (updatedPoltParty) {
            // Respond with status code 200 (OK) if successful
            res.status(200).send("Voting results updated");

            // Decrypt already encrypted data
            tempPoltParty.vote_results = cryptr.decrypt(tempPoltParty.vote_results);
            updatedPoltParty.vote_results = cryptr.decrypt(updatedPoltParty.vote_results);

            // Insert audit log document
            new PoliticalPartyAuditTrail({
                userIPAddress: req.socket.remoteAddress,
                operation: "update",
                documentID: updatedPoltParty._id,
                dataBefore: {
                    vote_results: tempPoltParty.vote_results
                },
                dataAfter: {
                    vote_results: updatedPoltParty.vote_results
                },
                outcome: "success",
            }).save();

        } else {
            // Respond with status code 400 (Bad Request) if unsuccessful
            res.status(400).send("Failed to update voting results");

            // Decrypt already encrypted data
            tempPoltParty.vote_results = cryptr.decrypt(tempPoltParty.vote_results);

            // Insert audit log document
            new PoliticalPartyAuditTrail({
                userIPAddress: req.socket.remoteAddress,
                operation: "update",
                documentID: tempPoltParty._id,
                dataBefore: {
                    vote_results: tempPoltParty.vote_results
                },
                dataAfter: {
                    vote_results: tempPoltParty.vote_results
                },
                outcome: "failure",
            }).save();

        }

    } catch (err) {
        // Print error message
        console.log(err.message);
    }
};

// Method to delete a particular political party
const deletePoliticalParty = async (req, res) => {
    try {

        // Instantiate Cryptr object
        const cryptr = new Cryptr(process.env.SECRET_KEY);

        const deletedPoltParty = await PoliticalParty.findOneAndDelete({
            partyID: req.params.id,
        });

        if (deletedPoltParty) {
            // Respond with status code 200 (OK) if successful
            res.status(200).send("Political Party deleted successfully");

            const { phone_no, email, competitor_count, vote_results } = await decryptData(
                cryptr,
                deletedPoltParty.phone_no,
                deletedPoltParty.email,
                deletedPoltParty.competitor_count,
                deletedPoltParty.vote_results
            );

            // Assign decrypted data to respective properties of the object
            deletedPoltParty.phone_no = phone_no;
            deletedPoltParty.email = email;
            deletedPoltParty.competitor_count = competitor_count;
            deletedPoltParty.vote_results = vote_results;

            // Insert audit log document
            new PoliticalPartyAuditTrail({
                userIPAddress: req.socket.remoteAddress,
                operation: "delete",
                documentID: deletedPoltParty._id,
                dataBefore: deletedPoltParty,
                dataAfter: "",
                outcome: "success",
            }).save();

        } else {
            // Respond with status code 400 (Bad Request) if unsuccessful
            res.status(400).send("Failed to delete political party");

            let tempPoltParty = await PoliticalParty.findOne({ partyID: req.params.id });

            const { phone_no, email, competitor_count, vote_results } = await decryptData(
                cryptr,
                tempPoltParty.phone_no,
                tempPoltParty.email,
                tempPoltParty.competitor_count,
                tempPoltParty.vote_results
            );

            // Assign decrypted data to respective properties of the object
            tempPoltParty.phone_no = phone_no;
            tempPoltParty.email = email;
            tempPoltParty.competitor_count = competitor_count;
            tempPoltParty.vote_results = vote_results;

            // Insert audit log document
            new PoliticalPartyAuditTrail({
                userIPAddress: req.socket.remoteAddress,
                operation: "delete",
                documentID: tempPoltParty._id,
                dataBefore: tempPoltParty,
                dataAfter: tempPoltParty,
                outcome: "failure",
            }).save();

        }

    } catch (err) {
        // Print error message
        console.log(err.message);
    }
};


// Method to upload the desired photo to google drive
const uploadPhoto = async (req) => {
    try {
        // Assign file object to variable
        const fileObject = req.file;

        const bufferStream = new stream.PassThrough();

        bufferStream.end(fileObject.buffer);

        // Google authentication
        const auth = new google.auth.GoogleAuth({
            keyFile: "./googlekey.json",
            scopes: ["https://www.googleapis.com/auth/drive"],
        });

        // Google drive service
        const driveService = google.drive({
            version: "v3",
            auth,
        });

        // Define the metadata required
        const fileMetaData = {
            name: Date.now(),
            parents: [process.env.GOOGLE_API_FOLDER_ID],
        };

        // Define the media parameters for the file
        const media = {
            mimeType: "image/*",
            body: bufferStream,
        };

        // Get the response from the driveService
        const response = await driveService.files.create({
            resource: fileMetaData,
            media: media,
            field: "id",
        });

        // Return the id associated with the uploaded file
        return response.data.id;

    } catch (err) {
        // Print error message
        console.log(err.message);
    }
};


// Method to upload a photo for the political party
const updatePhoto = async (req, res) => {
    try {
        // Instantiate Crypter object
        const cryptr = new Cryptr(process.env.SECRET_KEY);

        // Invoke the uploadPhoto() method
        const photoID = await uploadPhoto(req);

        if (photoID) {
            // Print the id for the newly uploaded image
            console.log(photoID);

            // Get details of the political party to which the logo will be updated
            const tempPoltParty = await PoliticalParty.findOne({ partyID: req.params.id });

            // Update the particular political party's logo
            const updatedPoltParty = await PoliticalParty.findOneAndUpdate(
                {
                    partyID: req.params.id,
                },
                {
                    $set: {
                        logo: `https://drive.google.com/uc?export=view&id=${photoID}`,
                    },
                },
                {
                    new: true,
                }
            );

            if (updatedPoltParty) {
                // Respond with status code 200 (OK) if successful
                res.status(200).send("Successfully uploaded the image for political party");

                // Insert an audit log document
                new PoliticalPartyAuditTrail({
                    userIPAddress: req.socket.remoteAddress,
                    operation: "update",
                    documentID: updatedPoltParty._id,
                    dataBefore: {
                        logo: tempPoltParty.logo
                    },
                    dataAfter: {
                        logo: updatedPoltParty.logo
                    },
                    outcome: "success",
                }).save();

            } else {
                // Respond with status code 400 (Bad Request) if unsuccessful
                res.status(400).send("Failed to upload the image for political party");

                // Insert an audit log document
                new SellerAuditTrail({
                    userIPAddress: req.socket.remoteAddress,
                    operation: "update",
                    documentID: tempPoltParty._id,
                    dataBefore: {
                        logo: tempPoltParty.logo
                    },
                    dataAfter: {
                        logo: tempPoltParty.logo
                    }
                    ,
                    outcome: "failure",
                }).save();
            }
        } else {
            // Respond with status code 400 (Bad Request) if unsuccessful
            res.status(400).send("Failed to upload the image to cloud");

            // Insert an audit log document
            new SellerAuditTrail({
                userIPAddress: req.socket.remoteAddress,
                operation: "update",
                documentID: tempPoltParty._id,
                dataBefore: {
                    logo: tempPoltParty.logo
                },
                dataAfter: {
                    logo: tempPoltParty.logo
                }
                ,
                outcome: "failure",
            }).save();
        }

    } catch (err) {
        // Print the error message
        console.log(err.message);
    }
};

module.exports = {
    getAllPoliticalParties,
    getPoliticalParty,
    addPoliticalParty,
    updatePoliticalParty,
    updateVoteResults,
    deletePoliticalParty,
    updatePhoto
};