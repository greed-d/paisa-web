localStorage.setItem(
  "accessToken",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzM3MzY3OTkyLCJleHAiOjE3Mzc0NTQzOTIsInR5cGUiOiJhY2Nlc3MifQ.JBuh2XDKTGOGbR790eLviAGQqVXS4RYEAUUVYW2e2rQ",
);

export interface Balance {
  current_balance: string;
  total_income: string;
  total_expense: string;
}

export const fetchCurrentBalance = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error(`No access token found, Please log in`);
    }
  } catch (error) {}
};
