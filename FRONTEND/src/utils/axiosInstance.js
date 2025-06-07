
import axios from "axios";

/**
 * Handles axios errors and returns a formatted error object
 * @param {Error} error - The error from axios
 * @returns {Object} Formatted error object
 */
const handleAxiosError = (error) => {
  // Default error structure
  let errorData = {
    message: "An unexpected error occurred",
    status: null,
    type: "UNKNOWN_ERROR",
    originalError: error
  };

  // Handle response errors (server responded with error status)
  if (error.response) {
    const { status, data } = error.response;
    errorData.status = status;
    
    // Extract message from response if available
    errorData.message = data?.message || `Request failed with status code ${status}`;
    
    // Set error type based on status code
    switch (status) {
      case 400:
        errorData.type = "BAD_REQUEST";
        break;
      case 401:
        errorData.type = "UNAUTHORIZED";
        break;
      case 403:
        errorData.type = "FORBIDDEN";
        break;
      case 404:
        errorData.type = "NOT_FOUND";
        break;
      case 409:
        errorData.type = "CONFLICT";
        break;
      case 500:
      case 502:
      case 503:
        errorData.type = "SERVER_ERROR";
        break;
      default:
        errorData.type = "API_ERROR";
    }
  } 
  // Handle network errors (no response received)
  else if (error.request) {
    errorData.type = "NETWORK_ERROR";
    errorData.message = "Network error: No response received from server";
  } 
  // Handle request setup errors
  else {
    errorData.type = "REQUEST_ERROR";
    errorData.message = error.message || "Error setting up the request";
  }

  // Log the error for debugging
  console.error(`[API Error][${errorData.type}]`, errorData.message);
  
  return errorData;
};

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Successfully received response
    return response;
  },
  (error) => {
    // Process error through our handler
    const formattedError = handleAxiosError(error);
    
    // Reject with our formatted error
    return Promise.reject(formattedError);
  }
);

export default axiosInstance;
