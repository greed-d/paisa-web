export const setAccessToken = () => {
  localStorage.setItem(
    "access_token",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzM4MDQwMDI3LCJleHAiOjE3MzgxMjY0MjcsInR5cGUiOiJhY2Nlc3MifQ.5i4F6t1a7hSqWoyfx5E66DaCCGkUxBFW7dpt1unVL00",
  );
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem("access_token");
};

export const clearAccessToken = () => {
  localStorage.removeItem("access_token");
};
