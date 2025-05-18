
import axios from "axios";
import Cookies from "js-cookie";

import { baseurl } from "@/config/setting";

export const get = async (endpint, query, header) => {
  const tokens = getCookiesData();

  const option = {
    method: "get",
    url: baseurl + endpint,
    headers: {
      ...tokens,
      ...header,
    },
    params: query,
  };
  let response;
  let error;
  try {
    response = await axios.request(option);
  } catch (e) {
    error = e.response?.data;

    //throw new Error(JSON.stringify(e.response.data));
  }
  return response?.data ? response?.data : error; // or set initial value
};

export const getsingle = async (endpint, id, query, header) => {
  const tokens = getCookiesData();

  const option = {
    method: "get",
    url: baseurl + endpint + `/${id}`,
    headers: {
      ...tokens,
      ...header,
    },
    params: query,
  };
  let response;
  let error;
  try {
    response = await axios.request(option);
  } catch (e) {
    error = e.response?.data;

    throw new Error(JSON.stringify(e.response.data));
  }
  return response?.data ? response?.data : error; // or set initial value
};

export const serverMethod = async (endpint, params) => {
  const option = {
    method: params.method,
    url: baseurl + endpint,
    headers: {
      ...params.header,
    },
    params: params?.query,
    data: params?.data,
  };
  let response;
  let error;
  try {
    response = await axios.request(option);
  } catch (e) {
    error = e.response;
  }
  return response?.data ? response?.data : error;
};

export const post = async (endpint, body, header) => {
  const tokens = getCookiesData();

  const option = {
    method: "post",
    url: baseurl + endpint,
    headers: {
      ...tokens,
      ...header,
    },
    params: {},
    data: body,
  };
  let response;
  let error;
  try {
    response = await axios.request(option);
  } catch (e) {
    error = e.response?.data ? e.response?.data : e.response;
  }

  // if success return value
  return response?.data ? response.data : error; // or set initial value
};

export const patch = async (endpint, body, id, header) => {
  const tokens = getCookiesData();
  const option = {
    method: "patch",
    url: baseurl + endpint + `/${id}`,
    headers: {
      ...header,
      ...tokens,
    },
    params: {},
    data: body,
  };
  let response;
  let error;
  try {
    response = await axios.request(option);
  } catch (e) {
    error = e?.response;

    // throw new Error(JSON.stringify(e.response.data));
  }
  return response?.data ? response?.data : error; // or set initial value
};

export const put = async (endpint, body, id, header) => {
  const tokens = getCookiesData();

  const option = {
    method: "put",
    url: baseurl + endpint + `/${id}`,
    headers: {
      ...tokens,
      ...header,
    },
    params: {},
    data: body,
  };
  let response;
  let error;
  try {
    response = await axios.request(option);
  } catch (e) {
    error = e.response.data;

    // throw new Error(JSON.stringify(e.response.data));
  }
  return response?.data ? response?.data : error; // or set initial value
};

export const del = async (endpoint, id, header) => {
  const tokens = getCookiesData();

  const option = {
    method: "delete",
    url: baseurl + endpoint + `/${id}`,
    headers: {
      ...tokens,
      ...header,
    },
    params: {},
    data: {},
  };
  let response;
  let error;
  try {
    response = await axios.request(option);
  } catch (e) {
    error = e.response.data;

    // throw new Error(JSON.stringify(e.response.data));
  }
  return response?.data ? response?.data : error; // or set initial value
};

export const getCookiesData = (second) => {
  const cookiesData = Cookies.get();
  const Authorization =
    "Bearer " + cookiesData?.["headerPayload"] + "." + cookiesData?.["signature"];
  return {
    Authorization,
  };
};
