# MailPulse — Gmail Keyword Interest Notifier

MailPulse is a lightweight Chrome extension that scans incoming unread Gmail messages every 10 seconds in the background and sends instant desktop notifications only when an email matches your chosen keywords (such as `internships`, `jobs`, `offers`, or `discounts`).

## Features
- **Fast Background Scanning:** Checks unread inbox messages every 10 seconds without needing a Gmail tab open.
- **Custom Keyword Filtering:** Only alerts you when the subject or email snippet matches your saved keywords.
- **100% Client-Side Privacy:** Runs locally inside your Chrome browser—no external servers or databases store your emails.

## How to Install (Takes 1 Minute)
1. Click the green **Code** button at the top of this page and select **Download ZIP**.
2. Extract the downloaded ZIP folder onto your computer.
3. Open Google Chrome and navigate to `chrome://extensions`.
4. Turn on **Developer mode** using the toggle in the top-right corner.
5. Click **Load unpacked** and select the extracted `MailPulse` folder.
6. Click the **MailPulse** icon in your Chrome toolbar, add your keywords, and click **Connect Gmail & Start Agent**.

## Permissions Used
- `identity`: Connects securely to your Google account via OAuth 2.0.
- `gmail.readonly`: Reads unread email subjects and snippets locally to check against your keywords.
- `storage`: Saves your chosen keywords and processed email IDs locally in Chrome.
- `alarms` & `notifications`: Runs background checks and displays desktop alert banners.
