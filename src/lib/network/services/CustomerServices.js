import requests from "./httpServices";

const CustomerServices = {
  customerLogin: async (body) => {
    return requests.post("/customer/auth/login", body);
  },

  verifyEmailAddress: async (body) => {
    return requests.post("/customer/auth/verify-email", body);
  },

  registerCustomer: async (token, body) => {
    return requests.post(`/customer/auth/register/${token}`, body);
  },

  signUpWithProvider(token, body) {
    return requests.post(`/customer/auth/signup/${token}`, body);
  },

  forgetPassword: async (body) => {
    return requests.patch("/user/auth/forget-password",body);
  },

  resetPassword: async (body,params) => {
    return requests.patch("/user/auth/reset-password/:token", body, params);
  },

  
  getProfile: async (query, headers) => {
    return requests.get("/users/customer/profile",query,null, headers,0);
  },
  changePassword: async (body, headers) => {
    return requests.post("/user/auth/change-password", body, headers);
  },

  updateCustomer: async (headers, body) => {
    return requests.patch(`/user/auth/profile/update`,body, null, headers);
  },
  addCustomerAddress: async (headers, body) => {
    return requests.post(`/address`,body, headers);
  },
  updateCustomerAddress: async (headers, body,params) => {
    return requests.patch(`/address/:id`,body, params, headers);
  },
  fetchCustomerAddress: async (headers,query) => {
    return requests.get(`/address`,query, null, headers,0);
  },
  fetchCustomerSingleAddress: async (headers, params) => {
    return requests.get(`/address/:id`,null, params, headers,0);
  },
  customerDashboard: async (query, headers) => {
    return requests.get(`/orders/customer/dashboard`, query, null, headers,0);
  },
  
};

export default CustomerServices;
