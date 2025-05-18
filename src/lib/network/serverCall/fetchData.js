// utils/fetchData.js

import { baseurl } from "@/config/setting";
import { getCookiesData } from "@/helper/functions";

export async function fetchData(endpoint, options = {}) {
  try {
    const {
      method = "GET",
      body,
      params = {},
      query = {}, headers = {},
      cacheTime = 60,
    } = options;

    // const tokens = getCookiesData();

    /////console.log(tokens);
    

    // Validate token and endpoint
    if (!endpoint || typeof endpoint !== "string" || endpoint.trim() === "") {
      throw new Error("Invalid or missing endpoint");
    }

    // if (!token || typeof token !== 'string' || token.trim() === '') {
    //   throw new Error('Invalid or missing authorization token');
    // }

    // Build the URL
    let url = `${baseurl}${endpoint}`;

    // Validate and replace URL params
    if (params && Object.keys(params).length > 0) {
      Object.keys(params).forEach((key) => {
        const value = params[key];
        if (value === undefined || value === null || value === "") {
          throw new Error(`Invalid or missing URL parameter: ${key}`);
        }
        url = url.replace(`:${key}`, value);
      });
    }

    // Validate and append query parameters
    if (query && typeof query === "object") {
      const validQuery = Object.entries(query)
        .filter(
          ([_, value]) => value !== undefined && value !== null && value !== ""
        ) // Filter out invalid values
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});

      const queryString = new URLSearchParams(validQuery).toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }
    const defaultHeaders = {
      'Content-Type': 'application/json'
    
    };
    const mergedHeaders = { ...defaultHeaders, ...headers };

    // Make the fetch request
    const res = await fetch(url, {
      method,
      headers: mergedHeaders,
      body:
        method === "POST" || method === "PATCH" || method === "PUT"
          ? JSON.stringify(body)
          : undefined,
      next: { revalidate: cacheTime },
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch data: ${res.status} - ${res.statusText}`
      );
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return { error: "Data could not be fetched" };
  }
}


const requests = {
  get: async (endpoint, query, params, headers) =>
    await fetchData(endpoint, {
      cacheTime: 300,
      query, params, headers // Cache for 5 minutes
    }),
  post: async (endpoint, body, headers) =>
    await fetchData(endpoint, {method:'POST',
      cacheTime: 300,
      body, headers // Cache for 5 minutes
    }),
  put: async (endpoint, body, params, headers) =>
    await fetchData(endpoint, {method:'PUT',
      cacheTime: 300, body, params, headers // Cache for 5 minutes
    }),
  patch: async (endpoint, body, params, headers) =>
    await fetchData(endpoint, {method:'PATCH',
      cacheTime: 300, body, params, headers // Cache for 5 minutes
    }),
  delete: async (endpoint, params, headers) =>
    await fetchData(endpoint, {method:'POST',
      cacheTime: 300, params, headers // Cache for 5 minutes
    }),


};

export default requests;
