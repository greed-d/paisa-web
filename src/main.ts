import { loginState } from "./pages/login-state";
import "./style.css";

const refreshAccessToken = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    console.log("Response status : ", response.status);
    console.log("Response headers : ", response.headers);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error refreshing token", error);
  }
};

refreshAccessToken().then((date) => {
  loginState.isLoggedIn = true;
  // loginState.user = {};

  if (!loginState.isLoggedIn) {
    window.location.replace("/login.html");
  } else {
    window.location.replace("/dashboard.html");
  }
});
