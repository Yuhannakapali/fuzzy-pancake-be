import axios from "axios";
// import { loginUser } from "../services/userServices";

const url = "http://localhost:8000/api/login"

test('return the logged in user info', async() => {
    const email = 'upesh@gmail.com';
    const password = 'upesh123';
    const res = await axios.post(url, {
        email,
        password
    })
    // const user = await loginUser(email, password);
    
    expect(res.status).toBe(200);
    expect(res.data).toEqual({
        user: {
          success: true,
          status: 200,
          message: 'welcome',
          username: 'upesh',
          token: res.data.user.token
        },
     });
})