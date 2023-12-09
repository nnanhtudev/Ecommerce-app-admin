import axiosClient from "./axiosClient";

const UserAPI = {
  getAllData: () => {
    const url = "/users/read";
    return axiosClient.get(url);
  },

  getDetailData: (id) => {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },

  postSignUp: (query) => {
    const url = `/users/signup/${query}`;
    return axiosClient.post(url);
  },

  postSignIn: (data) => {
    const url = `/users/login`;
    return axiosClient.post(url, { data });
  },
};

export default UserAPI;
