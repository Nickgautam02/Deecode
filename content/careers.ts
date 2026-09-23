// ────────────────────────────────────────────────────────────────
//  CAREERS — everything rendered at /careers.
//
//  ── THE APPLICATION FORM LIVES OUTSIDE THIS REPO ───────────────
//  Applications go to a Google Form Nikhil owns and edits by hand; no
//  part of it is in git, and nothing here can change a question on it.
//  This page is a wrapper: the pitch in the site's own voice, then the
//  way in to the form. The script that built it is in
//  scripts/outreach-intern-form.gs, and the long-form JD — for LinkedIn,
//  Instagram, or anyone who asks — is scripts/outreach-intern-jd.md.
//  Those three say the same thing in three lengths; change one, change
//  the others.
//
//  ⚠ USE THE RESPONDER URL BELOW, NOT THE /forms/d/<id>/edit ONE. The
//  edit URL opens the form BUILDER, and anyone not signed in as Nikhil
//  gets a permission wall instead of an application.
//
//  ⚠ THIS FORM IS LINKED, NOT EMBEDDED, AND THE CV FIELD IS WHY. A form
//  with a file-upload question only accepts a signed-in Google account,
//  so an anonymous request for it returns 401 — and Google's sign-in page
//  sets headers that forbid it from rendering inside an iframe. Embedded,
//  the section was a white box for exactly the people we are trying to
//  reach. Sent out to Google's own page, the sign-in happens where it is
//  allowed to happen.
//
//  So: if the upload question is ever replaced by the "Link to your CV"
//  text question the build script leaves in place, the form opens for
//  everyone again and this page can go back to an <iframe> — see the
//  commit that removed it for the markup.
//
//  ── THE ROLE CHANGED HERE ONCE ALREADY ─────────────────────────
//  This page ran the on-camera creator hiring form first (form id
//  1Lai-Api7nPM1_Uw4aiv3lw4DT5kA3UgC1hU_s7yULCE, still live, still
//  Nikhil's). It was replaced rather than joined — one role at a time
//  on this page. If both are ever open at once this file needs a list
//  of roles rather than one, and the page needs a card per role.
//
//  ── THE VOICE ──────────────────────────────────────────────────
//  Say what the work is. "Dynamic self-starter", "fast-paced
//  environment" and "wear many hats" filter for people who write like
//  that, which is the opposite of the filter we want — this role is
//  mostly writing to strangers who did not ask to hear from us.
//
//  ⚠ NO STIPEND FIGURE ON THIS PAGE. The form asks each applicant what
//  they expect per month, which only works while we have not already
//  named a number for them to repeat back.
// ────────────────────────────────────────────────────────────────

export const careers = {
  kicker: "Careers",
  /** Split so the page can accent the second half. */
  title: { lead: "We're hiring an", accent: "outreach & social media intern." },
  lede: "Someone to find the creators, talk to them, and keep our own channels alive while we do it. Paid internship, real briefs from day one — Delhi NCR is a plus, but the work travels.",

  /** The three-column block above the form. Each list is short on
   *  purpose: the form is three minutes of tick-boxes, and a page that
   *  says everything twice is a page nobody scrolls to the form on. */
  blocks: [
    {
      title: "What you'd actually do",
      points: [
        "Find the creators who fit a brief, and work out who's worth approaching",
        "Send the DMs and the emails — and chase the ones who go quiet",
        "Plan and post for our own handles, writing as us rather than as you",
        "Lay out posts and story frames in Canva, without waiting on a designer",
        "Keep the creator lists, outreach status and campaign numbers straight in Sheets",
        "Influencer and market research for campaigns we're about to pitch",
      ],
    },
    {
      title: "What we're looking for",
      points: [
        "You can start a conversation with a stranger and survive the first 'no reply'",
        "You write like a person — a DM that reads like a template gets ignored",
        "Canva well enough to make something look decent on your own",
        "A spreadsheet with 300 rows makes you curious, not tired",
        "No agency experience needed: a page you've run counts for more",
      ],
    },
    {
      title: "The deal",
      points: [
        // The form asks each applicant what they expect per month. The
        // page used to say so too, which put money in front of the
        // reader before the work had.
        "Paid internship",
        "Real accounts, real creators, real briefs from day one",
        "Delhi NCR is a plus; if you're good and you're elsewhere, apply anyway",
        "Open-ended, and it turns into something longer if you're good",
        "Three minutes to apply, mostly tick-boxes. Shortlist hears from us on WhatsApp",
      ],
    },
  ],

  form: {
    /** Responder URL. See both warnings at the top of this file. */
    url: "https://docs.google.com/forms/d/156i_kRH_zaqmvksn6jMBHY8luNPcU16Vywcwcu2ij2E/viewform",
    /* The page has one CTA now — "Apply now" in the hero, straight to
       this URL. It had a heading, a line of copy and a second button
       under the cards; all three said what the cards already say, and a
       page that repeats itself on the way to a click is a page people
       stop reading. The label lives in the component, since it is the
       only one left. */
  },
} as const;
