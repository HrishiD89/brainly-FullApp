import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { DashBoard } from "./pages/DashBoard";
import  Contents  from "./pages/Contents";

// Helper function to validate token (example)
const isTokenValid = (token: string) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp > currentTime; // Check if the token has expired
  } catch (e) {
    return false;
  }
};

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token && !isTokenValid(token)) {
      localStorage.removeItem("token"); // Remove expired token
      setToken(null);
    }
  }, [token]);

  return (
    <Routes>
      <Route
        path="/"
        element={token ? <Navigate to="/dashboard" /> : <Signin setToken={setToken} />}
      />
      <Route
        path="/signin"
        element={<Signin setToken={setToken} />}
      />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={token ? <DashBoard /> : <Navigate to="/signin" />}
      />
      <Route path="/brain/:hash" element={<Contents/>} />
    </Routes>
  );
};

export default App;
