import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RefreshHandler({ setisAuthenticated }) {
  // required location
  const location = useLocation();
  const navigate = useNavigate();
  // now useEffect hook k ander decision leneg ki humne isi kaha per redirect karna hai
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setisAuthenticated(true);
      if (
        location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname === "/signup"
      ) {
        navigate("/Home", { replace: false });
        // You can add your redirect logic here, e.g. navigate('/dashboard');
      }
    }
  }, [location, navigate, setisAuthenticated]);
  //[] this dependecies will be on ,location, navigate, setisAuthenticated

  return null;
}

export default RefreshHandler;
