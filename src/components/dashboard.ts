import { BalanceInfo } from "../api/dashboard.ts";
import { Balance } from "@/api/dashboard";

export const displayCurrentBalanceInfo = async (
  containerId: string,
  AllBalance: BalanceInfo,
) => {
  const container = document.querySelector<HTMLDivElement>(`${containerId}`);
  if (!container) {
    console.error(`No container with id ${containerId}`);
    return;
  }
  try {
    if (Object.keys(AllBalance).length === 0) {
      container.innerHTML = "<p>No balance info</p>";
    }
    if ("data" in AllBalance) {
      const currentBalance = AllBalance.data;

      if (currentBalance) {
        container.innerHTML = "";
        const currentBalanceDiv = document.createElement("div");
        currentBalanceDiv.className = "current-balance";
        currentBalanceDiv.innerHTML = `
        <div class="text-xl">Total Balance</div>
        <div class="text-4xl font-semibold">${currentBalance.current_balance}</div>
       `;
        console.log(currentBalance.current_balance);
        container?.appendChild(currentBalanceDiv);
      }
    }
  } catch (error) {
    console.error("Error displaying income data", error);
    container.innerHTML = "<p>Failed to load income data</p>";
  }
};

export const displayTotalExpense = async (
  containerId: string,
  AllBalance: BalanceInfo,
) => {
  const container = document.querySelector<HTMLDivElement>(`${containerId}`);
  if (!container) {
    console.error(`No container with id ${containerId}`);
    return;
  }
  try {
    if (Object.keys(AllBalance).length === 0) {
      container.innerHTML = "<p>No balance info</p>";
    }
    if ("data" in AllBalance) {
      const totalExpense = AllBalance.data;

      if (totalExpense) {
        container.innerHTML = "";
        const currentBalanceDiv = document.createElement("div");
        currentBalanceDiv.className = "current-balance";
        currentBalanceDiv.innerHTML = `
        <div class="text-xl">Total Expense</div>
        <div class="text-4xl font-semibold">${totalExpense.total_expense}</div>
       `;
        console.log(totalExpense.total_expense);
        container?.appendChild(currentBalanceDiv);
      }
    }
  } catch (error) {
    console.error("Error displaying income data", error);
    container.innerHTML = "<p>Failed to load income data</p>";
  }
};

export const displayTotalIncome = async (
  containerId: string,
  AllBalance: BalanceInfo,
) => {
  const container = document.querySelector<HTMLDivElement>(`${containerId}`);
  if (!container) {
    console.error(`No container with id ${containerId}`);
    return;
  }
  try {
    if (Object.keys(AllBalance).length === 0) {
      container.innerHTML = "<p>No balance info</p>";
    }
    console.log(Object.keys(AllBalance).length);
    console.log("data" in AllBalance);
    // console.log(Array.isArray(AllBalance));
    if ("data" in AllBalance) {
      const totalIncome = AllBalance.data;

      if (totalIncome) {
        container.innerHTML = "";
        const currentBalanceDiv = document.createElement("div");
        currentBalanceDiv.className = "current-balance";
        currentBalanceDiv.innerHTML = `
        <div class="text-xl">Total Income</div>
        <div class="text-4xl font-semibold">${totalIncome.total_income}</div>
       `;
        container?.appendChild(currentBalanceDiv);
      }
    }
  } catch (error) {
    console.error("Error displaying income data", error);
    container.innerHTML = "<p>Failed to load income data</p>";
  }
};
