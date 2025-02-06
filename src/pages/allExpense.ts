import { fetchExpenseData } from "../api/allExpense";
import { displayExpenseData } from "../components/allExpense";
import "../style.css";

let getAllIncome = async () => {
  try {
    const expenseData = await fetchExpenseData();

    if (expenseData) {
      displayExpenseData("#all-expense", expenseData);
    } else {
      const container = document.querySelector<HTMLDivElement>("#all-expense");
      if (container) {
        container.innerHTML = "<p>No income data available</p>";
      }
    }
  } catch (error) {
    console.error("Error initializing app :", error);
    const container = document.querySelector<HTMLDivElement>("#all-expense");
    if (container) {
      container.innerHTML = "<p>Failed to load income data</p>";
    }
  }
};

getAllIncome();
