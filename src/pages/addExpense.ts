import { displayDropdownCategories } from "../components/addExpense";
import { fetchAllCategories } from "../api/allCategories";
import { sendExpenseData } from "../api/addExpense";
// import "@fontsource/poppins";
import "../style.css";

const putAllCategories = async () => {
  try {
    const allCategories = await fetchAllCategories();

    if (allCategories) {
      displayDropdownCategories("#category", allCategories);
    } else {
      const container = document.querySelector<HTMLDivElement>("#category");
      if (container) {
        const selectElement = document.createElement("select");

        const defaultOption = document.createElement("option");
        defaultOption.textContent = "No category found";
        defaultOption.selected = true;
        selectElement.appendChild(defaultOption);
      }
    }
  } catch (error) {
    console.error("Error loading app", error);
    const container = document.querySelector<HTMLDivElement>("#category");
    if (container) {
      container.innerHTML = "<p>Error loading categories</p>";
    }
  }
};

putAllCategories();
