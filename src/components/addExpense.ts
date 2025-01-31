import { AllCategory } from "../api/allCategories";
import { Category } from "../api/allCategories";

export const displayDropdownCategories = async (
  containerId: string,
  allCategories: AllCategory[],
): Promise<void> => {
  const selectElement = document.querySelector<HTMLDivElement>(
    `${containerId}`,
  );

  if (!selectElement) {
    console.error(`No container named ${containerId} found`);
    return;
  }

  try {
    // Add debug logging to see the exact structure
    console.log("Received allCategories:", allCategories);

    console.log("data" in allCategories);
    // console.log(Array.isArray(allCategories.data));

    // Clear the container
    selectElement.innerHTML = "";

    const defaultOption = document.createElement("option");
    defaultOption.textContent = "Choose a source";
    defaultOption.selected = true;
    defaultOption.disabled = true;
    selectElement.appendChild(defaultOption);
    console.log("Created default option");

    //
    // Check if allCategories itself has the data property
    if (
      allCategories &&
      "data" in allCategories &&
      Array.isArray(allCategories.data)
    ) {
      // Add categories as options
      console.log("Entered foreach loop");
      allCategories.data.forEach((category: Category) => {
        const option = document.createElement("option");
        option.value = category.name;
        option.textContent = category.name;
        selectElement.appendChild(option);
      });
    } else {
      console.error("Invalid categories data structure");
    }
  } catch (error) {
    console.error("An error occurred while loading categories: ", error);
    selectElement.innerHTML =
      "<p>An error occurred while loading categories</p>";
  }
};
