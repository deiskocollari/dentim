if (window.location.pathname === "/") {
  fetch('https://ipinfo.io/json')
    .then(response => response.json())
    .then(data => {
      const country = data.country; // country code, e.g., 'IT' for Italy
      const userLanguage = localStorage.getItem('preferredLanguage');
      const currentPath = window.location.pathname;

      // Check if user language is set in localStorage
      if (userLanguage) {
        // Only redirect if not already on the correct language path
        if (currentPath !== `/${userLanguage}`) {
          window.location.href = `/${userLanguage}`;
        }
      } else {
        // Redirect based on geolocation (only if not already on the target path)
        if (country === "IT" && currentPath !== "/it") {
          window.location.href = "/it"; // Redirect to Italian version
        } else if (country === "ES" && currentPath !== "/es") {
          window.location.href = "/es"; // Redirect to Spanish version
        } else if (currentPath !== "/") {
          window.location.href = "/"; // Default to English version
        }
      }
    })
    .catch(err => console.error("Geo-IP detection failed:", err));
}
