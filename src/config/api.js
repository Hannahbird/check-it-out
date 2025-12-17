// API Configuration
// This will work in both local Docker and Epinio deployments

const getApiUrl = () => {
  // If REACT_APP_API_URL is explicitly set, use it
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }

  // Otherwise, use relative URLs (same origin as the React app)
  // This works when frontend and backend are served from the same domain
  return '';
};

export const API_URL = getApiUrl();

// Helper function for making API calls
export const getApiEndpoint = (path) => {
  const url = API_URL;
  const endpoint = path.startsWith('/') ? path : `/${path}`;
  return `${url}${endpoint}`;
};
