import axios from "axios";

const instance = axios.create({
//     baseURL: "https://renturbookmern.herokuapp.com",
     baseURL: "http://localhost:5000",
    
});

export default instance;