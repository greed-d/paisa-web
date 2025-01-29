import { fetchAllCategories } from "../api/allCategories";
import { displayAllCategories } from "../components/allCategories";
import "@fontsource/poppins";
import "../style.css";

const getAllCategories = async () => {
  try {
    const allCategories = await fetchAllCategories();

    if (allCategories) {
      displayAllCategories("#all-categories", allCategories);
    } else {
      const container =
        document.querySelector<HTMLDivElement>("#all-categories");
      if (container) {
        container.innerHTML = "<p>No categories found</p>";
      }
    }
  } catch (error) {
    console.error("Error loading app", error);
    const container = document.querySelector<HTMLDivElement>("#all-categories");
    if (container) {
      container.innerHTML = "<p>Error loading categories</p>";
    }
  }
};

getAllCategories();
