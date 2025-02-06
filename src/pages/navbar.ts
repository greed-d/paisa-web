// src/pages/navbar.ts
async function loadNavbar() {
  try {
    // Fetch the navbar HTML
    const response = await fetch("../../public/navbar.html");
    if (!response.ok) {
      throw new Error("Failed to load navbar");
    }

    // Get the HTML content
    const navbarHtml = await response.text();

    // Create a container for the navbar
    const navbarContainer = document.createElement("div");
    navbarContainer.innerHTML = navbarHtml;

    // Prepend the navbar to the body
    document.body.prepend(navbarContainer);
  } catch (error) {
    console.error("Error loading navbar:", error);
  }
}

// Load the navbar when the script runs
loadNavbar();
