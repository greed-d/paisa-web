import { getAccessToken } from "../utils";

export interface Category {
  id: number;
  name: string;
}

export interface ErrorDetails {
  [field: string]: string[];
}

export interface AllCategory {
  success: boolean;
  message: string;
  data: Category[] | null;
  errors: ErrorDetails | null;
}

export const fetchAllCategories = async (): Promise<
  AllCategory[] | undefined
> => {
  try {
    const response = await fetch("http://127.0.0.1:8000/categories/", {
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
      throw new Error(`HTTP error occured!! Error : ${response.status}`);
    }
    const allCategory: AllCategory[] = await response.json();

    return allCategory;
  } catch (error) {
    console.error(`Error fetching API data : ${error}`);
  }
};
