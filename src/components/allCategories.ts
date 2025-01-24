import { AllCategory } from "../api/allCategories";

export const displayAllCategories = async (
  containerId: string,
  allCategories: AllCategory[],
): Promise<void> => {
  const container = document.querySelector<HTMLDivElement>("#all-categories");

  if (!container) {
    console.error(`No container named ${containerId} found`);
    return;
  }
  try {
    if (allCategories && allCategories.length > 0) {
      container.innerHTML = "";

      allCategories.forEach((category: AllCategory) => {
        const allCategorisDiv = document.createElement("div");
        allCategorisDiv.className = "categories";
        allCategorisDiv.innerHTML = `
        <p><strong>ID : </strong>${category.id}</p>
        <p><strong>Name : </strong>${category.name}</p>
        <br>
        <hr>
        <br>`;
        container.appendChild(allCategorisDiv);
      });
    } else {
      container.innerHTML = "<p>No categories data available</p>";
    }
  } catch (error) {
    console.error("An error occured while loading categories : ", error);
    container.innerHTML = "<p>An error occured while loading categories</p>";
  }
};
