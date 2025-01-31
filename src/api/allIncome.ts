import { getAccessToken } from "../utils";

export interface Income {
  id: number;
  amount: string;
  source: string;
  reason: string;
  remarks: string;
  time: string;
}

export interface ErrorDetails {
  [field: string]: string[];
}

export interface AllIncome {
  success: boolean;
  message: string;
  data: Income[] | null;
  errors: ErrorDetails | null;
}

export const fetchIncomeData = async (): Promise<AllIncome[] | undefined> => {
  try {
    // const token = getAccessToken();
    // if (!token) {
    //   throw new Error("No access token found, please login");
    // }

    const response = await fetch("http://127.0.0.1:8000/income", {
      method: "GET",
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    console.log("Response status : ", response.status);
    console.log("Response headers : ", response.headers);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: AllIncome[] = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching API data: ", error);
  }
};
