import client from "./client";
const endpoint = "/faculties";

const getCurrentUser = (userId) => client.get(`${endpoint}/${userId}`);
const registerUser = (user) => client.post(`${endpoint}`, user);

const updateUserInfo = (id, user) => client.patch(`${endpoint}/${id}`, user);
const updateUserBasicInfo = (id, user) => client.put(`${endpoint}/${id}`, user);
const updateProfilePicture = (id, info) => {
  const formData = new FormData();
  formData.append("image", info);

  return client.patch(`${endpoint}/upload-profile/${id}`, formData);
};

const changePassword = (userId, password) =>
  client.patch(`${endpoint}/change-password/${userId}`, { password });

const forgotPassword = (email) =>
  client.get(`${endpoint}/forgot-password/${email}`);

const userApi = {
  registerUser,
  changePassword,
  getCurrentUser,
  updateUserInfo,
  updateUserBasicInfo,
  updateProfilePicture,
  forgotPassword,
};
export default userApi;
