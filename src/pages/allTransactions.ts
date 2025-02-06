import { fetchTransactionsData } from "../api/allTransactions";
import { displayTransactionsData } from "../components/allTransactions";
import "../style.css";

let getAllTransactions = async () => {
  try {
    const allTransactionsData = await fetchTransactionsData();

    if (allTransactionsData) {
      displayTransactionsData("#all-transactions", allTransactionsData);
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

getAllTransactions();
