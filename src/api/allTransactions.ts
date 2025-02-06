interface Category {
  id: number;
  name: string;
}
export interface Data {
  id: number;
  transactions_type: string;
  amount: string;
  source: string;
  category: Category | null;
  reason: string;
  remarks: string;
  time: string;
}

export interface ErrorDetails {
  [field: string]: string[];
}

export interface AllTransactions {
  success: boolean;
  message: string;
  data: Data[] | null;
  errors: ErrorDetails | null;
}

export const fetchTransactionsData = async (): Promise<
  AllTransactions[] | undefined
> => {
  try {
    const response = await fetch("http://127.0.0.1:8000/all_transactions/", {
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

    const result: AllTransactions[] = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error fetching API data: ", error);
  }
};
