/**
 * Brand enquiry form → Google Sheet webhook
 * ==========================================
 * The site has TWO forms behind one toggle (components/Contact.tsx), and
 * each posts to its own web app:
 *
 *   Brand / business → THIS script, standalone at script.google.com,
 *                      writing to the "Deecode Brands" spreadsheet.
 *                      Roles: "I'm a Brand", "I need a website".
 *
 *   Creator / other  → the original deployment, bound to the "Deecode"
 *                      spreadsheet. Untouched by any of this — it still
 *                      runs the old single-sheet script, and now only
 *                      ever receives creator submissions.
 *
 * Columns written here. If the sheet is empty, the first submission lays
 * down this header row itself:
 *
 *   A: Name | B: Brand | C: Email | D: Number | E: Website / handle
 *   F: Budget | G: Role | H: Brief | I: Submitted at
 *
 * SETUP — one time, ~2 minutes:
 * 1. script.google.com → New project. Delete the starter code, paste
 *    this entire file, save (⌘S). Give the project a name while you're
 *    there — "Deecode brand form" beats "Untitled project" in six months.
 * 2. Select `testDoPost` in the Run selector and click Run. Approve the
 *    access prompt. Check the spreadsheet got a row, then delete it.
 * 3. Deploy → New deployment → gear icon → Web app.
 *      - Description:    brand enquiry form
 *      - Execute as:     Me
 *      - Who has access: Anyone        ← required, or the site can't post
 *    Click Deploy.
 * 4. Open the /exec URL in a browser. It should print "ok". If it asks
 *    you to sign in, "Who has access" didn't take.
 * 5. Paste that /exec URL into content/site.ts → the brand audience's
 *    `webhookUrl`. Until it's filled in, the brand form falls back to
 *    opening the visitor's email client, so nothing is lost meanwhile.
 *
 * LATER EDITS only go live via Deploy → Manage deployments → edit
 * (pencil) → Version: New version → Deploy. The URL stays the same.
 */

/**
 * The spreadsheet brand enquiries land in. Rows go to its FIRST tab.
 * Whichever account this runs as ("Execute as: Me") needs edit access.
 */
const BRAND_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1OT7z65Jlb3x54hHQYSfz9tWCVxCR8vqNhgWTmxgahQI/edit";

/** Laid down automatically while the spreadsheet is still empty. */
const BRAND_HEADERS = [
  "Name",
  "Brand",
  "Email",
  "Number",
  "Website / handle",
  "Budget",
  "Role",
  "Brief",
  "Submitted at",
];

function doPost(e) {
  const p = e.parameter;
  const sheet = SpreadsheetApp.openByUrl(BRAND_SHEET_URL).getSheets()[0];

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(BRAND_HEADERS);
    sheet.getRange(1, 1, 1, BRAND_HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }

  sheet.appendRow([
    p.name || "",
    p.company || "",
    p.email || "",
    // Leading apostrophe forces plain text — otherwise Sheets parses
    // "+91…" as a formula (#ERROR!) and bare digits as numbers (3.2E+36).
    p.phone ? "'" + p.phone : "",
    p.profile || "",
    p.budget || "",
    p.role || "",
    p.message || "",
    new Date(),
  ]);

  return ContentService.createTextOutput("ok");
}

/** Lets you check a fresh deployment by opening its /exec URL in a browser. */
function doGet() {
  return ContentService.createTextOutput("ok");
}

/**
 * Editor-only test: select this function in the toolbar and click Run.
 * (Running doPost directly fails with "Cannot read properties of
 * undefined" because the editor passes no web request.)
 * This is also the run that triggers the one-off access prompt.
 * Appends one row so you can check the column mapping — then delete it.
 */
function testDoPost() {
  doPost({
    parameter: {
      name: "Test Brand",
      company: "Test Co",
      email: "test@example.com",
      phone: "+91 00000 00000",
      profile: "https://testco.com",
      budget: "₹1–3 lakh",
      message: "Test brief",
      role: "I'm a Brand",
    },
  });
}
