const axios = require("axios");
const BACKEND_URL = "http://localhost:3000";

describe("Authentication", () => {
  test("USER IS ABLE TO SIGN-UP FOR ONCE", async () => {
    const username = "nio" + Math.random();
    const password = "12345";
    const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
      type: "admin",
    });
    expext(response.statusCode).toBe(200);

    const updatedResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
      type: "admin",
    });

    expext(updatedResponse.statusCode).toBe(400);
  });


  test("SIGN-UP SHOULD FAIL IF USERNAME IS NOT PROVIDED", async () => {
    const username = "nio" + Math.random();
    const password = "12345";

    const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      password,
      type: "admin",
    });
    expect(response.statusCode).toBe(400);
  });


  test("USER IS ABLE TO SIGN-IN WITH CORRECT CREDENTIALS", async () => {
    const username = `neo-${Math.random()}`;
    const password = "12345";

    // Mock user registration first for sign-in test
    await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
      type: "admin",
    });
    // Sign-in attempt should succeed
    const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username,
      password,
    });

    expect(response.statusCode).toBe(200);
    expect(response.data).toHaveProperty("token"); // Check if token is provided
  });


  test("SIGN-IN SHOULD FAIL WITH INCORRECT CREDENTIALS", async () => {
    const username = `neo-${Math.random()}`;
    const password = "12345";  

    await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
      type: "admin",
    });

    try {
      await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        username:"wrong",
        password,
      });
    } catch (error) {
      expect(error.response.statusCode).toBe(401); // Assuming 401 Unauthorized for incorrect credentials
      expect(error.response.data.message).toBe("Invalid credentials"); // Adjust error message based on API response
    }
  });
});


describe("User endpoints", ()=>{
  beforeAll(()=>{

  })
})
 