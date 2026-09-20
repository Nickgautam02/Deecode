#!/usr/bin/env python3
"""Build the PowerPoint version of the case-study deck.

    pip install python-pptx
    python3 scripts/build-pptx.py [out.pptx]

Default output: ~/Downloads/Deecode-Case-Studies.pptx

── WHY THIS EXISTS RATHER THAN A HAND-BUILT .pptx ──────────────────
The deck already lives at /netflix-case-studies, and its every figure
lives in content/netflix-case-studies.ts. A PowerPoint typed out by
hand would be a second copy of those numbers, and the moment anyone
corrected a figure on the site the two would disagree — with the
disagreement sitting in the file that gets emailed to clients.

So this script does not contain the content. It shells out to node,
imports that same TypeScript module (Node 23+ strips the types on its
own, and the content file imports nothing, so no bundler is needed)
and lays out whatever comes back. Edit the content file; re-run this.

── THE DESIGN ──────────────────────────────────────────────────────
Mirrors the site's own palette and type, the same one the web deck
and the rest of deecodemediahouse.com use: dark ground, violet
accent, Montserrat for display and Inter for body.

It also mirrors `.slide-feature` in app/globals.css: the four slides of
the proof section flip to a BASE ground with a solid section tab, so
the case studies read as a marked-off block rather than as three more
slides. Two colours cannot simply carry over to that ground — the
site's muted grey drops to 2.6:1 on it and the violet to 3.1:1 — so
`Ink` below holds both grounds' values together and a slide only has
to say which one it is on.

── FONTS ───────────────────────────────────────────────────────────
python-pptx can name a font but cannot embed one, so a machine
without Montserrat and Inter installed will silently substitute and
the deck will not look like the website. Install them first:

    python3 scripts/build-pptx.py --install-fonts

That downloads the variable fonts from the google/fonts repo and
instances static Regular and Bold cuts into ~/Library/Fonts. Static
cuts matter: PowerPoint handles a variable font by using its default
instance and synthesising a fake bold, which on a deck this heavy
looks wrong on every slide.
"""

import json
import subprocess
import sys
from pathlib import Path

from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_CONNECTOR, MSO_SHAPE
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.util import Emu, Inches, Pt

REPO = Path(__file__).resolve().parent.parent

# ── The deck's palette — the light side of the site's own tokens,
#    matching `.deck-light` in app/globals.css. `--foreground` is the
#    ground, `--background` is the type, the violet is unchanged.
FG = RGBColor(0x08, 0x08, 0x0A)
MUTED = RGBColor(0x5F, 0x5F, 0x58)          # 5.8:1 on this ground
ACCENT = RGBColor(0x87, 0x7B, 0xF2)         # 3.1:1 — display sizes only
ACCENT_STRONG = RGBColor(0x5A, 0x4E, 0xCC)  # 5.6:1 — labels, ticks, icons
GROUND = RGBColor(0xF4, 0xF4, 0xF0)
CARD = RGBColor(0xE8, 0xE8, 0xE2)
LINE = RGBColor(0xD2, 0xD2, 0xCC)

# The case-study run steps the page down and the cards up, so the
# surfaces swap places relative to every other slide. That plus the
# solid section tab is what marks the proof section now that the whole
# deck is one ground. Mirrors `.deck-light .slide-feature`.
GROUND_F = RGBColor(0xEA, 0xE9, 0xE3)
CARD_F = RGBColor(0xF6, 0xF6, 0xF2)
LINE_F = RGBColor(0xCB, 0xCA, 0xC4)


class Ink:
    """The colours a slide draws with. Every slide function takes one
    rather than reaching for a module-level colour, so putting a slide
    in the feature run is a single argument and no slide can end up
    half-and-half."""

    def __init__(self, feature=False):
        self.feature = feature
        self.fg = FG
        self.muted = MUTED
        self.accent = ACCENT
        self.strong = ACCENT_STRONG
        self.ground = GROUND_F if feature else GROUND
        self.card = CARD_F if feature else CARD
        self.line = LINE_F if feature else LINE


