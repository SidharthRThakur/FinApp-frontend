import React from "react";

function ExpenseDetails({ incomeAmount, expenseAmount }) {
  console.log({ incomeAmount, expenseAmount });
  return (
    <div>
      <div className="balance">
        Your Balance is : {incomeAmount - expenseAmount}
      </div>
      <div className="amounts-container">
        Credit -:
        <span className="income-amount">{incomeAmount}</span>
        Debit -:
        <span className="expense-amount">{expenseAmount}</span>
      </div>
    </div>
  );
}

export default ExpenseDetails;
