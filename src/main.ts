import { loginState } from "./pages/login-state";
import "./style.css";

if (!loginState.isLoggedIn) {
  window.location.replace("/login.html");
}
// const app = document.querySelector<HTMLDivElement>("#app");
// app!.innerHTML = "<h1>Hello Typescript</h1>";
