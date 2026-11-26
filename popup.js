const keywordInput = document.getElementById("keywordInput");
const addBtn = document.getElementById("addBtn");
const keywordList = document.getElementById("keywordList");
const connectBtn = document.getElementById("connectBtn");
const statusMsg = document.getElementById("statusMsg");

// Load saved keywords and check if already signed in when popup opens
document.addEventListener("DOMContentLoaded", () => {
  renderKeywords();
  checkExistingConnection();
});

function checkExistingConnection() {
  chrome.identity.getAuthToken({ interactive: false }, (token) => {
    if (chrome.runtime.lastError || !token) {
      // User is not signed in yet — ignore silently without triggering a Chrome error
      return;
    }
    fetchGmailProfile(token);
  });
}

function fetchGmailProfile(token) {
  fetch("https://gmail.googleapis.com/gmail/v1/users/me/profile", {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.emailAddress) {
        statusMsg.style.color = "#188038";
        statusMsg.textContent = `Connected: ${data.emailAddress} (Watching in background)`;
        connectBtn.textContent = "Connected ✓";
      }
    })
    .catch((err) => {
      console.error("Profile fetch error:", err);
    });
}

function renderKeywords() {
  chrome.storage.local.get(["keywords"], (result) => {
    const keywords = result.keywords || [];
    keywordList.innerHTML = "";
    keywords.forEach((word, index) => {
      const li = document.createElement("li");
      li.textContent = word;

      const delBtn = document.createElement("button");
      delBtn.textContent = "Remove";
      delBtn.className = "del";
      delBtn.onclick = () => removeKeyword(index);

      li.appendChild(delBtn);
      keywordList.appendChild(li);
    });
  });
}

// Add new comma-separated or single keywords permanently
addBtn.onclick = () => {
  const raw = keywordInput.value.trim();
  if (!raw) return;

  const newWords = raw.split(",").map(w => w.trim().toLowerCase()).filter(Boolean);
  chrome.storage.local.get(["keywords"], (result) => {
    const existing = result.keywords || [];
    const updated = Array.from(new Set([...existing, ...newWords]));
    chrome.storage.local.set({ keywords: updated }, () => {
      keywordInput.value = "";
      renderKeywords();
      statusMsg.style.color = "#188038";
      statusMsg.textContent = "Preferences saved permanently!";
    });
  });
};

// Remove a keyword anytime
function removeKeyword(index) {
  chrome.storage.local.get(["keywords"], (result) => {
    const keywords = result.keywords || [];
    keywords.splice(index, 1);
    chrome.storage.local.set({ keywords }, () => {
      renderKeywords();
      statusMsg.textContent = "Keyword removed.";
    });
  });
}

// Authorize Gmail & start background polling
connectBtn.onclick = () => {
  statusMsg.style.color = "#5f6368";
  statusMsg.textContent = "Connecting to Gmail...";

  chrome.identity.getAuthToken({ interactive: true }, (token) => {
    if (chrome.runtime.lastError || !token) {
      statusMsg.style.color = "#d93025";
      statusMsg.textContent = "Auth failed: " + (chrome.runtime.lastError?.message || "Unknown error");
      return;
    }

    fetchGmailProfile(token);
    chrome.runtime.sendMessage({ action: "START_AGENT" });
  });
};