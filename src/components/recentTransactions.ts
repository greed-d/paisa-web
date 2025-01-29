import {
  RecentTransactions,
  RecentTransactionsInfo,
} from "../api/recentTransactions";

export const displayRecentTransactions = async (
  containerId: string,
  recentTransactions: RecentTransactionsInfo,
): Promise<void> => {
  const container = document.querySelector(`${containerId}`);

  if (!container) {
    console.error(`No element with id ${containerId} found`);
    return;
  }

  try {
    if (
      recentTransactions &&
      "data" in recentTransactions &&
      Array.isArray(recentTransactions.data)
    ) {
      container.innerHTML = "";

      recentTransactions.data.forEach((recentTransaction) => {
        const newTransactionsRow = document.createElement("tr");
        newTransactionsRow.className = "bg-gray-100";
        newTransactionsRow.innerHTML = `
          <td
            class="py-4 px-6 border-b border-gray-200"
          >
            ${recentTransaction.reason}
          </td>
          <td
            class="py-4 px-6 border-b border-gray-200 truncate"
          >
            ${recentTransaction.source}
          </td>
          <td
            class="py-4 px-6 border-b border-gray-200"
          >
            ${recentTransaction.amount}
          </td>
          <td
            class="py-4 px-6 border-b border-gray-200"
          >
            ${new Date(recentTransaction.time).toLocaleString()}
          </td>

          <td
            class="py-4 px-6 border-b border-gray-200"
          >
            ${
              recentTransaction.transaction_type === "Income"
                ? `<span class="bg-green-500 text-white py-1 px-3 rounded-full">Income</span>`
                : `<span class="bg-red-500 text-white py-1 px-3 rounded-full">Expense</span>`
            }
          </td>

`;
        container.appendChild(newTransactionsRow);
      });
    }
  } catch (error) {
    throw new Error(
      `An error occured while getting recent transactions ${error}`,
    );
  }
};
