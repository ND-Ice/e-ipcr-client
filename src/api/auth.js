import client from "./client";

const endpoint = "/auth";

const login = (user) => client.post(`${endpoint}/faculty`, user);

const authApi = { login };
export default authApi;
