// ==========================================
// STEP 1: TRIGGER (The Ears)
// Checks Gmail every 10 seconds + 30s backup alarm
// ==========================================
let fastLoopTimer = null;
let isScanning = false;

function startFastPolling() {
  // 1. Keep a 30-second Chrome alarm running as a safety net
  chrome.alarms.create("checkGmailAlarm", { periodInMinutes: 0.5 });

  // 2. Run an immediate check right now
  runAgentPipeline();

  // 3. Schedule a fast 10-second loop
  if (fastLoopTimer) clearTimeout(fastLoopTimer);
  scheduleNextCheck();
}

function scheduleNextCheck() {
  fastLoopTimer = setTimeout(async () => {
    await runAgentPipeline();
    scheduleNextCheck();
  }, 10000); // 10,000 ms = 10 seconds
}

chrome.runtime.onInstalled.addListener(() => {
  startFastPolling();
});

chrome.runtime.onStartup.addListener(() => {
  startFastPolling();
});

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "START_AGENT") {
    startFastPolling();
  }
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "checkGmailAlarm") {
    runAgentPipeline();
    // Restart the 10-second loop if Chrome paused the service worker
    if (!fastLoopTimer) {
      scheduleNextCheck();
    }
  }
});

async function runAgentPipeline() {
  // Prevent overlapping checks if one request is still running
  if (isScanning) return;
  isScanning = true;

  try {
    const data = await chrome.storage.local.get(["keywords", "processedIds"]);
    const keywords = data.keywords || [];
    const processedIds = new Set(data.processedIds || []);

    // Stop if user hasn't set any keywords yet
    if (keywords.length === 0) return;

    const token = await new Promise((resolve) => {
      chrome.identity.getAuthToken({ interactive: false }, (tok) => {
        if (chrome.runtime.lastError || !tok) resolve(null);
        else resolve(tok);
      });
    });

    if (!token) return;

    // Fetch latest 5 unread messages in Inbox
    const listRes = await fetch(
      "https://gmail.googleapis.com/gmail/v1/users/me/messages?q=is:unread+in:inbox&maxResults=5",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const listData = await listRes.json();
    if (!listData.messages) return;

    for (const msg of listData.messages) {
      // Skip emails we have already scanned
      if (processedIds.has(msg.id)) continue;

      // Fetch full email metadata & snippet
      const msgRes = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=metadata&metadataHeaders=Subject&metadataHeaders=From`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const msgData = await msgRes.json();

      const headers = msgData.payload?.headers || [];
      const subject = headers.find(h => h.name === "Subject")?.value || "(No Subject)";
      const sender = headers.find(h => h.name === "From")?.value || "Unknown Sender";
      const snippet = msgData.snippet || "";

      // Mark ID as processed so we never notify twice for the same email
      processedIds.add(msg.id);

      // ==========================================
      // STEP 2: FILTER (The Brain)
      // Checks if Subject or Snippet matches user keywords
      // ==========================================
      const combinedText = `${subject} ${snippet}`.toLowerCase();
      const matchedKeyword = keywords.find(kw => combinedText.includes(kw));

      // ==========================================
      // STEP 3: ACTION (The Messenger)
      // Send desktop notification ONLY if matched
      // ==========================================
      if (matchedKeyword) {
        chrome.notifications.create(msg.id, {
          type: "basic",
          iconUrl: chrome.runtime.getURL("icon.png"),
          title: `Match (${matchedKeyword.toUpperCase()}): ${subject}`,
          message: `From: ${sender}\n${snippet.slice(0, 100)}...`,
          priority: 2
        });
      }
    }

    // Keep only the last 200 processed IDs in storage so memory stays tiny
    const trimmedIds = Array.from(processedIds).slice(-200);
    await chrome.storage.local.set({ processedIds: trimmedIds });

  } catch (err) {
    console.error("Agent pipeline error:", err);
  } finally {
    isScanning = false;
  }
}