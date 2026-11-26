# Privacy Policy for MailPulse Gmail Interest Notifier

**Effective Date:** November 26, 2026  
**Developer Contact:** akshithkendyala@gmail.com  
**Repository:** https://github.com/akshithkendyala/MailPulse-Gmail-Notifier

---

## 1. Overview
**MailPulse Gmail Interest Notifier** ("MailPulse") is a Chrome browser extension that scans incoming unread Gmail messages locally inside your browser and sends desktop notifications only when an email matches keywords you specify.

Your privacy is our highest priority. MailPulse runs **100% locally on your device** and does not use any external backend servers or databases.

---

## 2. Information We Access
When you connect your Google account to MailPulse, the extension requests the following read-only permission:
* **Gmail Read-Only Access (`https://www.googleapis.com/auth/gmail.readonly`):** Used strictly to read the **Subject**, **Sender (`From`)**, and **Preview Snippet** of unread messages in your Inbox so MailPulse can check if they match your chosen keywords.

MailPulse **cannot** send, edit, forward, or delete any of your emails.

---

## 3. How Your Data Is Used and Stored
* **Local Keyword Matching:** All keyword filtering happens directly inside your Chrome browser's local memory.
* **Local Storage (`chrome.storage.local`):** Your chosen keywords and the IDs of recently scanned emails (to avoid duplicate notifications) are saved locally on your own computer.
* **Zero External Transmission:** Your emails, OAuth tokens, and keywords are never sent to, stored on, or shared with the developer or any third-party servers.

---

## 4. Google API Services User Data Policy Compliance
MailPulse's use and transfer to any other app of information received from Google APIs adheres to the [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy), including the Limited Use requirements.

---

## 5. How to Revoke Access or Delete Your Data
You are in full control of your data at all times:
1. **Remove Local Data:** Removing the extension from `chrome://extensions` immediately deletes all locally stored keywords and scanned message IDs.
2. **Revoke Google Account Access:** Visit your [Google Account Permissions page](https://myaccount.google.com/permissions), select **MailPulse Gmail Interest Notifier**, and click **Remove Access**.

---

## 6. Contact
If you have any questions about this Privacy Policy or how MailPulse works, contact **akshithkendyala@gmail.com** or open an issue at https://github.com/akshithkendyala/MailPulse-Gmail-Notifier.
