// Define an interface for IncomeData
interface ExpenseData {
  amount: number;
  source: string;
  category: string;
  time: string;
  reason: string;
  remarks: string;
}

document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");

  if (expenseForm) {
    expenseForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent form submission

      // Get form values
      const amount = parseFloat(
        (document.getElementById("expense-amount") as HTMLInputElement).value,
      );
      const source = (
        document.getElementById("expense-source") as HTMLSelectElement
      ).value;
      const category = (
        document.getElementById("category") as HTMLSelectElement
      ).value;
      const date = (
        document.getElementById(
          "expense-datepicker-autohide",
        ) as HTMLInputElement
      ).value;
      const time = (document.getElementById("expense-time") as HTMLInputElement)
        .value;
      const reason = (
        document.getElementById("expense-reason") as HTMLInputElement
      ).value;
      const remarks = (
        document.getElementById("expense-remarks") as HTMLInputElement
      ).value;

      // Convert date and time into "YYYY-MM-DDTHH:MM:SSZ" format
      const formattedDateTime = formatDateTime(date, time);

      // Create data object using the interface
      const expenseData: ExpenseData = {
        amount,
        source,
        category,
        time: formattedDateTime,
        reason,
        remarks,
      };

      console.log("Income Data:", expenseData);

      await sendExpenseData(expenseData);
    });
  }
});

// Function to format date and time to "YYYY-MM-DDTHH:MM:SSZ"
function formatDateTime(date: string, time: string): string {
  if (!date || !time) return "";

  const formattedDate = date.replace(/\//g, "-"); // Ensure date is "YYYY-MM-DD"
  return `${formattedDate}T${time}:00Z`;
}

export const sendExpenseData = async (data: ExpenseData) => {
  try {
    // const token = getAccessToken();
    console.log(data);
    const response = await fetch("http://127.0.0.1:8000/expense/", {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    console.log(`Raw response ${response.text}`);

    const result = await response.json();
    console.log("Server Response:", result);

    // Show success message or clear the form
    alert("Expense submitted successfully!");
  } catch (error) {
    console.error("Error sending data:", error);
    alert("Failed to submit income. Please try again.");
  }
};
