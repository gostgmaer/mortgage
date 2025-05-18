import requests from "./httpServices";

const CategoryServices = {
  getShowingCategory: async () => {
    return requests.get("/categories/data/show");
  },
};

export default CategoryServices;
