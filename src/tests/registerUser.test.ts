import axios from "axios";

describe("handles signup or register of new User", () => {
  const url = "http://localhost:8000/api/signup";

  test("mail already taken", async () => {
    const email = "upesh@gmail.com";
    const username = "testUser";
    const password = "testUser123";

    const res = await axios.post(url, {
      email,
      username,
      password,
    });

    expect(res.data).toEqual({
      newUser: {
        error: "User with email already exists",
      },
    });
  });

  test("email empty", async () => {
    const email = "";
    const username = "testUser";
    const password = "testUser123";
    try {
      await axios.post(url, { email, username, password });
    } catch (err) {
      expect(err.response?.status).toBe(400);
      expect(err.response.data.error).toBe("please fill all the credentials");
    }
  });

  test("username empty", async () => {
    const email = "testuser@mail.com";
    const username = "";
    const password = "testUser123";
    try {
      await axios.post(url, { email, username, password });
    } catch (err) {
      expect(err.response?.status).toBe(400);
      expect(err.response.data.error).toBe("please fill all the credentials");
    }
  });

  test("email empty", async () => {
    const email = "testuser@mail.com";
    const username = "testUser";
    const password = "";
    try {
      await axios.post(url, { email, username, password });
    } catch (err) {
      expect(err.response?.status).toBe(400);
      expect(err.response.data.error).toBe("please fill all the credentials");
    }
  });

  test("register user", async () => {
    const email = "newTestUser@mail.com";
    const username = "newTestUser";
    const password = "newTestUser";
    const res = await axios.post(url, {
      email,
      username,
      password,
    });
    expect(res.data).toEqual({
      msg: "User created successfully",
      user: {
        email: email,
        username: username,
        password: res.data.user.password,
        id: res.data.user.id,
      },
    });
  });
});
