import "./style.css";

localStorage.setItem(
  "accessToken",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzM3MzY3OTkyLCJleHAiOjE3Mzc0NTQzOTIsInR5cGUiOiJhY2Nlc3MifQ.JBuh2XDKTGOGbR790eLviAGQqVXS4RYEAUUVYW2e2rQ",
);

interface ApiResponse {
  id: number;
  amount: string;
  source: string;
  reason: string;
  remarks: string;
  time: string;
}

interface ApiData {
  data: ApiResponse[];
}

async function fetchIncomeData(): Promise<ApiResponse[] | undefined> {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("No access token found, please login");
    }
    const response = await fetch("http://localhost:8000/income", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiData[] = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching API data: ", error);
  }
}

// async function displayIncomeData() {
//   const incomeData = await fetchIncomeData();
//
//   if (incomeData) {
//     console.log("Fetch data: ", incomeData.data[0]);
//   } else {
//     console.log("Failed to fetch income data.");
//   }
// }

async function displayIncomeData() {
  const container = document.querySelector<HTMLDivElement>("#all-income");

  if (!container) {
    console.error("No element with ID 'all-income' found.");
    return;
  }

  try {
    const incomeData = await fetchIncomeData();

    if (incomeData && incomeData.length > 0) {
      container.innerHTML = "";

      incomeData.forEach((income) => {
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
displayIncomeData();
