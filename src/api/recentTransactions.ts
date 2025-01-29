import { getAccessToken } from "../utils";

export interface RecentTransactions {
  amount: number;
  source: string;
  reason: string;
  remarks: string;
  time: string;
  transaction_type: string;
}

export interface ErrorDetails {
  [field: string]: string[];
}

export interface RecentTransactionsInfo {
  success: boolean;
  message: string;
  data: RecentTransactions[] | null;
  error: ErrorDetails | ErrorDetails[] | null;
}

export const fetchRecentTransactions = async (): Promise<
  RecentTransactionsInfo | undefined
> => {
  try {
    const token = getAccessToken();
    if (!token) {
      throw new Error("No token provided");
    }

    const response = await fetch("http://127.0.0.1:8000/recent_transactions/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result: RecentTransactionsInfo = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching API data: ", error);
  }
};
