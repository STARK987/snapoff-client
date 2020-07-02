import axios from "axios";

axios.defaults.baseURL = "localhost:3001/api/";

export async function login(email, password) {
    return await axios.post("users/login", { email, password });
  }