import axiosClient from "./axiosClient";

const ProductAPI = {
  getAPI: () => {
    const url = "admin/products/all";
    return axiosClient.get(url);
  },

  getCategory: (query) => {
    const url = `/products/category${query}`;
    return axiosClient.get(url);
  },

  getDetail: (id) => {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },

  getPagination: (query) => {
    const url = `admin/products/pagination${query}`;
    return axiosClient.get(url);
  },

  postCreateProduct: (data) => {
    const url = `/admin/products/add`;
    return axiosClient.post(url, { data });
  },
};

export default ProductAPI;
