import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useState } from "react";
import RefreshHandler from "./RefreshHandler";

function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false); // jab user loggin hon jata hai ,
  // if there is JWT token in the local storage then  we will code to make this case will be true

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />; // if authenticated then return to the user set state
  };
  return (
    <div className="App">
      <RefreshHandler setisAuthenticated={setisAuthenticated} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Home" element={<PrivateRoute element={<Home />} />} />
        {/* <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        {/* Add more routes as needed */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
