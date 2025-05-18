import requests from "./httpServices";

const dealService = {
  getallDeals: async (body,headers) => {
    return await requests.post("/infin8v2/get-deals", body,headers);
  },
  getSingleDeal: async (body,headers) => {
    return await requests.post("/infin8v2/get-deal-by-id", body,headers);
  },
  getFullDealDetails: async (body,headers) => {
    return requests.post("/infin8v2/get-full-deal-details-new", body,headers);
  },
  updateDealInfo: async (body) => {
    return requests.post("/infin8v2/update-deal", body);
  }

};

export default dealService;
