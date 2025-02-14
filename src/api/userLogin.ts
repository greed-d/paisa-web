import { loginState } from "../pages/login-state";
import { setAccessToken } from "../utils";

const form = document.querySelector("#sign-in");
console.log(form);

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  // console.log((document.querySelector(".username") as HTMLInputElement).value);
  console.log("hello");
  let remember = (document.querySelector("#remember") as HTMLInputElement)
    .checked;
  console.log(remember);

  const formData = {
    username: (document.querySelector("#username") as HTMLInputElement).value,
    password: (document.querySelector("#password") as HTMLInputElement).value,
    rememberMe: (document.querySelector("#remember") as HTMLInputElement)
      .checked,
  };
  console.log(formData);

  await sendData(formData);
});

interface LogIn {
  username: string;
  password: string;
  rememberMe: boolean;
}

const sendData = async (data: LogIn) => {
  console.log("Send data");
  try {
    const response = await fetch("http://127.0.0.1:8000/auth/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (response.ok) {
      const result = await response.json();
      window.location.href = "./dashoboard.html";
      alert("Login Successful!");
      loginState.isLoggedIn = true;
      loginState.user = {
        id: result.data.id,
        email: result.data.email,
        last_login: result.data.last_login || null,
        username: result.data.username,
        first_name: result.data.first_name,
        last_name: result.data.last_name,
      };
      console.log(`User is ${loginState.user}`);

      console.log("Response status : ", response.status);
      console.log("Response headers : ", response.headers);
      console.log("cookies after request : ", document.cookie);
    } else {
      const errorData = await response.json();
      console.error("Error logging in : ", errorData);
      alert(`Login failed: ${errorData.message}`);
    }
  } catch (error) {
    console.error("network error", error);
    alert("Failed to connect to server. Please try again later");
  }
};
