import { baseurl } from "@/config/setting";
import useSWR from "swr";

export const fetcher = (endpoint, token, urlParams = {}, query = {}, params = {}) => {
    // Replace URL placeholders with actual values from urlParams
    Object.keys(urlParams).forEach((key) => {
      endpoint = endpoint.replace(`:${key}`, urlParams[key]);
    });
  
    // Build query string from query object
    const queryString = new URLSearchParams(query).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
  
    // Set default options, including method, headers, and body if present
    const defaultOptions = {
      method: params.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Add token to Authorization header
      },
    };
  
    // If it's not a GET request, include the body in the options
    if (params.body) {
      defaultOptions.body = JSON.stringify(params.body);
    }
  
    return fetch(url, defaultOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      });
  };
  

export function useFetcher(endpoint) {
  const { data, error, isLoading } = useSWR(
    `${baseurl}${endpoint}?populate=*`,
    fetcher
  );

  return {
    data: data,
    isLoading,
    isError: error,
  };
}

export function useGetFetcher(endpoint, fetcherData) {
  const { data, error, isLoading } = useSWR(
    `${baseurl}${endpoint}?populate=*`,
    fetcherData
  );

  return {
    data: data,
    isLoading,
    isError: error,
  };
}