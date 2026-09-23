/**
 * Deecode Media House — creates the OUTREACH & SOCIAL MEDIA INTERN form.
 *
 * ── HOW TO RUN IT ────────────────────────────────────────────────────
 *   1. script.google.com → New project.
 *   2. Empty Code.gs completely, then paste this file in. (Pasting on top
 *      of an older script leaves remnants that surface as syntax errors
 *      three functions away from anything you changed.)
 *   3. Run `createOutreachInternForm`, authorise when asked.
 *   4. Do the one manual step below.
 *   5. The execution log prints three URLs: the form's editor, the public
 *      responder link, and the responses spreadsheet.
 *
 * ── ⚠ ONE MANUAL STEP: THE CV FIELD ──────────────────────────────────
 * Apps Script cannot create a file-upload question. There is no
 * `addFileUploadItem`, and there is no workaround — it is the one item
 * type the Forms service does not expose. So the script builds the form
 * up to that point and you add the field yourself, which takes about
 * fifteen seconds:
 *
 *     Open the form → the + button → change the question type to
 *     "File upload" → title it "Your CV" → Allow specific file types:
 *     PDF and Document → Maximum 1 file → make it Required.
 *
 * Put it directly under "Your Instagram or LinkedIn". The script leaves
 * a short text question there as a placeholder marker so the position is
 * obvious; delete that one once the upload field is in.
 *
 * ⚠ AND KNOW WHAT THE UPLOAD COSTS YOU: a form with a file-upload
 * question can only be filled in by someone signed in to a Google
 * account, and every CV lands in YOUR Drive and counts against its
 * storage. If either of those is a problem, delete the upload field and
 * keep the placeholder question, which asks for a link to a CV instead
 * and works for anyone.
 *
 * ── THE TWO RULES FROM THE CREATOR FORM STILL APPLY ───────────────────
 *  · No stipend figure anywhere. The form asks what they expect per
 *    month; naming ours first only teaches them what to say.
 *  · The existing creator form (id 1Lai-…-s7yULCE) is a DIFFERENT role
 *    and is rebuilt in place to keep its URL. This is its own form.
 *
 * ── WHY THIS ONE IS SHORT, AND WHAT SURVIVED THE CUT ─────────────────
 * The first cut asked candidates to write a DM, plan three posts and
 * explain how they would build a creator list. Good filters, and far too
 * long for a role we want a pile of applicants for — a six-minute form
 * filters on patience, not ability. Every written question is gone and
 * that conversation happens on the shortlist call instead.
 *
 * The CHOICE questions stayed, because they cost a tap each and they are
 * what makes the response sheet sortable: Canva level, Excel level, what
 * outreach they have actually done, hours, commitment. You can rank a
 * hundred rows on those columns. You cannot rank a hundred paragraphs.
 *
 * ⚠ THEY ARE GROUPED WITH `addSectionHeaderItem`, NOT `addPageBreakItem`.
 * A page break makes Google paginate, and a form that says "Page 1 of 5"
 * reads as long however few questions are on each page. A section header
 * is a label on one continuous page: same grouping, no progress bar of
 * dread.
 */

// Edit these and re-run to change the framing of the whole form.
var ROLE = 'Outreach & Social Media Intern';
var BASE = 'Delhi NCR';   // '' drops every mention of a location
var REMOTE_OK = true;     // true: NCR is a preference, not a filter
var PAID = true;          // false makes the deal line say unpaid
var FORM_TITLE = 'Deecode Media House — ' + ROLE + ' 🚀';

