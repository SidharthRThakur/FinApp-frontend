import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../util";
import { ToastContainer } from "react-toastify";
import ExpensesTable from "./ExpensesTable";
import ExpenseTrackerForm from "./ExpenseTrackerForm";
import ExpenseDetails from "./ExpenseDetails";
import Footer from "../components/Footer";
function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [expenses, setExpenses] = useState([]); // it will be an array
  const [expenseAmount, setExpenseAmount] = useState([]); // it will be an array
  const [incomeAmount, setIncomeAmount] = useState([]); // it will be an array
  //loggedInUser this information willl be recieevd frfom localstorgae
  // jab b component first time load ho then we will use useEffect
  // and take the key loggedinUser from application tab
  const navigate = useNavigate();
  // to get the user from thelocal storage on first render
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);
  useEffect(() => {
    const amounts = expenses.map((item) => item.amount);
    console.log(amounts);
    const income = amounts
      .filter((item) => item > 0)
      .reduce((acc, item) => (acc += item), 0);
    console.log("Credit:", income);
    const debited =
      amounts
        .filter((item) => item < 0)
        .reduce((acc, item) => (acc += item), 0) * -1;
    // -1 use to show the debited value in postive
    console.log("Debit:", debited);
    setIncomeAmount(income);
    setExpenseAmount(debited);
  }, [expenses]);
  //LOG OUT LOGIC  handlelogout will remove the  token and the loggedInUser from the localStorage - application tab
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    // handleSuccess("User Loggedout ");
    handleSuccess(`${loggedInUser} Log out`);
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  //Fetch Expense from backend -to show the products by calling an API
  const fetchExpenses = async () => {
    try {
      const url = "http://localhost:8080/expenses";

      // const url = `${APIurl}/expenses`;
      const headers = {
        headers: { Authorization: localStorage.getItem("token") }, // data as per the postman
      };
      const response = await fetch(url, headers); // url beacuse it a get API
      if (response.status === 403) {
        navigate("/login");
        return;
      }
      const result = await response.json(); // iska ab json lena hai
      console.log("Fetched Expenses", result);
      setExpenses(result.data || []); // server shwoing an error of Expense.map()is not a function
      // // fallback if result.data  "[]"is undefined
      //  Kabhi kabhi backend response kuch aisa hota hai:
      // {   "data": [ ...expenses array... ]}
    } catch (err) {
      handleError(err);
    }
  };

  //ADD EXPENSE AND UPDATE STATE
  const addExpenses = async (data) => {
    try {
      // const url = `${APIurl}/expense`;
      //  this will send data to server
      const url = "http://localhost:8080/expenses";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        }, // data as per the postman and also to send content type to know whihc type of data is passing through client to server and server to client
        body: JSON.stringify(data), //here we will pass baody
      }); // url beacuse it a get API
      if (response.status === 403) {
        navigate("/login");
        return;
      }
      const result = await response.json(); // iska ab json lena hai
      console.log(result.data);
      setExpenses(result.data); // server shwoing an error of Expense.map()is not a function
      //  Kabhi kabhi backend response kuch aisa hota hai:
      // {   "data": [ ...expenses array... ]}
      handleSuccess(result.message);
    } catch (err) {
      handleError(err);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // Fetch expenses only once on page load
  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDeleteExpense = async (expenseId) => {
    try {
      const url = `http://localhost:8080/expenses/${expenseId}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      if (response.status === 403) {
        navigate("/login");
        return;
      }
      const result = await response.json(); // iska ab json lena hai
      console.log(result.data);
      setExpenses(result.data);
      handleSuccess(result.message);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <>
      <div className="user-section">
        <h1>Welcome! {loggedInUser}</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div>
        <ExpenseDetails
          incomeAmount={incomeAmount}
          expenseAmount={expenseAmount}
        />
        <ExpenseTrackerForm addExpenses={addExpenses} />
        <ExpensesTable
          expenses={expenses}
          handleDeleteExpense={handleDeleteExpense}
        />
        <ToastContainer />
        <Footer />
      </div>
    </>
  );
}
export default Home;
//      <ExpenseTrackerForm addExpenses={addExpenses}/>  here we will pass addExpense as porp
