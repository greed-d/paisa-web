import { AllCategory } from "../api/allCategories";
import { Category } from "../api/allCategories";
import { setAccessToken } from "../utils.ts";

export const displayAllCategories = async (
  containerId: string,
  allCategories: AllCategory[],
): Promise<void> => {
  const container = document.querySelector<HTMLDivElement>(`${containerId}`);

  if (!container) {
    console.error(`No container named ${containerId} found`);
    return;
  }

  try {
    // Add debug logging to see the exact structure
    console.log("Received allCategories:", allCategories);

    // Clear the container
    container.innerHTML = "";

    // Check if allCategories itself has the data property
    if (
      allCategories &&
      "data" in allCategories &&
      Array.isArray(allCategories.data)
    ) {
      // Directly use the data array
      allCategories.data.forEach((category: Category) => {
        const allCategoriesDiv = document.createElement("div");
        allCategoriesDiv.className = "categories";
        allCategoriesDiv.innerHTML = `
          <p><strong>ID : </strong>${category.id}</p>
          <p><strong>Name : </strong>${category.name}</p>
          <br>
          <hr>
          <br>`;
        container.appendChild(allCategoriesDiv);
      });
    } else {
      container.innerHTML = "<p>No categories data available</p>";
    }
  } catch (error) {
    console.error("An error occurred while loading categories: ", error);
    container.innerHTML = "<p>An error occurred while loading categories</p>";
  }
};

export const fetchAllCategories = async (): Promise<AllCategory> => {
  // Changed return type
  const token = setAccessToken();
  try {
    const response = await fetch("http://127.0.0.1:8000/categories/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error occurred! Error: ${response.status}`);
    }

    const allCategory: AllCategory = await response.json(); // Changed type
    return allCategory;
  } catch (error) {
    console.error(`Error fetching API data: ${error}`);
    return {
      success: false,
      message: "Failed to fetch categories",
      data: null,
      errors: null,
    };
  }
};
