import React, { useState } from "react";
import { handleError } from "../util";
function ExpenseTrackerForm({ addExpenses }) {
  // we have added the addExpense prop to this funciton
  const [expenseInfo, setExpenseInfo] = useState({ text: "", amount: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyExpenseInfo = { ...expenseInfo };
    copyExpenseInfo[name] = value;
    setExpenseInfo(copyExpenseInfo);
  };
  const handleExpense = (e) => {
    e.preventDefault();
    console.log(expenseInfo); // now i will hit this object in the server side using API , I will call API at his parent component
    // the main state of Expenses is tracking only there home.js

    const { text, amount } = expenseInfo; // chekc validaiton of info
    if (!text || !amount) {
      handleError("All fields are required "); // it will a validation check
      return;
    }
    setTimeout(() => {
      setExpenseInfo({ text: "", amount: "" });
    }, 1000);

    addExpenses(expenseInfo); // here we have called theaddExpense fucntion using expenseInfo
  };
  return (
    <div className="container">
      <h1>Expense Tracker </h1>
      <form onSubmit={handleExpense}>
        <div>
          <label htmlFor="expense">Expense Description:</label>
          <input
            onChange={handleChange}
            type="text"
            name="text"
            placeholder="Enter your expense decription"
            value={expenseInfo.text}
          />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            onChange={handleChange}
            type="number"
            name="amount"
            placeholder="Enter your exppense amount (expense(-ive) income(+ive)"
            value={expenseInfo.amount}
          />
        </div>
        <button type="submit">Add Expense </button>
      </form>

      {/* Added the toast notifications here */}
    </div>
  );
}

export default ExpenseTrackerForm;
