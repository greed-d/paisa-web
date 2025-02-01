export const setAccessToken = (access_token: string) => {
  localStorage.setItem("access_token", access_token);
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem("access_token");
};

export const clearAccessToken = () => {
  localStorage.removeItem("access_token");
};

export const refreshAccessToken = async () => {
  const response = await fetch("http://127.0.0.1:8000/refresh/", {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key: "value" }),
  });
};
