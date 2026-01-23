const BASE_URL = 'http://localhost:5000/api/v1';

export const API_PATHS = {
  auth: {
    register: `${BASE_URL}/auth/register`,
    login: `${BASE_URL}/auth/login`,
    getUser: `${BASE_URL}/auth/getUser`,
    uploadProfile: `${BASE_URL}/auth/upload-profile`,
  },
  income: {
    add: `${BASE_URL}/income/add`,
    getAll: `${BASE_URL}/income/all`,
    delete: (id) => `${BASE_URL}/income/${id}`,
    download: `${BASE_URL}/income/download`,
  },
  expense: {
    add: `${BASE_URL}/expense/add`,
    getAll: `${BASE_URL}/expense/all`,
    delete: (id) => `${BASE_URL}/expense/${id}`,
    download: `${BASE_URL}/expense/download`,
  },
  dashboard: {
    data: `${BASE_URL}/dashboard/data`,
  },
};
