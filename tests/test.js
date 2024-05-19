const request = require("supertest"); // Importing supertest library for HTTP assertions
const app = require("../index"); // Importing the Express app to be tested

// Testing POST endpoint /sleep

describe("POST /sleep", () => {
  // Test case
  it("should create a new sleep record", async () => {
    const res = await request(app)
      .post("/sleep")
      .send({ userId: "user123", hours: 8 });

    // Assertions for response status code and body properties
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body.userId).toEqual("user123");
    expect(res.body.hours).toEqual(8);
    expect(res.body).toHaveProperty("timestamp");
  });

  // Test case
  it("should return 400 if userId or hours is missing", async () => {
    const res = await request(app).post("/sleep").send({ userId: "user123" });

    // Assertions for response status code and error message
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("userId and hours are required");
  });

  // Test case
  it("should return 400 if hours is not a number", async () => {
    const res = await request(app)
      .post("/sleep")
      .send({ userId: "user123", hours: "nine" });

    // Assertions for response status code and error message
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("hours must be a number");
  });
});

// Testing GET endpoint /sleep/:userId

describe("GET /sleep/:userId", () => {
  // Test case
  it("should return sleep records for a specific user", async () => {
    const res = await request(app).get("/sleep/user123");

    // Assertions for response status code and body properties
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  // Test case
  it("should return 404 if user is not found", async () => {
    const res = await request(app).get("/sleep/unknownUser");

    // Assertions for response status code and error message
    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toEqual("UserId not found");
  });
});

// Testing DELETE endpoint /sleep/:recordId

describe("DELETE /sleep/:recordId", () => {
  // Test case
  it("should delete a sleep record", async () => {
    const res = await request(app).delete("/sleep/1");

    // Assertions for response status code and sucess message
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual("Record deleted successfully");
  });

  // Test case
  it("should return 404 if record is not found", async () => {
    const res = await request(app).delete("/sleep/999");

    // Assertions for response status code and error message
    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toEqual("Record not found");
  });
});
