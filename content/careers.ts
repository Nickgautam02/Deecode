// ────────────────────────────────────────────────────────────────
//  CAREERS — everything rendered at /careers.
//
//  ── THE APPLICATION FORM LIVES OUTSIDE THIS REPO ───────────────
//  Applications go to a Google Form Nikhil owns and edits by hand; no
//  part of it is in git, and nothing here can change a question on it.
//  This page is a wrapper: the pitch in the site's own voice, then the
//  form embedded as-is.
//
//  ⚠ USE THE /forms/d/e/… RESPONDER URL BELOW, NOT THE /forms/d/<id>/edit
//  ONE. The edit URL opens the form BUILDER, and anyone not signed in as
//  Nikhil gets a permission wall instead of an application. The two ids
//  are different strings for the same form — the long `1FAIpQLSe…` one
//  is the public face of it.
//
//  If the form is ever rebuilt, it is rebuilt IN PLACE by id so this URL
//  keeps working. A brand-new form means a new responder id and a dead
//  embed here, with no error to notice — the page would simply show
//  Google's "file not found" inside the frame.
//
//  ── THE VOICE ──────────────────────────────────────────────────
//  The form opens "Are you camera-friendly, full of energy, spontaneous,
//  and slightly unpredictable (in the best way)?" and says outright: no
//  boring, rehearsed influencer vibes. This page has to sound like the
//  same people wrote it. Corporate-HR copy here — "we are seeking a
//  dynamic individual" — would filter for exactly the applicants the
//  role does not want, and they would meet the form's tone one click
//  later and know something was off.
//
//  ⚠ NO STIPEND FIGURE ON THIS PAGE. The form asks each applicant what
//  they expect to be paid per month, which only works while we have not
//  already named a number for them to repeat back.
// ────────────────────────────────────────────────────────────────

export const careers = {
  kicker: "Careers",
  /** Split so the page can accent the second half. */
  title: { lead: "We're hiring one", accent: "crazy content creator." },
  lede: "Camera-friendly, spontaneous, slightly unpredictable — the kind of person who can walk into a crowd with a mic and come back with a reel. Paid internship, on camera and in the field from day one.",

  /** The three-column block above the form. Each list is short on
   *  purpose: the form itself runs to six sections, and a page that
   *  says everything twice is a page nobody scrolls to the form on. */
  blocks: [
    {
      title: "Who we're looking for",
      points: [
        "Lively, confident, funny — personality over polish",
        "Not afraid to talk to strangers or try something ridiculous in public",
        "Understands shooting, framing and angles well enough to stop a thumb",
        "Shoots and edits your own reels, or close to it",
        "Based in Delhi NCR — the shoots happen out on the street, so you need to be here",
      ],
    },
    {
      title: "What the role is",
      points: [
        "A paid internship with Deecode Media House",
        "On camera and in the field making reels from day one — not fetching coffee",
        "Open-ended, and it turns into something longer if you're good",
        "You tell us the monthly stipend you're expecting",
      ],
    },
    {
      title: "Before you start",
      points: [
        "Have a link ready to a reel you are ON camera in, talking",
        "That single link matters more than everything else in the form",
        "The form takes about six minutes",
        "Shortlisted creators hear from us on WhatsApp",
      ],
    },
  ],

  form: {
    /** Public responder URL. See the warning at the top of this file. */
    url: "https://docs.google.com/forms/d/e/1FAIpQLSeudllGZq1ZCMTWGEua0ZoBrlQh4atwHGXhiYAOG7CTZqv3MA/viewform",
    heading: "Apply",
    /** Shown beside the embed, for anyone whose browser blocks the
     *  frame — third-party frame blocking is common enough on mobile
     *  that a page with no way out of it loses those applicants. */
    fallback: "Form not loading? Open it in a new tab",
  },
} as const;
