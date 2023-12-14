import axiosClient from "./axiosClient";

const UserAPI = {
  getAllData: () => {
    const url = "admin/users/read";
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
    const url = `admin/users/login`;
    return axiosClient.post(url, { data });
  },

  getAccount: () => {
    const url = `client/user/account`;
    return axiosClient.get(url);
  },

  postLogout: () => {
    const url = `client/user/logout`;
    return axiosClient.post(url);
  },

  getDashBoard: () => {
    const url = `admin/users/dashboard`;
    return axiosClient.get(url);
  },
};

export default UserAPI;
