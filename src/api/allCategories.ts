import { getAccessToken } from "../utils";

localStorage.setItem(
  "access_token",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6ImdyZWVkIiwiaWF0IjoxNzM3OTUxNTE5LCJleHAiOjE3MzgwMzc5MTksInR5cGUiOiJhY2Nlc3MifQ.6Q2sBz7jpQgGCQj4t4mMu8k17yrwG5yBKWfT3lCgNDU",
);

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
  const token = getAccessToken;
  try {
    const response = await fetch("http://127.0.0.1:8000/categories/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      // credentials: "include",
    });
    console.log("Response status : ", response.status);
    console.log("Response headers : ", response.headers);
    console.log("cookies after request : ", document.cookie);

    if (!response.ok) {
      throw new Error(`HTTP error occured!! Error : ${response.status}`);
    }
    const allCategory: AllCategory[] = await response.json();
    console.log(allCategory.data[0]);

    return allCategory;
  } catch (error) {
    console.error(`Error fetching API data : ${error}`);
  }
};
