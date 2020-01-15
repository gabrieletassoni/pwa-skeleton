// Get a reference to main body
const body = document.getElementById("body");
// Load version from storage, if it already exists
document.getElementById("version").innerText = window.localStorage.getItem("version");