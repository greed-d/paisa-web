import { AllExpense } from "../api/allExpense.ts";

export const displayExpenseData = async (
  containerId: string,
  expenseData: AllExpense[],
): Promise<void> => {
  const container = document.querySelector<HTMLDivElement>(`${containerId}`);

  if (!container) {
    console.error(`No element with ID '${containerId}' found.`);
    return;
  }

  try {
    if (
      expenseData &&
      "data" in expenseData &&
      Array.isArray(expenseData.data)
    ) {
      container.innerHTML = "";
      console.log(expenseData);

      expenseData.data.forEach((expense) => {
        const allExpenseRow = document.createElement("tr");
        allExpenseRow.className = "bg-gray-100";
        allExpenseRow.innerHTML = `
          <td
            class="py-4 px-6 border-b border-gray-200"
          >
            ${expense.reason}
          </td>
          <td
            class="py-4 px-6 border-b border-gray-200 truncate"
          >
            ${expense.source}
          </td>
          <td
            class="py-4 px-6 border-b border-gray-200"
          >
            ${expense.amount}
          </td>
          <td
            class="py-4 px-6 border-b border-gray-200"
          >
            ${expense.category.name}
          </td>
          <td
            class="py-4 px-6 border-b border-gray-200"
          >
            ${new Date(expense.time).toLocaleString()}
          </td>

          <td
            class="py-4 px-6 border-b border-gray-200"
          >
            ${expense.remarks}
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
