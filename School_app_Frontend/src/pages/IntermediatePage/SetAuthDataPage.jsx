import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import PyramidLoader from "../../common/Loader/PyramidLoader";
import axios from "axios";
import { toast } from "react-toastify";
import AdminDashboard from "../Dashboard/AdminDashboard";

const SetAuthDataPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading } = useAuth();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const encodedUserData = queryParams.get("userData");

    if (encodedUserData) {
      try {
        const userData = JSON.parse(decodeURIComponent(encodedUserData));
        const {
          authToken,
          refreshToken,
          name,
          schoolCode,
          role,
          email,
          frontendUrl,
        } = userData;

        
        axios
          .post(`${import.meta.env.VITE_BACKEND_URL}/api/verify-admin`, {
            accessToken: authToken,
          })
          .then((res) => {
            console.log(res.data.data);
            toast.success("User verified successfully.");

            const user = {
              name,
              role,
              email,
              frontendUrl,
            };

            // Login and set user data
            login(authToken, refreshToken, user, schoolCode);
            window.location.replace("/school/dashboard");

            // Clean URL and redirect to dashboard
            window.history.replaceState(null, null, "/school/dashboard");
          })
          .catch((err) => {
            console.error("Verification failed:", err);
            toast.error("Invalid token. Please login again.");

            // Redirect to home URL if verification fails
            window.location.href = `${import.meta.env.VITE_HOME_REDIRECT_URL}`;
          });
      } catch (error) {
        console.error("Error parsing user data:", error);
        window.location.href = `${import.meta.env.VITE_HOME_REDIRECT_URL}`;
      }
    } else {
      window.location.href = `${import.meta.env.VITE_HOME_REDIRECT_URL}`;
    }
  }, [location, login]);

  useEffect(() => {
    if (!loading) {
      navigate("/school/dashboard");
    }
  }, [loading, navigate]);

  return loading ? (
    <PyramidLoader desc={"Hang tight, we're almost there!"} />
  ) : <AdminDashboard/>;
};

export default SetAuthDataPage;
