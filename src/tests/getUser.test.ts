import axios from "axios";
const url = 'http://localhost:8000/api/user/upesh@gmail.com';

describe('The Router', () => {
    test('get user', async() => {
        const res = await axios.get(url)
        expect(res.status).toBe(200);
        expect(res.data).toEqual('welcome upesh')
    })
})
