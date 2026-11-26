# MailPulse — Gmail Keyword Interest Notifier

**MailPulse** is a lightweight Google Chrome extension that watches your Gmail inbox in the background and sends you an instant desktop pop-up alert **only** when a new unread email matches the keywords you care about (such as `internships`, `jobs`, `offers`, or `discounts`).

No more checking your inbox every few minutes or missing urgent opportunities.

---

## Key Features
* **Fast 10-Second Background Checks:** Scans unread inbox emails every 10 seconds without needing a Gmail tab open.
* **Custom Keyword Filtering:** Only alerts you when the email's **Subject** or **Preview Snippet** contains one of your saved keywords.
* **Duplicate Alert Protection:** Remembers scanned emails so you never get notified twice for the same message.
* **100% Private & Local:** Runs completely inside your own Chrome browser. Your emails, login tokens, and keywords are never sent to any external server.

---

## Step-by-Step Installation Guide (Takes 2 Minutes)

### Step 1: Download and Extract the Extension
1. Click the green **`<> Code`** button near the top-right of this GitHub page.
2. Click **Download ZIP**.
3. Open your computer's **Downloads** folder, right-click the downloaded `.zip` file, and click **Extract All...** to unzip it into a normal folder.
   > **Important:** Make sure you extract/unzip the folder first. Google Chrome cannot load an extension directly from inside a `.zip` file.

### Step 2: Load MailPulse into Google Chrome
1. Open Google Chrome, type `chrome://extensions` into the address bar, and press **Enter**.
2. In the top-right corner of the page, turn **ON** the **Developer mode** switch.
3. Click the **Load unpacked** button in the top-left corner.
4. Open the extracted folder, select the inner folder that contains `manifest.json`, and click **Select Folder**.
5. **MailPulse Gmail Interest Notifier** will now appear in your Chrome extensions list!

### Step 3: Pin the Icon & Add Your Keywords
1. Click the **Extensions puzzle icon** (🧩) in the top-right corner of Chrome and click the **Pin icon** next to **MailPulse** so it stays visible on your toolbar.
2. Click the **MailPulse** icon to open the extension popup.
3. Type the keywords you want to track, separated by commas (for example: `internships, jobs, interview, offers`), and save them.

### Step 4: Connect Your Gmail Account
1. Inside the MailPulse popup, click **Connect Gmail & Start Agent**.
2. Choose your Google account in the sign-in window.
3. **Important — Bypassing the "Google hasn't verified this app" screen:**
   * Because MailPulse is a free, open-source project running locally on your computer, Google shows a standard *"Google hasn't verified this app"* notice during your first sign-in.
   * Click **Advanced** at the bottom-left of that screen.
   * Click **Go to MailPulse Gmail Interest Notifier (unsafe)** at the bottom.
   * Check the box to allow **View your email messages and settings** (`gmail.readonly`) and click **Continue**.
4. Keep Chrome open (even minimized) — MailPulse will now automatically scan your inbox every 10 seconds!

---

## Troubleshooting & Common Questions

### 1. Why does Google say "Google hasn't verified this app"? Is it safe?
Yes. Google requires paid third-party security audits for public apps that read Gmail messages. Because MailPulse is free and runs 100% locally in your own browser without any external servers, it uses Google's standard unverified production mode (which supports up to 100 users). You can inspect all 5 source files (`manifest.json`, `popup.html`, `popup.js`, `background.js`, `icon.png`) directly in this repository.

### 2. I don't see any desktop pop-up notifications
* **Enable Chrome Notifications in Windows / Mac:**
  * **Windows 11/10:** Go to **Settings -> System -> Notifications**, turn **Notifications ON**, make sure **Do not disturb** is **OFF**, and toggle **Google Chrome ON**.
  * **Mac:** Go to **System Settings -> Notifications -> Google Chrome** and enable **Allow Notifications**.
* **Make sure the test email is UNREAD:** MailPulse only checks **unread** messages in your primary **Inbox** (`is:unread in:inbox`). If you already opened the email on your phone or another tab before the 10-second scan ran, it will not trigger an alert.
* **Keep Chrome running:** At least one Chrome window must stay open (or minimized) in the background.

### 3. Error: "Manifest file is missing or unreadable" during Load Unpacked
You either forgot to unzip the downloaded `.zip` file, or you selected the outer folder instead of the folder directly containing `manifest.json`. Open the extracted folder until you see `manifest.json`, `popup.html`, and `background.js`, and select that exact folder.

### 4. How do I change my keywords later?
Click the **MailPulse** icon in your Chrome toolbar, update your keywords, and save. The background scanner immediately uses your new keywords on the next 10-second cycle.

---

## Permissions Explained
* **`identity`:** Connects securely to your Google account via OAuth 2.0 without ever seeing your password.
* **`gmail.readonly`:** Reads only the subject, sender, and snippet of unread inbox emails locally to match against your keywords. MailPulse cannot send, edit, or delete any emails.
* **`storage`:** Stores your keywords and recently scanned email IDs locally on your device.
* **`alarms` & `notifications`:** Runs the 10-second background check and displays desktop alert banners.
