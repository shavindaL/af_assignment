require("dotenv").config();

// Import mongoose module
const mongoose = require("mongoose");

// Import supertest module
const request = require("supertest");

// Import app file
const app = require("../server");


// Main Test suite for CRUD operations  (Backend)
describe("Backend CRUD operations", () => {

    // Terminate DB connection after performing all tests
    afterAll(async () => {
        await mongoose.connection.close();
    })

    /**
     * Sub Test Suite 1
     */
    describe("GET request at /api/v1/political-parties URI", () => {
        
        // Test case 1a
        test("Get all political parties", async () => {

            const res = await request(app).get("/api/v1/political-parties");

            // Assertion 1 - Expect the status code to be 200
            expect(res.statusCode).toEqual(200);

            // Assertion 2 - Expect the response body to be an array
            expect(res.body).toBeInstanceOf(Array);
        });
    });


    /**
     * Sub Test Suite 2
     */
    describe("GET request at /api/v1/political-parties/:id URI", () => {

        // Test case 2a (success scenario)
        test("Get a particular political party (success scenario)", async () => {
            // Valid value
            let partyID = 1;

            // Invoke GET request
            const res = await request(app).get("/api/v1/political-parties/" + partyID);

            // Assertion 1 - Expect the status code to be 200
            expect(res.statusCode).toEqual(200);

            // Assertion 2 - Expect the response body to be an object with values
            expect(res.body).toEqual(expect.objectContaining(res.body));

            // Assertion 3 - Expect the partyID to be 1
            expect(res.body.partyID).toBe(1);
        });



        // Test case 2b (failure scenario)
        test("Get a particular political party (failure scenario)", async () => {
            // Invalid value
            let partyID = 8;

            // Invoke GET request
            const res = await request(app).get(`/api/v1/political-parties/${partyID}`);

            // Assertion 1 - Expect status code to be 400
            expect(res.status).toBe(400);

            // Assertion 2 - Expect the appropriate response text
            expect(res.text).toBe("Failed to find the political party");

        });

    });



    /**
    * Sub Test Suite 3
    */
    describe("POST request at /api/v1/political-parties URI", () => {

        // Test case 3a (success scenario) 
        test("Add new political party (success scenario) ", async () => {

            const res = await request(app).post("/api/v1/political-parties").send({
                "name": "NYC",
                "phone_no": "0112908760",
                "email": "nyc2023@gmail.com",
                "leader_name": "Peiris",
                "description": "A new political party with a new vision",
                "competitor_count": "28"
            });

            // Assertion 1 - Expect status code to be 201
            expect(res.status).toBe(201);

            // Assertion 2 - Expect the appropriate response text
            expect(res.text).toBe("Political Party added successfully");

        });

        // Test case 3b (failure scenario) 
        test("Add new political party (failure scenario) ", async () => {

            // Invoke POST request with an already existing email
            const res = await request(app).post("/api/v1/political-parties").send({
                "name": "NYC",
                "phone_no": "0112908760",
                "email": "slfp2023@gmail.com",
                "leader_name": "Peiris",
                "description": "A new political party with a new vision",
                "competitor_count": "28"
            });

            // Assertion 1 - Expect status code to be 400
            expect(res.status).toBe(400);

            // Assertion 2 - Expect the appropriate response text
            expect(res.text).toBe("Sorry, this email is already taken");

        });

        // Test case 3c (failure scenario) 
        test("Add new political party (failure scenario)", async () => {

            // Invoke POST request with an already existing phone number
            const res = await request(app).post("/api/v1/political-parties").send({
                "name": "NYC",
                "phone_no": "0112675430",
                "email": "nyc2023@gmail.com",
                "leader_name": "Silva",
                "description": "A new political party with a new vision",
                "competitor_count": "10"
            });

            // Assertion 1 - Expect status code to be 400
            expect(res.status).toBe(400);

            // Assertion 2 - Expect the appropriate response text
            expect(res.text).toBe("Sorry, this phone number is already taken");

        });


        // Test case 3d (failure scenario) 
        test("Add new political party (failure scenario)", async () => {

            // Invoke POST request with an already existing email and phone number both
            const res = await request(app).post("/api/v1/political-parties").send({
                "name": "NYC",
                "phone_no": "0112675430",
                "email": "slfp2023@gmail.com",
                "leader_name": "Silva",
                "description": "A new political party with a new vision",
                "competitor_count": "10"
            });

            // Assertion 1 - Expect status code to be 400
            expect(res.status).toBe(400);

            // Assertion 2 - Expect the appropriate response text
            // This response text is shown since the backend logic first validates the email before phone number
            expect(res.text).toBe("Sorry, this email is already taken");

        });

    });





    /**
     * Sub Test Suite 4
     */
    describe("PUT request at /api/v1/political-parties/:id URI", () => {
        // Test case 4a (success scenario) 
        test("Update political party (success scenario) ", async () => {

            // Valid value
            const partyID = 4;

            // Invoke PUT request with updated details
            const res = await request(app).put(`/api/v1/political-parties/${partyID}`).send({
                "name": "NPC",
                "phone_no": "0113675690",
                "email": "npc2023@gmail.com",
                "leader_name": "Liyanage",
                "description": "A good party",
                "competitor_count": "10",
                "vote_results": "5"
            });

            // Assertion 1 - Expect status code to be 200
            expect(res.status).toBe(200);

            // Assertion 2 - Expect the appropriate response text
            expect(res.text).toBe("Political party updated successfully");

        });


        // Test case 4b (failure scenario) 
        test("Update political party (failure scenario) ", async () => {

            // Valid value
            const partyID = 4;

            // Invoke PUT request with an existing email of another party
            const res = await request(app).put(`/api/v1/political-parties/${partyID}`).send({
                "name": "ABC",
                "phone_no": "0113764320",
                "email": "slfp2023@gmail.com",
                "leader_name": "Perera",
                "description": "This is a good political party",
                "competitor_count": "5",
                "vote_results": "8"
            });

            // Assertion 1 - Expect status code to be 400
            expect(res.status).toBe(400);

            // Assertion 2 - Expect the appropriate response text
            expect(res.text).toBe("Sorry, this email is already taken");

        });

        // Test case 4c (failure scenario) 
        test("Update political party (failure scenario) ", async () => {

            // Valid value
            const partyID = 4;

            // Invoke PUT request with an existing phone number of another party
            const res = await request(app).put(`/api/v1/political-parties/${partyID}`).send({
                "name": "NPC",
                "phone_no": "0112675430",
                "email": "npc@gmail.com",
                "leader_name": "Perera",
                "description": "This is a good political party",
                "competitor_count": "5",
                "vote_results": "9"
            });

            // Assertion 1 - Expect status code to be 400
            expect(res.status).toBe(400);

            // Assertion 2 - Expect the appropriate response text
            expect(res.text).toBe("Sorry, this phone number is already taken");

        });

        // Test case 4d (failure scenario) 
        test("Update political party (failure scenario)", async () => {

            // Valid value
            const partyID = 4;

            // Invoke PUT request with an existing email and phone number of another party
            const res = await request(app).put(`/api/v1/political-parties/${partyID}`).send({
                "name": "NPC",
                "phone_no": "0112675430",
                "email": "slfp2023@gmail.com",
                "leader_name": "Perera",
                "description": "This is a good political party",
                "competitor_count": "5",
                "vote_results": "23"
            });

            // Assertion 1 - Expect status code to be 400
            expect(res.status).toBe(400);

            // Assertion 2 - Expect the appropriate response text
            // This response text is shown since the backend logic first validates the email before phone number
            expect(res.text).toBe("Sorry, this email is already taken");

        });
    });




    /**
     * Sub Test Suite 5
     */
    describe("PATCH request at /api/v1/political-parties/:id URI", () => {

        // Test case 5a (success scenario)
        test("Update vote results of a particular political party (success scenario)", async () => {
            // Valid value
            const partyID = 4;

            // Invoke PATCH request 
            const res = await request(app).patch(`/api/v1/political-parties/${partyID}`).send({
                "vote_results": "10"
            });

            // Assertion 1 - Expect status code to be 200
            expect(res.status).toBe(200);

            // Assertion 2 - Expect the appropriate response text
            expect(res.text).toBe("Voting results updated");

        });

        // Test case 5b (failure scenario)
        test("Update vote results of a particular political party (failure scenario)", async () => {
            // Invalid value
            const partyID = 9;

            // Invoke PATCH request 
            const res = await request(app).patch(`/api/v1/political-parties/${partyID}`).send({
                "vote_results": "10"
            });

            // Assertion 1 - Expect status code to be 400
            expect(res.status).toBe(400);

            // Assertion 2 - Expect the appropriate response text
            expect(res.text).toBe("Failed to update voting results");

        });

    });



    /**
     * Sub Test Suite 6
     */
    describe("DELETE request at /api/v1/political-parties/:id URI", () => {
        
        // Test case 6a (success scenario)
        test("Delete a particular political party (success scenario)", async () => {
            // Valid value
            const partyID = 4;

            // Invoke DELETE request 
            const res = await request(app).delete(`/api/v1/political-parties/${partyID}`);

            // Assertion 1 - Expect status code to be 200
            expect(res.status).toBe(200);

            // Assertion 2 - Expect the appropriate response text
            expect(res.text).toBe("Political Party deleted successfully");

        });

        // Test case 6b (failure scenario)
        test("Delete a particular political party (failure scenario)", async () => {
            // Invalid value
            const partyID = 10;

            // Invoke DELETE request 
            const res = await request(app).delete(`/api/v1/political-parties/${partyID}`);

            // Assertion 1 - Expect status code to be 200
            expect(res.status).toBe(400);

            // Assertion 2 - Expect the appropriate response text
            expect(res.text).toBe("Failed to delete political party");

        });
    });




});