BASE, FEATURE = Ink(), Ink(feature=True)

RULE = Pt(0.75)  # the site's hairline rule

DISPLAY = "Montserrat"  # headings and figures
BODY = "Inter"          # everything else

RULE = Pt(0.75)  # the site's hairline rule

# 16:9, the only sane shape for a deck that was designed full-bleed.
W, H = Inches(13.333), Inches(7.5)
MARGIN = Inches(0.78)
CONTENT_W = W - 2 * MARGIN


# ── Fonts ───────────────────────────────────────────────────────────
# The variable fonts, as google/fonts publishes them. Instanced rather
# than installed as-is: PowerPoint renders a variable font at its
# default instance and fakes the bold, which on a deck set almost
# entirely in bold looks wrong on every slide.
FONT_SOURCES = {
    "Montserrat": "ofl/montserrat/Montserrat%5Bwght%5D.ttf",
    "Inter": "ofl/inter/Inter%5Bopsz%2Cwght%5D.ttf",
}
FONT_DIR = Path.home() / "Library" / "Fonts"
GF_RAW = "https://raw.githubusercontent.com/google/fonts/main/"


def install_fonts():
    """Download each family and instance static Regular and Bold into
       the user font directory. Safe to re-run; it overwrites its own
       files and touches nothing else."""
    import urllib.request
    from fontTools.ttLib import TTFont
    from fontTools.varLib import instancer

    FONT_DIR.mkdir(parents=True, exist_ok=True)
    for family, path in FONT_SOURCES.items():
        raw = urllib.request.urlopen(GF_RAW + path).read()
        tmp = Path(f"/tmp/{family}-VF.ttf")
        tmp.write_bytes(raw)
        for wght, sub, macbold in ((400, "Regular", 0), (700, "Bold", 1)):
            f = TTFont(tmp)
            axes = {a.axisTag for a in f["fvar"].axes}
            # Pin every axis, not just weight — Inter carries an optical
            # size axis too, and leaving one free keeps the font variable.
            loc = {"wght": wght}
            if "wdth" in axes:
                loc["wdth"] = 100
            if "opsz" in axes:
                loc["opsz"] = 14
            instancer.instantiateVariableFont(f, loc, inplace=True)
            full = family if sub == "Regular" else f"{family} {sub}"
            ps = f"{family}-{sub}"
            for nid, val in ((1, family), (2, sub), (3, f"{ps};instanced"),
                             (4, full), (6, ps), (16, family), (17, sub)):
                f["name"].setName(val, nid, 3, 1, 0x409)
                f["name"].setName(val, nid, 1, 0, 0)
            f["OS/2"].usWeightClass = wght
            f["OS/2"].fsSelection = (
                (f["OS/2"].fsSelection & ~0x61) | (0x20 if macbold else 0x40))
            f["head"].macStyle = macbold
            f.save(FONT_DIR / f"{ps}.ttf")
            print(f"  installed {ps}.ttf")
        tmp.unlink(missing_ok=True)
    print(f"-> {FONT_DIR}")


def content():
    """The deck's content and the site's own figures, straight out of
       the TypeScript modules. Neither is retyped here — the whole point
       of shelling out to node is that this file holds no copy."""
    js = (
        "Promise.all(["
        "  import('./content/netflix-case-studies.ts'),"
        "  import('./content/site.ts')"
        "]).then(([d, s]) => process.stdout.write(JSON.stringify("
        "  { deck: d.netflixCaseStudies, site: s.site })))"
    )
    out = subprocess.run(
        ["node", "--input-type=module", "-e", js],
        cwd=REPO, capture_output=True, text=True, check=True,
    )
    return json.loads(out.stdout)


