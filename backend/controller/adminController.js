const Admin = require('../models/admin')

const getAllAdmins = (req, res) => {
    res.status(200).json({success:"success"})
}


// Method to get all existing admins
const getAdmins = async (req, res) => {
    try {
        // Get all existing documents from admins collection
        const admins = await Admin.find();

        if (admins) {

            // Respond with status code 200 (OK) if successful
            res.status(200).send(admins);

        } else {
            // Respond with status code 400 (Bad Request) if unsuccessful
            res.status(400).send("Failed to get admins"); 

    } } catch (err) {
        // Print error message
        console.log(err.message);
    }
};

// Method to add new admin
const addAdmin = async (req, res) => {

    // Create new document
    const admin = new Admin({
        
        adminID: req.body.adminID,
        adminName: req.body.adminName,
        password: req.body.password,
        email: req.body.email
        
    });

    try {

        // Insert the new document
        await admin.save();

        // Respond with status code 201 (Created) if successful
        res.status(201).send("Admin added successfully");

    } catch (err) {

        // Respond with status code 400 (Bad Request) if unsuccessful
        res.status(400).send("Failed to add the admin");

        // Print the error message
        console.log(err.message);
    }

};

// Method to get details of a particular admin
const getAdmin = async (req, res) => {

    try {

        // Find the particular document
        const admin = await Admin.findOne({ _id: req.params.id });

        // Respond with status code 200 (OK) if successful
        res.status(200).send(admin);

    } catch (err) {

        // Respond with status code 400 (Bad Request) if unsuccessful
        res.status(400).send("Failed to find admin");

        // Print the error message
        console.log(err.message);
    }

};


// Method to update details of a particular admin
const updateAdmin= async (req, res) => {

    try {

        // Update the particular document with the new data
        await Admin.findOneAndUpdate(
            {
                _id:
                    req.params.id
            },
            {
                $set:
                {
                    adminID: req.body.adminID,
                    adminName: req.body.adminName,
                    password: req.body.password,
                    email: req.body.email
                    
                }
            }
        );

        // Respond with status code 200 (OK) if successful
        res.status(200).send("Admin updated successfully");

    } catch (err) {

        // Respond with status code 400 (Bad Request) if unsuccessful
        res.status(400).send("Failed to update admin");

        // Print the error message
        console.log(err.message);
    }
};


// Method to delete a particular admin
const deleteAdmin = async (req, res) => {

    try {

        await Admin.findOneAndDelete({ _id: req.params.id })

        // Respond with status code 200 (OK) if successful
        res.status(200).send("Admin deleted successfully");

    } catch (err) {

        // Respond with status code 400 (Bad Request) if unsuccessful      
        res.status(400).send("Failed to delete admin");

        // Print the error message
        console.log(err.message);

    }
};

//* export all the functions
module.exports = {
    getAllAdmins,
    getAdmins,
    addAdmin,
    getAdmin,
    updateAdmin,
    deleteAdmin
}