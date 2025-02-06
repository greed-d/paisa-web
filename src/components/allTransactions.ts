import { AllTransactions } from "../api/allTransactions";

export const displayTransactionsData = async (
  containerId: string,
  transactionsData: AllTransactions[],
): Promise<void> => {
  const container = document.querySelector<HTMLDivElement>(`${containerId}`);

  if (!container) {
    console.error(`No element with ID '${containerId}' found.`);
    return;
  }

  console.log(transactionsData);

  try {
    if (
      transactionsData &&
      "data" in transactionsData &&
      Array.isArray(transactionsData.data)
    ) {
      console.log(transactionsData);
      container.innerHTML = "";
      console.log(transactionsData);

      transactionsData.data.forEach((transaction) => {
        const allExpenseRow = document.createElement("tr");
        allExpenseRow.className = "bg-gray-100";
        allExpenseRow.innerHTML = `
          <td
            class="py-4 px-6 border-b border-gray-200"
          >
            ${transaction.reason}
          </td>
          <td
            class="py-4 px-6 border-b border-gray-200"
          >
            ${
              transaction.transaction_type === "Income"
                ? `<span class="bg-green-500 text-white py-1 px-3 rounded-full">Income</span>`
                : `<span class="bg-red-500 text-white py-1 px-3 rounded-full">Expense</span>`
            }
          </td>
          <td
            class="py-4 px-6 border-b border-gray-200 truncate"
          >
            ${transaction.source}
          </td>
          <td
            class="py-4 px-6 border-b border-gray-200"
          >
            ${transaction.amount}
          </td>
          <td
            class="py-4 px-6 border-b border-gray-200"
          >
            ${transaction.category?.name ?? "No category"}
          </td>
          <td
            class="py-4 px-6 border-b border-gray-200"
          >
            ${new Date(transaction.time).toLocaleString()}
          </td>

          <td
            class="py-4 px-6 border-b border-gray-200"
          >
            ${transaction.remarks}
          </td>

`;
        container.appendChild(allExpenseRow);
      });
    }
  } catch (error) {
    throw new Error(
      `An error occured while getting recent transactions ${error}`,
    );
  }
};
