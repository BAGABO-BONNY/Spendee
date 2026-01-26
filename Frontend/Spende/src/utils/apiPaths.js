export const API_PATHS = {
  auth: {
    register: '/auth/register',
    login: '/auth/login',
    getUser: '/auth/getUser',
    uploadProfile: '/auth/upload-profile',
  },
  income: {
    add: '/income/add',
    getAll: '/income/all',
    delete: (id) => `/income/${id}`,
    download: '/income/download',
  },
  expense: {
    add: '/expense/add',
    getAll: '/expense/all',
    delete: (id) => `/expense/${id}`,
    download: '/expense/download',
  },
  dashboard: {
    data: '/dashboard/data',
  },
};
