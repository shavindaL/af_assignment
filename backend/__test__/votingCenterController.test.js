require("dotenv").config();

// Import mongoose module
const mongoose = require("mongoose");

// Import supertest module
const request = require("supertest");

// Import app file
const app = require("../server");

// Test suite for CRUD operations  (Backend)
describe("Backend CRUD operations", () => {

    // Terminate DB connection after performing all tests
    afterAll(async () => {
        await mongoose.connection.close();
    })

    /**
     * Test case 1
     */
    describe("GET request at /api/v1/voting-centers URI", () => {
        // Test case 1a
        test("Get all political parties", async () => {

            const res = await request(app).get("/api/v1/voting-centers/");

            // Assertion 1 - Expect the status code to be 200
            expect(res.statusCode).toEqual(200);

            // Assertion 2 - Expect the response body to be an array
            expect(res.body).toEqual(expect.arrayContaining(res.body));
        });
    });


    /**
     * Test case 2
     */
    describe("GET request at /api/v1/voting-centers/ URI", () => {

        // Test case 2a (success scenario)
        test("Get a particular voting center (success scenario)", async () => {
            // Valid value
            let centerId = 1;

            // Invoke GET request
            const res = await request(app).get("/api/v1/voting-centers/" + centerId);

            // Assertion 1 - Expect the status code to be 200
            expect(res.statusCode).toEqual(200);

            // Assertion 2 - Expect the response body to be an object with values
            expect(res.body).toEqual(expect.objectContaining(res.body));

            // Assertion 3 - Expect the partyID to be 1
            expect(res.body.votingCenters.votingCenterId).toBe("1");
        });



        // Test case 2b (failure scenario)
        test("Get a particular voting center (failure scenario)", async () => {
            // Invalid value
            let centerId = 12;

            // Invoke GET request
            const res = await request(app).get(`/api/v1/voting-centers/${centerId}`);

            // Assertion 1 - Expect status code to be 400
            expect(res.status).toBe(404);
        });

    });

    /**
    * Test Case 3
    */
    describe("POST request at /api/v1/voting-centers/signup URI", () => {

        // Test case 3a (success scenario) 
        test("Add new voting center (success scenario) ", async () => {

            const res = await request(app).post("/api/v1/voting-centers/signup").send({
                votingCenterLocation: "uva",
                votingCenterOfficialId: "001",
                votingCenterOfficialName: "ABC Silva",
                votingCenterContactNo: "0112345678",
                votingCenterPassowrd: "Abcd#1234"
            });

            // Assertion 1 - Expect status code to be 201
            expect(res.status).toBe(201);

            // Assertion 2 - Expect the appropriate response text
            expect(res.body.votingCenter.votingCenterLocation).toBe("uva");

        });

        // Test case 3b (failure scenario) 
        test("Add new voting center (failure scenario) ", async () => {

            // Invoke POST request with an already existing email
            const res = await request(app).post("/api/v1/voting-centers/signup").send({
                votingCenterLocation: "western",
                votingCenterOfficialId: "001",
                votingCenterOfficialName: "ABC Silva",
                votingCenterContactNo: "0112345678",
                votingCenterPassowrd: "Abcd#1234"
            });

            // Assertion 1 - Expect status code to be 400
            expect(res.status).toBe(404);

            // Assertion 2 - Expect the appropriate response text


        });
    });

    describe("POST request at /api/v1/voting-centers/login URI", () => {

        // Test case 3a (success scenario) 
        test("Login to a voting center (success scenario) ", async () => {

            const res = await request(app).post("/api/v1/voting-centers/login").send({
                votingCenterLocation: "central",
                votingCenterPassowrd: "Abcd#1234"
            });

            // Assertion 1 - Expect status code to be 200
            expect(res.status).toBe(200);

            // Assertion 2 - Expect the appropriate response text
            expect(res.body.location).toBe("central");

        });

        // Test case 3b (failure scenario) 
        test("Login to a voting center (failure scenario) ", async () => {

            // Invoke POST request with invalid data
            const res = await request(app).post("/api/v1/voting-centers/login").send({
                votingCenterLocation: "central",
                votingCenterPassowrd: "1234"
            });

            // Assertion 1 - Expect status code to be 404
            expect(res.status).toBe(404);
        });
    });

});