def textbox(slide, x, y, w, h, anchor=MSO_ANCHOR.TOP):
    box = slide.shapes.add_textbox(x, y, w, h)
    frame = box.text_frame
    frame.word_wrap = True
    frame.vertical_anchor = anchor
    frame.margin_left = frame.margin_right = 0
    frame.margin_top = frame.margin_bottom = 0
    return frame


def write(frame, runs, size, color=FG, bold=False, track=None,
          line=1.15, para=None, align=PP_ALIGN.LEFT, after=0,
          display=False):
    """Set one paragraph. `runs` is a string, or (text, colour) pairs so
       a headline can carry its accent clause without a second box.

       `display` picks Montserrat over Inter — headings and figures,
       matching `font-display` on the web deck. Everything else is body
       text and stays on Inter.

       A run is (text, colour) or (text, colour, size) — the third
       element is for the cases where one line mixes scales, like a big
       figure with a small unit label beside it. Without it both runs
       take `size` and the unit comes out as tall as the number.

       `track` is letter-spacing in em, exactly as the Tailwind classes
       on the web deck express it. Passing raw points instead is how an
       earlier version tracked labels at roughly twice the design value:
       the same number was being reused across 8pt labels and 48pt
       headlines, where the design means 0.06em and -0.02em."""
    p = frame.add_paragraph() if para else frame.paragraphs[0]
    p.alignment = align
    p.line_spacing = line
    if after:
        p.space_after = Pt(after)
    for run in ([(runs, color)] if isinstance(runs, str) else runs):
        text, run_color = run[0], run[1]
        run_size = run[2] if len(run) > 2 else size
        r = p.add_run()
        r.text = text
        r.font.size = Pt(run_size)
        r.font.bold = bold
        r.font.name = DISPLAY if display else BODY
        r.font.color.rgb = run_color
        if track is not None:
            # No python-pptx API for letter-spacing; `spc` on the run's
            # rPr is in 1/100 pt. The system leans on tracked-out labels,
            # so dropping it would lose much of the look.
            r.font._rPr.set("spc", str(int(track * run_size * 100)))
    return p


def rule(slide, x, y, w, ink=BASE):
    ln = slide.shapes.add_connector(MSO_CONNECTOR.STRAIGHT, x, y, x + w, y)
    ln.line.color.rgb = ink.line
    ln.line.width = RULE
    return ln


def box(slide, x, y, w, h, ink=BASE, fill=None, stroke=True):
    shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, x, y, w, h)
    shape.fill.solid()
    shape.fill.fore_color.rgb = ink.card if fill is None else fill
    if stroke:
        shape.line.color.rgb = ink.line
        shape.line.width = RULE
    else:
        # A solid block is its own edge — the section tab wore a rule
        # around it and read as an outlined button.
        shape.line.fill.background()
    shape.shadow.inherit = False  # the system is flat; kill the default
    return shape


def new_slide(prs, ink=BASE):
    slide = prs.slides.add_slide(prs.slide_layouts[6])  # blank
    bg = slide.background.fill
    bg.solid()
    bg.fore_color.rgb = ink.ground
    return slide


def kicker(slide, y, text, ink=BASE):
    f = textbox(slide, MARGIN, y, CONTENT_W, Inches(0.26))
    write(f, text.upper(), 11, ink.strong, bold=True, track=0.08)
    return y + Inches(0.34)


def section_tab(slide, y, text, ink):
    """The solid marker on the proof slides. Ground-on-accent, because
       at this size the label needs the contrast the filled block
       gives it — and a filled block is the system's own idiom."""
    w = Inches(0.085) * len(text) + Inches(0.34)
    box(slide, MARGIN, y, w, Inches(0.3), ink, fill=ink.strong, stroke=False)
    f = textbox(slide, MARGIN, y, w, Inches(0.3), MSO_ANCHOR.MIDDLE)
    write(f, text.upper(), 10, ink.ground, bold=True, track=0.08,
          align=PP_ALIGN.CENTER)
    return y + Inches(0.46)


