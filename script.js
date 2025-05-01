let currentUser = null;
let pfpData = "";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const file = document.getElementById("pfp").files[0];
  
  const reader = new FileReader();
  reader.onload = () => {
    pfpData = reader.result;
    currentUser = { username, pfp: pfpData };
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("chat").style.display = "block";
    loadMessages();
  };
  reader.readAsDataURL(file);
});

document.getElementById("msgForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const msg = document.getElementById("msgInput").value;
  await fetch("/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: currentUser, message: msg }),
  });
  document.getElementById("msgInput").value = "";
  loadMessages();
});

async function loadMessages() {
  const res = await fetch("/messages");
  const data = await res.json();
  const container = document.getElementById("messages");
  container.innerHTML = "";
  data.forEach(({ user, message }) => {
    const div = document.createElement("div");
    div.className = "message";
    div.innerHTML = `<img src="${user.pfp}"><strong>${user.username}:</strong> ${message}`;
    container.appendChild(div);
  });
}
