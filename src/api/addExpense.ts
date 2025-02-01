import { AllCategory } from "../api/allCategories";
import { Category } from "../api/allCategories";
import { Datepicker } from "flowbite";
import { fetchAllCategories } from "../api/allCategories";
// import "@fontsource/poppins";
import "../style.css";

// const putAllCategories = async () => {
//   try {
//     const allCategories = await fetchAllCategories();
//
//     if (allCategories) {
//       displayDropdownCategories("#category", allCategories);
//     } else {
//       const container = document.querySelector<HTMLSelectElement>("#category");
//       if (container) {
//         container.innerHTML = `<option selected>No category found</option>`;
//       }
//     }
//   } catch (error) {
//     console.error("Error loading categories", error);
//   }
//
//   // ✅ Initialize the Flowbite date picker properly
//   setTimeout(() => {
//     const datepickerEl = document.querySelector(
//       "#expense-datepicker-autohide",
//     ) as HTMLElement;
//     if (datepickerEl) {
//       new Datepicker(datepickerEl, {
//         autohide: true, // ✅ Ensures clicking outside closes it
//         format: "yyyy-mm-dd",
//         todayBtn: true,
//         clearBtn: true,
//       });
//       console.log("Datepicker initialized with auto-hide.");
//     } else {
//       console.error("Datepicker element not found.");
//     }
//   }, 500); // Delay to ensure DOM is updated
// };
//
// putAllCategories();
//
// export const displayDropdownCategories = async (
//   containerId: string,
//   allCategories: AllCategory[],
// ): Promise<void> => {
//   const selectElement = document.querySelector<HTMLDivElement>(
//     `${containerId}`,
//   );
//
//   if (!selectElement) {
//     console.error(`No container named ${containerId} found`);
//     return;
//   }
//
//   try {
//     // Add debug logging to see the exact structure
//     console.log("Received allCategories:", allCategories);
//
//     console.log("data" in allCategories);
//     // console.log(Array.isArray(allCategories.data));
//
//     // Clear the container
//     selectElement.innerHTML = "";
//
//     const defaultOption = document.createElement("option");
//     defaultOption.textContent = "Choose a source";
//     defaultOption.selected = true;
//     defaultOption.disabled = true;
//     selectElement.appendChild(defaultOption);
//     console.log("Created default option");
//
//     //
//     // Check if allCategories itself has the data property
//     if (
//       allCategories &&
//       "data" in allCategories &&
//       Array.isArray(allCategories.data)
//     ) {
//       // Add categories as options
//       console.log("Entered foreach loop");
//       allCategories.data.forEach((category: Category) => {
//         const option = document.createElement("option");
//         option.value = category.name;
//         option.textContent = category.name;
//         selectElement.appendChild(option);
//       });
//     } else {
//       console.error("Invalid categories data structure");
//     }
//   } catch (error) {
//     console.error("An error occurred while loading categories: ", error);
//     selectElement.innerHTML =
//       "<p>An error occurred while loading categories</p>";
//   }
// };
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
// putAllCategories();
