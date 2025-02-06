import { fetchIncomeData } from "@/api/allIncome.ts";
import { fetchCurrentBalance } from "../api/dashboard.ts";
import {
  displayCurrentBalanceInfo,
  displayTotalExpense,
  displayTotalIncome,
} from "../components/dashboard.ts";
import "../style.css";
import { fetchRecentTransactions } from "../api/recentTransactions.ts";
import { displayRecentTransactions } from "../components/recentTransactions.ts";
import { loginState } from "./login-state.ts";
const getCurrentBalance = async () => {
  try {
    const currentBalance = await fetchCurrentBalance();
    if (currentBalance) {
      displayCurrentBalanceInfo("#current_amount", currentBalance);
      displayTotalExpense("#total_expense", currentBalance);
      displayTotalIncome("#total_income", currentBalance);
    } else {
      const balance_container = document.querySelector("#current_amount");
      const expense_container = document.querySelector("#total_expense");
      if (balance_container && expense_container) {
        balance_container.innerHTML = `
          <div class="text-4xl font-semibold">No Data</div>`;
      }
    }
  } catch (error) {
    console.error("Error initializing app :", error);
    const container = document.querySelector<HTMLDivElement>("#current_amount");
    if (container) {
      container.innerHTML = "<p>Failed to load income data</p>";
    }
  }
};

const getRecentTransactions = async () => {
  try {
    const recentTransactionView = await fetchRecentTransactions();
    if (recentTransactionView) {
      displayRecentTransactions(
        "#transaction-show-table",
        recentTransactionView,
      );
    }
  } catch (error) {
    console.error("Error getting transactions from data", error);
    const container = document.querySelector("#transacions-show-table");
    if (container) {
      container.innerHTML = "<p>Failed to load income transactions</p>";
    }
  }
};

const showGreeting = async () => {
  try {
    const userName = loginState.user?.username;
    console.log(loginState.user);
    let greetingContainer = document.querySelector("#greeting");
    if (!greetingContainer) {
      console.log(`No container named ${greetingContainer}`);
      return;
    }
    greetingContainer.innerHTML = `<p>Hello ${userName}</p>`;
  } catch (error) {}
};

getRecentTransactions();
getCurrentBalance();
showGreeting();
