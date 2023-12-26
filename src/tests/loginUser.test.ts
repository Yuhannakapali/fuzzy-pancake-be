import axios from "axios";
// import { loginUser } from "../services/userServices";
describe('test for login procedure',()=> {

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

    test("user not found" , async() => {
        const email = 'nosuchmail@mail.com';
        const password = "nothisuser";
        
        const res = await axios.post(url,{
            email,
            password
        })
        // expect(res.status).toBe(404);
        expect(res.data).toEqual({
            user: {
                success: false,
                status: 404,
                error: "user with this email does not exist"
            }
        })
    })

    test("password didnot matched", async() => {
        const email = 'upesh@gmail.com';
        const password = 'wrongPassword';

        const res = await axios.post(url, {
            email,
            password
        })

        expect(res.data).toEqual({
            user: {
                success: false,
                status: 400,
                error: "password did not match with this email"
            }
        })
    })
})