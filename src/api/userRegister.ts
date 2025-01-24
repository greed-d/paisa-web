const form = document.getElementById("registration-form") as HTMLFormElement;
console.log(form);

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = {
    first_name: (document.querySelector(".first_name") as HTMLInputElement)
      .value,
    last_name: (document.querySelector(".last_name") as HTMLInputElement).value,
    username: (document.querySelector(".username") as HTMLInputElement).value,
    password: (document.querySelector(".password") as HTMLInputElement).value,
    password2: (document.querySelector(".password2") as HTMLInputElement).value,
    email: (document.querySelector(".email") as HTMLInputElement).value,
  };
  console.log(formData);

  await sendData(formData);
});

interface FormData {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  password2: string;
  email: string;
}

const sendData = async (data: FormData): Promise<void> => {
  try {
    const response = await fetch("http://127.0.0.1:8000/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Registration Successful : ", result);
      alert("Registration Successful!");

      window.location.href = "/login.html";
    } else {
      const errorData = await response.json();
      console.error("Error registering : ", errorData);
      alert(`Registration failed: ${errorData.message}`);
    }
  } catch (error) {
    console.error("network error", error);
    alert("Failed to connect to server. Please try again later");
  }
};
