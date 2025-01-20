import { AllIncomeApiResponse } from "../api/allIncome";

export async function displayIncomeData(
  containerId: string,
  incomeData: AllIncomeApiResponse[],
) {
  const container = document.querySelector<HTMLDivElement>("#all-income");

  if (!container) {
    console.error(`No element with ID '${containerId}' found.`);
    return;
  }

  try {
    if (incomeData && incomeData.length > 0) {
      container.innerHTML = "";

      incomeData.forEach((income: AllIncomeApiResponse) => {
        const incomeDiv = document.createElement("div");
        incomeDiv.className = "income-item";
        incomeDiv.innerHTML = `
          <p><strong>ID:</strong> ${income.id}</p>
          <p><strong>Amount:</strong> ${income.amount}</p>
          <p><strong>Source:</strong> ${income.source}</p>
          <p><strong>Reason:</strong> ${income.reason}</p>
          <p><strong>Remarks:</strong> ${income.remarks}</p>
          <p><strong>Time:</strong> ${new Date(income.time).toLocaleString()}</p>
          <br>
          <hr>
          <br>`;
        container.appendChild(incomeDiv);
      });
    } else {
      container.innerHTML = "<p>No income data available</p>";
    }
  } catch (error) {
    console.error("Error displaying income data", error);
    container.innerHTML = "<p>Failed to load income data</p>";
  }
}
