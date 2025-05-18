import requests from "./httpServices";

const CouponServices = {
  // Get all coupons
  getAllCoupons: async () => {
    return requests.get("/coupon");
  },

  // Get only enabled (showing) coupons
  getShowingCoupons: async () => {
    return requests.get("/coupon/show");
  },

  // Get a single coupon by ID
  getCouponById: async (id) => {
    return requests.get(`/coupon/${id}`);
  },

  // Add a new coupon
  addCoupon: async (couponData) => {
    return requests.post("/coupon/add", couponData);
  },

  // Add multiple coupons
  addAllCoupons: async (couponsData) => {
    return requests.post("/coupon/add/all", couponsData);
  },

  // Apply coupon to product
  applyCouponToProduct: async (data) => {
    return requests.post("/coupon/apply", data);
  },

  // Update a single coupon by ID
  updateCouponById: async (id, couponData) => {
    return requests.put(`/coupon/${id}`, couponData);
  },

  // Update multiple coupons
  updateManyCoupons: async (couponsData) => {
    return requests.patch("/coupon/update/many", couponsData);
  },

  // Show/hide a coupon (update status)
  updateCouponStatus: async (id, status) => {
    return requests.put(`/coupon/status/${id}`, { status });
  },

  // Delete a single coupon by ID
  deleteCouponById: async (id) => {
    return requests.delete(`/coupon/${id}`);
  },

  // Delete multiple coupons
  deleteManyCoupons: async (couponsData) => {
    return requests.patch("/coupon/delete/many", couponsData);
  },
};

export default CouponServices;
