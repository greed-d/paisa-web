// Define an interface for IncomeData
interface IncomeData {
  amount: number;
  source: string;
  time: string;
  reason: string;
  remarks: string;
}

document.addEventListener("DOMContentLoaded", () => {
  const incomeForm = document.getElementById("income-input-form");

  if (incomeForm) {
    incomeForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent form submission

      // Get form values
      const amount = parseFloat(
        (document.getElementById("income-amount") as HTMLInputElement).value,
      );
      const source = (
        document.getElementById("income-source") as HTMLSelectElement
      ).value;
      const date = (
        document.getElementById(
          "income-datepicker-autohide",
        ) as HTMLInputElement
      ).value;
      const time = (document.getElementById("income-time") as HTMLInputElement)
        .value;
      const reason = (
        document.getElementById("income-reason") as HTMLInputElement
      ).value;
      const remarks = (
        document.getElementById("income-remarks") as HTMLInputElement
      ).value;

      // Convert date and time into "YYYY-MM-DDTHH:MM:SSZ" format
      const formattedDateTime = formatDateTime(date, time);

      // Create data object using the interface
      const incomeData: IncomeData = {
        amount,
        source,
        time: formattedDateTime,
        reason,
        remarks,
      };

      console.log("Income Data:", incomeData);

      await sendIncomeData(incomeData);
    });
  }
});

// Function to format date and time to "YYYY-MM-DDTHH:MM:SSZ"
function formatDateTime(date: string, time: string): string {
  if (!date || !time) return "";

  const formattedDate = date.replace(/\//g, "-"); // Ensure date is "YYYY-MM-DD"
  return `${formattedDate}T${time}:00Z`;
}

const sendIncomeData = async (data: IncomeData) => {
  try {
    // const token = getAccessToken();
    console.log(data);
    const response = await fetch("http://127.0.0.1:8000/income/", {
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
    alert("Income submitted successfully!");
  } catch (error) {
    console.error("Error sending data:", error);
    alert("Failed to submit income. Please try again.");
  }
};
