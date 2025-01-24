// localStorage.setItem(
//   "accessToken",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzM3MzY3OTkyLCJleHAiOjE3Mzc0NTQzOTIsInR5cGUiOiJhY2Nlc3MifQ.JBuh2XDKTGOGbR790eLviAGQqVXS4RYEAUUVYW2e2rQ",
// );

export interface AllIncomeApiResponse {
  id: number;
  amount: string;
  source: string;
  reason: string;
  remarks: string;
  time: string;
}

export interface AllIncomeApiData {
  data: AllIncomeApiResponse[];
}

export const fetchIncomeData = async (): Promise<
  AllIncomeApiResponse[] | undefined
> => {
  try {
    // const token = localStorage.getItem("accessToken");
    // if (!token) {
    //   throw new Error("No access token found, please login");
    // }

    const response = await fetch("http://localhost:8000/income", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: AllIncomeApiData = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching API data: ", error);
  }
};
