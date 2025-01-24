import { fetchIncomeData } from "../api/allIncome";
import { displayIncomeData } from "../components/allIncome";
import "../style.css";

let getAllIncome = async () => {
  try {
    const incomeData = await fetchIncomeData();

    if (incomeData) {
      displayIncomeData("#all-income", incomeData);
    } else {
      const container = document.querySelector<HTMLDivElement>("#all-income");
      if (container) {
        container.innerHTML = "<p>No income data available</p>";
      }
    }
  } catch (error) {
    console.error("Error initializing app :", error);
    const container = document.querySelector<HTMLDivElement>("#all-income");
    if (container) {
      container.innerHTML = "<p>Failed to load income data</p>";
    }
  }
};

getAllIncome();