function createOutreachInternForm() {
  var form = FormApp.create(FORM_TITLE);
  form.setTitle(FORM_TITLE);
  form.setDescription(intro_());
  form.setCollectEmail(false); // asked as a question, so it works signed-out
  form.setShowLinkToRespondAgain(false);
  form.setConfirmationMessage(
    "Got it. We read every one of these.\n\n" +
    "If it's a fit you'll hear from us on WhatsApp. If you don't hear back " +
    "in two weeks, it wasn't this one — we hire in waves, so keep an eye out.");

  form.addTextItem().setTitle('Full name').setRequired(true);

  form.addTextItem()
    .setTitle('Email address')
    .setValidation(FormApp.createTextValidation().requireTextIsEmail().build())
    .setRequired(true);

  form.addTextItem()
    .setTitle('WhatsApp number')
    .setHelpText('This is how we reach the shortlist.')
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Where are you based?')
    .setChoiceValues(['Delhi', 'Noida / Greater Noida', 'Gurgaon',
                      'Elsewhere in NCR', 'Outside NCR — I would be remote'])
    .showOtherOption(true)
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('What are you doing right now?')
    .setChoiceValues(['Studying', 'Just finished studying',
                      'Working somewhere else', 'Freelancing',
                      'Between things'])
    .showOtherOption(true)
    .setRequired(true);

  form.addTextItem()
    .setTitle('Your Instagram or LinkedIn')
    .setHelpText('Whichever one actually says something about you.')
    .setRequired(true);

  // ⚠ PLACEHOLDER — see the CV note at the top of this file. Add the
  // File upload question here by hand, then delete this one. Left as a
  // working question rather than a blank so that a form run before the
  // manual step still collects a usable CV.
  form.addTextItem()
    .setTitle('Link to your CV')
    .setHelpText('Google Drive, Dropbox, anywhere — make sure the link ' +
                 'opens for anyone. REPLACE THIS QUESTION WITH A FILE ' +
                 'UPLOAD FIELD.')
    .setRequired(true);

  form.addSectionHeaderItem()
    .setTitle('What you have actually done')
    .setHelpText('Tick what is true. Nobody has all of it.');

  form.addCheckboxItem()
    .setTitle('Outreach you have done before')
    .setChoiceValues([
      'DMed creators or influencers',
      'Cold emailed brands or companies',
      'Called people who did not know me',
      'Run a campus or club outreach drive',
      'Sold something to a stranger',
      'None of it yet'])
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle('Platforms you know your way around')
    .setChoiceValues(['Instagram', 'LinkedIn', 'YouTube', 'X / Twitter',
                      'Threads', 'Facebook'])
    .showOtherOption(true)
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Canva')
    .setChoiceValues([
      'I design in it regularly — posts, decks, thumbnails',
      'I can put together a decent post from a template',
      'I have opened it a few times',
      'Never used it'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Excel or Google Sheets')
    .setChoiceValues([
      'Pivot tables, VLOOKUP / XLOOKUP, cleaning messy data',
      'Formulas, filters, sorting — the everyday stuff',
      'I can keep a tidy list and nothing more',
      'Not really'])
    .setRequired(true);

  form.addSectionHeaderItem().setTitle('How you work');

  form.addMultipleChoiceItem()
    .setTitle('Forty people ignore your message. What happens to number 41?')
    .setChoiceValues([
      'Same message, keep going — it is a numbers game',
      'I rewrite it and test something different',
      'I go find out why first, then send',
      'Honestly, by then I would have stopped'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Getting on a call with someone you have never met')
    .setChoiceValues([
      'Fine, I prefer calls to typing',
      'Fine once I know what I am asking for',
      'I would rather keep it in writing',
      'Not done it yet, willing to learn'])
    .setRequired(true);

  form.addSectionHeaderItem().setTitle('The internship');

  form.addMultipleChoiceItem()
    .setTitle('How many hours a week can you give this?')
    .setChoiceValues(['Full time', '30+ hours', '20–30 hours',
                      '10–20 hours', 'Under 10'])
    .setRequired(true);

  // Asked, never used as a cut: the answer decides how someone is worked
  // with, not whether they are read.
  if (BASE) {
    form.addMultipleChoiceItem()
      .setTitle('Can you come in to ' + BASE + '?')
      .setHelpText(REMOTE_OK
        ? 'Not a filter — remote works for this one. We just want to know.'
        : '')
      .setChoiceValues(['Yes, every day', 'Yes, a few days a week',
                        'Occasionally', 'No — I would be fully remote'])
      .setRequired(true);
  }

  form.addMultipleChoiceItem()
    .setTitle('How long can you commit for?')
    .setChoiceValues(['As long as it is working', '6 months+', '3–6 months',
                      '1–3 months', 'Just a few weeks'])
    .setRequired(true);

  form.addDateItem()
    .setTitle('Earliest date you can start')
    .setRequired(true);

  form.addTextItem()
    .setTitle('What monthly stipend are you expecting?')
    .setHelpText('A number, in rupees. Say what you actually want — we ' +
                 'would rather know now than after two rounds.')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Anything you want us to know?')
    .setHelpText('Optional. Two lines is plenty.')
    .setRequired(false);

  var ss = SpreadsheetApp.create(ROLE + ' — applications');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  Logger.log('EDIT:      ' + form.getEditUrl());
  Logger.log('PUBLIC:    ' + form.getPublishedUrl());
  Logger.log('RESPONSES: ' + ss.getUrl());
  Logger.log('TODO:      add the File upload question ("Your CV") in the ' +
             'editor and delete the "Link to your CV" placeholder.');
  return form.getPublishedUrl();
}

function intro_() {
  var lines = [
    'We are hiring an intern to help us find creators, talk to them, and ' +
    'keep our own channels alive while we do it.',
    '',
    'The work: creator and brand outreach, running our social handles, ' +
    'laying out posts in Canva, keeping the trackers honest in Excel, and ' +
    'influencer and market research for campaigns we are about to pitch.',
    '',
    'You need to be comfortable starting conversations with strangers, able ' +
    'to write like a person rather than a template, handy enough in Canva to ' +
    'make something look decent without a designer, and unbothered by a ' +
    'spreadsheet with 300 rows in it.',
    '',
    '── THE DEAL ──',
    PAID ? 'This is a paid internship with Deecode Media House.'
         : 'This is an unpaid internship with Deecode Media House.',
    'Real accounts, real creators, real briefs from day one.',
  ];
  if (BASE && REMOTE_OK) {
    lines.push('Based in ' + BASE + ' is a plus — some of this is easier in ' +
               'a room with us — but the work travels, so if you are good ' +
               'and you are elsewhere, apply anyway.');
  } else if (BASE) {
    lines.push('Base: ' + BASE + '.');
  }
  lines.push('Do it well and it turns into something longer.');
  lines.push('');
  lines.push('Three minutes — it is mostly tick-boxes — and your CV. ' +
             'Shortlisted candidates are contacted on WhatsApp.');
  return lines.join('\n');
}
