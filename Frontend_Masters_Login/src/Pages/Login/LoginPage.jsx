import React, { useState } from "react";
import axios from "axios";
import LoginForm from "./LoginForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [email, setEmail] = useState("test1@example.com");
  const [role, setRole] = useState("Admin");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("123456");
  const [loader, setLoader] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    let apiEndpoint;
    switch (role) {
      case "Admin":
        apiEndpoint = `${
          import.meta.env.VITE_BACKEND_URL
        }/api/login-master-admin`;
        break;
      default:
        setError("Invalid role selected.");
        return;
    }

    try {
      setLoader(true);

      const response = await axios.post(
        apiEndpoint,
        { email, password, role },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      const { accessToken, refreshToken, user } = await response.data.data;
      const schoolCode = user.schoolCode; // School ka unique code

      console.log("Login successful. User:", user);

      // Token ko localStorage mein store karein
      const userData = JSON.stringify({
        authToken: accessToken,
        refreshToken,
        name: user.name,
        schoolCode: user.schoolCode,
        role: user.role,
        email: user.email,
        frontendUrl: user.frontendUrl,
      });

      // JSON string ko URI mein encode karke pass karenge
      const encodedUserData = encodeURIComponent(userData);
      window.location.href = `${user.frontendUrl}/settingupdata?userData=${encodedUserData}`;

      toast.success("Login successful.");
    } catch (err) {
      toast.error("Login failed. Please check your credentials.");
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center items-center">
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        error={error}
        role={role}
        setRole={setRole}
      />
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
