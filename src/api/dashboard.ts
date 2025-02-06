import { getAccessToken, setAccessToken } from "../utils.ts";

export interface Balance {
  current_balance: number;
  total_income: number;
  total_expense: number;
}

export interface ErrorDetails {
  [field: string]: string[];
}

export interface BalanceInfo {
  success: boolean;
  message: string;
  data: Balance | null;
  errors: ErrorDetails | null;
}

export const fetchCurrentBalance = async (): Promise<
  BalanceInfo | undefined
> => {
  try {
    const response = await fetch("http://127.0.0.1:8000/current_balance/", {
      method: "GET",
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    console.log(response.status);
    const balanceInfo: BalanceInfo = await response.json();
    return balanceInfo;
  } catch (error) {}
};
