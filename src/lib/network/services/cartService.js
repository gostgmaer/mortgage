import requests from "../serverCall/fetchData";

const CartServices = {
  addtoCart: async (body, headers) => {
    return requests.post("/cart/add", body, headers);
  },

  updateCartItem: async (body, headers) => {
    return requests.post("/cart/update/:id", body, headers);
  },

  removeFromCartItem: async (body, headers) => {
    return requests.post("/cart/remove/:id", body, headers);
  },
  getCustomerCart: async (query, headers) => {
    return requests.get(`/order`, query, headers);
  }
 
};

export default CartServices;
