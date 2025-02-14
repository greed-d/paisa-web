import { defineConfig } from "vite";

export default defineConfig({
  server: {
    open: "/index.html",
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        registration: "./public/register.html",
        login: "./public/login.html",
        main: "./public/index.html",
        allCategory: "./public/all_category.html",
        allIncome: "./public/all_income.html",
        allExpense: "./public/all_expense.html",
        allTransactions: "./public/all_transactions.html",
        addIncome: "./public/income_form.html",
        amountForm: "./public/amount_form.html",
        loader: "./public/loader.html",
        sliderButton: "./public/sliderbutton.html",
      },
    },
  },
});
