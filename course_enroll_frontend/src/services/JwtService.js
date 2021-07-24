import axios from "../axios"

export default class JwtService {
    static login(username, password) {
        return axios.post('/api/token/', {
            username,
            password,
        });
    }
}
