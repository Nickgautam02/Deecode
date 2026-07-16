/**
 * Website contact form → Google Sheet webhook
 * ============================================
 * Appends each form submission as a row in the "Deecode" spreadsheet,
 * in the tab with gid 938976038 (the one from your link), mapped to
 * your existing columns:
 *
 *   A: Name | B: Email | C: Number | D: Profile | E: Goal | F: Role | G: Submitted at
 *
 * IMPORTANT: the sheet's "Profile" column must be column D (between
 * Number and Goal) to match the appendRow order below — move it there,
 * or reorder the appendRow values to match your sheet.
 *
 * SETUP — one time, ~2 minutes:
 * 1. Open the spreadsheet → Extensions → Apps Script.
 * 2. Delete any starter code and paste this entire file. Save (⌘S).
 * 3. Click Deploy → New deployment → gear icon → Web app.
 *      - Description:    website contact form
 *      - Execute as:     Me
 *      - Who has access: Anyone        ← required, or the site can't post
 * 4. Click Deploy, authorize with your Google account when prompted.
 * 5. Copy the "Web app" URL (ends in /exec) and paste it into
 *    content/site.ts → contact.sheetWebhookUrl.
 *
 * NOTE: if you later edit this script, you must Deploy → Manage
 * deployments → edit (pencil) → New version, or changes won't go live.
 */

const SHEET_GID = 938976038;

function doPost(e) {
  const sheet = SpreadsheetApp.getActive()
    .getSheets()
    .find(function (s) {
      return s.getSheetId() === SHEET_GID;
    });

  const p = e.parameter;
  sheet.appendRow([
    p.name || "",
    p.email || "",
    p.phone || "", // → your "Number" column
    p.profile || "", // → your "Profile" column
    p.message || "", // → your "Goal" column
    p.role || "",
    new Date(),
  ]);

  return ContentService.createTextOutput("ok");
}
