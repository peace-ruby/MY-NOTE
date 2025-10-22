// password.js
const lockPopup = document.getElementById("lockPopup");
const passwordInput = document.getElementById("passwordInput");
const unlockBtn = document.getElementById("unlockBtn");
const cancelBtn = document.getElementById("cancelBtn");

let locked = localStorage.getItem("noteLocked") === "true";
let savedPassword = localStorage.getItem("notePassword") || "";

// Show popup
function showLockPopup() {
  lockPopup.classList.remove("hidden");
  passwordInput.value = "";
  passwordInput.focus();
}
    
// Hide popup
function hideLockPopup() {
  lockPopup.classList.add("hidden");
}

// Unlock button
unlockBtn.onclick = () => {
  const entered = passwordInput.value.trim();
  if (entered === "") return alert("Enter a password");

  if (!savedPassword) {
    // If no password set yet
    localStorage.setItem("notePassword", entered);
    alert("Password set successfully!");
    locked = false;
    localStorage.setItem("noteLocked", false);
    hideLockPopup();
  } else if (entered === savedPassword) {
    alert("Unlocked successfully!");
    locked = false;
    localStorage.setItem("noteLocked", false);
    hideLockPopup();
  } else {
    alert("Wrong password!");
  }
};

// Cancel button
cancelBtn.onclick = hideLockPopup;

// Automatically show popup if locked
window.addEventListener("load", () => {
  if (locked) showLockPopup();
});