def cards(slide, items, top, height, ink, num=True, name_pt=15, body_pt=9.5,
          gap=Inches(0.2)):
    """The card row used by the argument, the services, the process and
       the closing steps — four slides that were four near-identical
       loops before this existed."""
    n = len(items)
    cw = (CONTENT_W - gap * (n - 1)) / n
    for i, item in enumerate(items):
        x = MARGIN + (cw + gap) * i
        box(slide, x, top, cw, height, ink)
        pad = Inches(0.22)
        if num:
            f = textbox(slide, x + pad, top + pad, cw, Inches(0.22))
            write(f, item.get("num", f"{i + 1:02d}"), 9, ink.strong,
                  bold=True, track=0.06)
        f = textbox(slide, x + pad, top + Inches(0.58), cw - pad*2, Inches(0.4))
        write(f, item["name"], name_pt, ink.fg, bold=True, track=-0.01,
              display=True)
        f = textbox(slide, x + pad, top + Inches(1.02), cw - pad*2, Inches(1.5))
        write(f, item["text"], body_pt, ink.muted, line=1.4)


def figures(slide, x, y, w, items, value_pt, ink=BASE, cols=3,
            gap_y=Inches(0.92)):
    """The stat grid. Returns the y below the last row."""
    col_w = (w - Inches(0.3) * (cols - 1)) / cols
    for i, item in enumerate(items):
        cx = x + (col_w + Inches(0.3)) * (i % cols)
        cy = y + gap_y * (i // cols)
        f = textbox(slide, cx, cy, col_w, Inches(0.5))
        write(f, item["value"], value_pt, ink.accent, bold=True, track=-0.02,
              line=0.95, display=True)
        lf = textbox(slide, cx, cy + Pt(value_pt * 0.95), col_w, Inches(0.3))
        write(lf, item["label"].upper(), 8.5, ink.muted, bold=True,
              track=0.06, line=1.2)
    rows = (len(items) + cols - 1) // cols
    return y + gap_y * rows


def footer_note(slide, y, text, width=None, ink=BASE):
    rule(slide, MARGIN, y, width or CONTENT_W, ink)
    f = textbox(slide, MARGIN, y + Inches(0.18), width or CONTENT_W, Inches(0.9))
    write(f, text, 10, ink.muted, line=1.45)


# ── Slides ─────────────────────────────────────────────────────────

def cover(prs, deck):
    s = new_slide(prs)
    y = kicker(s, Inches(1.9), deck["cover"]["kicker"])
    f = textbox(s, MARGIN, y + Inches(0.12), Inches(10.6), Inches(2.4))
    write(f, [(deck["cover"]["headline"]["lead"] + " ", FG),
              (deck["cover"]["headline"]["accent"], ACCENT),
              (".", FG)], 48, bold=True, track=-0.02, line=1.02,
          display=True)
    f = textbox(s, MARGIN, Inches(4.3), Inches(8.2), Inches(1.1))
    write(f, deck["cover"]["lede"], 13.5, MUTED, line=1.5)

    rule(s, MARGIN, Inches(5.95), CONTENT_W)
    x = MARGIN
    for case in deck["cases"]:
        w = Inches(0.26) * len(case["label"]) * 0.42 + Inches(0.5)
        box(s, x, Inches(6.2), w, Inches(0.42), fill=GROUND)
        f = textbox(s, x, Inches(6.2), w, Inches(0.42), MSO_ANCHOR.MIDDLE)
        write(f, case["label"], 10.5, FG, bold=True, align=PP_ALIGN.CENTER)
        x += w + Inches(0.14)


def the_case(prs, deck):
    """The argument: three cast sizes, three problems."""
    c = deck["theCase"]
    s = new_slide(prs)
    y = kicker(s, Inches(0.95), c["kicker"])
    f = textbox(s, MARGIN, y, Inches(10), Inches(1.2))
    write(f, c["title"], 34, FG, bold=True, track=-0.02, line=1.05,
          display=True)
    f = textbox(s, MARGIN, Inches(2.45), Inches(10.6), Inches(0.9))
    write(f, c["intro"], 12.5, MUTED, line=1.5)

    shapes = [{"name": x["name"], "text": x["text"], "num": x["cast"]}
              for x in c["shapes"]]
    top, h = Inches(3.6), Inches(2.25)
    n = len(shapes); gap = Inches(0.2)
    cw = (CONTENT_W - gap * (n - 1)) / n
    for i, item in enumerate(shapes):
        x = MARGIN + (cw + gap) * i
        box(s, x, top, cw, h)
        f = textbox(s, x + Inches(0.22), top + Inches(0.2), cw, Inches(0.5))
        write(f, [(item["num"], ACCENT), ("  CREATORS", MUTED, 9.5)], 26,
              bold=True, track=-0.02, line=1.0, display=True)
        f = textbox(s, x + Inches(0.22), top + Inches(0.78),
                    cw - Inches(0.44), Inches(0.34))
        write(f, item["name"], 14, FG, bold=True, track=-0.01)
        f = textbox(s, x + Inches(0.22), top + Inches(1.18),
                    cw - Inches(0.44), Inches(1.0))
        write(f, item["text"], 9.5, MUTED, line=1.4)
    footer_note(s, Inches(6.15), c["closer"], Inches(10.6))


def what_we_do(prs, deck):
    w = deck["whatWeDo"]
    s = new_slide(prs)
    y = kicker(s, Inches(1.0), w["kicker"])
    f = textbox(s, MARGIN, y, Inches(10), Inches(1.2))
    write(f, w["title"], 34, FG, bold=True, track=-0.02, line=1.05,
          display=True)
    cards(s, w["services"], Inches(3.0), Inches(2.5), BASE, name_pt=17)
    footer_note(s, Inches(6.0), w["note"], Inches(10))


def glance(prs, deck):
    """Opens THE WORK — section tab, totals, and the de-duplication
       caveat that a media buyer would otherwise have to ask for."""
    g = deck["glance"]
    s = new_slide(prs, FEATURE)
    y = section_tab(s, Inches(0.8), deck["work"]["sectionLabel"], FEATURE)
    y = kicker(s, y, g["kicker"], FEATURE)
    f = textbox(s, MARGIN, y, Inches(9), Inches(1.2))
    write(f, g["title"], 34, FEATURE.fg, bold=True, track=-0.02,
          line=1.05, display=True)
    end = figures(s, MARGIN, Inches(3.0), CONTENT_W, g["stats"], 38, FEATURE,
                  cols=3, gap_y=Inches(1.4))
    footer_note(s, end + Inches(0.1), g["footnote"], Inches(10.4), FEATURE)


def case_slide(prs, deck, case, index):
    s = new_slide(prs, FEATURE)
    ink = FEATURE
    left_w = Inches(4.9)
    right_x = MARGIN + left_w + Inches(0.75)
    right_w = W - MARGIN - right_x

    y = Inches(0.8)
    tab = f"{deck['work']['caseLabel']} {index + 1:02d} / {len(deck['cases']):02d}"
    y = section_tab(s, y, tab, ink)
    f = textbox(s, MARGIN, y, left_w, Inches(0.26))
    write(f, case["kicker"].upper(), 10.5, ink.strong, bold=True, track=0.08)
    f = textbox(s, MARGIN, y + Inches(0.34), left_w, Inches(1.4))
    write(f, case["title"], 23, ink.fg, bold=True, track=-0.02, line=1.08,
          display=True)
    f = textbox(s, MARGIN, y + Inches(1.5), left_w, Inches(1.4))
    write(f, case["overview"], 10.5, ink.muted, line=1.5)

    brief_y = Inches(4.35)
    rule(s, MARGIN, brief_y, left_w, ink)
    f = textbox(s, MARGIN, brief_y + Inches(0.16), left_w, Inches(0.24))
    write(f, "THE BRIEF", 8.5, ink.muted, bold=True, track=0.06)
    # One box, one paragraph per goal — a text box per goal at a fixed
    # step puts a wrapped second line on top of the next goal.
    f = textbox(s, MARGIN, brief_y + Inches(0.46), left_w, Inches(2.3))
    for i, goal in enumerate(case["goals"]):
        write(f, [("\u2713   ", ink.strong), (goal, ink.fg)], 10.5,
              line=1.3, para=i, after=5)

    box(s, right_x, Inches(0.8), right_w, Inches(1.95), ink)
    f = textbox(s, right_x + Inches(0.35), Inches(0.97), right_w, Inches(1.0))
    write(f, case["hero"]["value"], 52, ink.accent, bold=True, track=-0.03,
          line=0.95, display=True)
    f = textbox(s, right_x + Inches(0.35), Inches(1.9), right_w, Inches(0.3))
    write(f, case["hero"]["label"].upper(), 11, ink.fg, bold=True,
          track=0.08, display=True)
    f = textbox(s, right_x + Inches(0.35), Inches(2.2), right_w - Inches(0.6),
                Inches(0.3))
    write(f, case["hero"]["sub"], 10, ink.muted)

    end = figures(s, right_x, Inches(3.15), right_w, case["results"], 26, ink,
                  cols=3, gap_y=Inches(0.95))

    y = end + Inches(0.2)
    if case.get("impact"):
        rule(s, right_x, y, right_w, ink)
        f = textbox(s, right_x, y + Inches(0.16), right_w, Inches(0.24))
        write(f, "BUSINESS IMPACT", 8.5, ink.muted, bold=True, track=0.06)
        col_w = (right_w - Inches(0.6)) / 3
        for i, item in enumerate(case["impact"]):
            cx = right_x + (col_w + Inches(0.3)) * i
            f = textbox(s, cx, y + Inches(0.5), col_w, Inches(0.42))
            write(f, item["value"], 20, ink.fg, bold=True, track=-0.02,
                  line=0.95, display=True)
            f = textbox(s, cx, y + Inches(0.86), col_w, Inches(0.4))
            write(f, item["label"].upper(), 8, ink.muted, bold=True,
                  track=0.06, line=1.2)
    elif case.get("note"):
        rule(s, right_x, y, right_w, ink)
        f = textbox(s, right_x, y + Inches(0.18), right_w, Inches(1.0))
        write(f, case["note"], 10.5, ink.muted, line=1.45)


def process(prs, deck):
    p = deck["process"]
    s = new_slide(prs)
    y = kicker(s, Inches(1.0), p["kicker"])
    f = textbox(s, MARGIN, y, Inches(9), Inches(1.2))
    write(f, p["title"], 34, FG, bold=True, track=-0.02, line=1.05,
          display=True)
    cards(s, p["steps"], Inches(2.95), Inches(2.6), BASE)


def why_us(prs, deck, stats, brands):
    w = deck["whyUs"]
    s = new_slide(prs)
    y = kicker(s, Inches(0.95), w["kicker"])
    f = textbox(s, MARGIN, y, Inches(9), Inches(1.2))
    write(f, w["title"], 34, FG, bold=True, track=-0.02, line=1.05,
          display=True)

    rule(s, MARGIN, Inches(2.65), CONTENT_W)
    figures(s, MARGIN, Inches(2.9), CONTENT_W, stats, 36, BASE, cols=3)
    rule(s, MARGIN, Inches(3.95), CONTENT_W)

    col_w = (CONTENT_W - Inches(0.6)) / 3
    for i, point in enumerate(w["points"]):
        x = MARGIN + (col_w + Inches(0.3)) * i
        f = textbox(s, x, Inches(4.25), col_w, Inches(0.32))
        write(f, point["name"], 13, FG, bold=True, track=-0.01, display=True)
        f = textbox(s, x, Inches(4.62), col_w, Inches(1.2))
        write(f, point["text"], 9.5, MUTED, line=1.45)

    rule(s, MARGIN, Inches(5.95), CONTENT_W)
    f = textbox(s, MARGIN, Inches(6.15), CONTENT_W, Inches(0.24))
    write(f, w["brandsLabel"].upper(), 8.5, MUTED, bold=True, track=0.06)
    f = textbox(s, MARGIN, Inches(6.48), Inches(11.4), Inches(0.6))
    write(f, "  \u00b7  ".join(brands), 10.5, FG, bold=True, line=1.5)


def close(prs, deck, site):
    c = deck["close"]
    s = new_slide(prs)
    y = kicker(s, Inches(0.85), c["kicker"])
    f = textbox(s, MARGIN, y, Inches(10.4), Inches(1.6))
    write(f, [(c["headline"]["lead"] + " ", FG),
              (c["headline"]["accent"], ACCENT), (".", FG)],
          34, bold=True, track=-0.02, line=1.05, display=True)
    f = textbox(s, MARGIN, Inches(2.6), Inches(9), Inches(0.7))
    write(f, c["lede"], 12, MUTED, line=1.5)

    f = textbox(s, MARGIN, Inches(3.35), CONTENT_W, Inches(0.24))
    write(f, deck["howWeStart"]["kicker"].upper(), 8.5, MUTED, bold=True,
          track=0.06)
    cards(s, deck["howWeStart"]["steps"], Inches(3.7), Inches(2.1), BASE,
          name_pt=15)

    rule(s, MARGIN, Inches(6.05), CONTENT_W)
    f = textbox(s, MARGIN, Inches(6.25), CONTENT_W, Inches(0.3))
    write(f, "     ".join([site["email"],
                           f"WhatsApp {site['phone']}",
                           site["domain"]]), 11.5, FG, bold=True)
    f = textbox(s, MARGIN, Inches(6.75), CONTENT_W, Inches(0.3))
    write(f, f"{site['name']} \u00b7 {site['tagline']} \u00b7 CONFIDENTIAL".upper(),
          8.5, MUTED, bold=True, track=0.06)


def main():
    if "--install-fonts" in sys.argv:
        install_fonts()
        return

    data = content()
    deck, site = data["deck"], data["site"]

    # ⚠ THE VIEWS STAT IS DROPPED ON PURPOSE. content/site.ts says "10M+
    # views generated" and the proof section of this very deck sums to
    # 53M+ — printing both is a contradiction a reader finds instantly.
    # The web deck filters the same stat the same way. Fix the homepage
    # figure and both filters can go.
    stats = [{"value": f"{x['value']}{x['suffix']}", "label": x["label"]}
             for x in site["stats"] if "views" not in x["label"].lower()]

    prs = Presentation()
    prs.slide_width, prs.slide_height = Emu(int(W)), Emu(int(H))

    # ⚠ THIS ORDER IS THE ARGUMENT, and it must match the web deck's.
    # Standing, then the offer, then the proof as a marked-off block,
    # then what the proof means, then how we would run it, then the ask.
    #
    # The pattern slide sits AFTER the case studies, not before. It
    # opened the deck once, and made its cast-size argument out of three
    # campaigns the reader had not met — spoiling the proof, which then
    # repeated it. See the header of content/netflix-case-studies.ts.
    cover(prs, deck)
    why_us(prs, deck, stats, site["brands"])
    what_we_do(prs, deck)
    glance(prs, deck)                     # opens THE WORK, feature ground
    for i, case in enumerate(deck["cases"]):
        case_slide(prs, deck, case, i)    # feature ground
    the_case(prs, deck)                   # the pattern, as a conclusion
    process(prs, deck)
    close(prs, deck, site)

    out = Path(sys.argv[1]) if len(sys.argv) > 1 else (
        Path.home() / "Downloads" / "Deecode-Pitch-Deck.pptx")
    prs.save(out)
    print(f"{len(prs.slides)} slides -> {out}")


if __name__ == "__main__":
    main()
