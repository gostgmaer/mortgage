
import requests from "./httpServices";


const wishlistServices = {
    addtowishlist: async (body, headers) => {
        return requests.post("/wishlist/add", body, headers);
    },

    fetchWishlist: async (headers) => {
        return requests.get("/wishlist/fetch",null,null, headers,1);
    },
    updatewishlistItem: async (body, headers) => {
        return requests.post("/wishlist/update/:id", body, headers);
    },

    removeFromwishlistItem: async (params, headers) => {
        return requests.delete("/wishlist/:id/remove", params, headers);
    },
    getCustomerwishlist: async (query, headers) => {
        return requests.get(`/order`, query, headers);
    }

};

export default wishlistServices;
