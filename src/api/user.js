import client from "./client";

const endpoint = "/faculties";
const activateAccount = (user) =>
  client.get(`${endpoint}/activate-account/${user.email}`);

const getCurrentUser = (userId) => client(`${endpoint}/${userId}`);

const changePassword = (userId, password) =>
  client.patch(`${endpoint}/change-password/${userId}`, { password });

const userApi = { activateAccount, changePassword, getCurrentUser };
export default userApi;
