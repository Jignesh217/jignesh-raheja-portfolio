/**
 * Scroll-driven parkour engine.
 *
 * Scroll = time. A free-runner crosses a city skyline, and the crossing IS the
 * portfolio: five acts — Who I Am, What I Build, Selected Work, How I Think,
 * Let's Work Together — each a district with discovered, in-world content.
 *
 * Movement is purposeful, never a trick reel. The athlete only does what the
 * terrain demands: a precision jump across a narrow gap, a kong vault over an
 * obstacle, a wall-run up a tower too tall to leap, a roll to absorb a hard
 * drop, a slide under an overhang, a ledge climb onto a higher roof. Each move
 * has a loaded takeoff, a believable arc, and a landing that compresses then
 * recovers into stride.
 *
 * A biomechanical gait drives the run; forward kinematics turns pose into
 * joints; a filled-silhouette builder turns joints into one smooth hooded body.
 */

export type Skill =
  | "run"
  | "precision" // controlled hop across a narrow gap, arms out for balance
  | "leap" // committed running jump across a wide gap
  | "vault" // kong/speed vault over an obstacle
  | "wallrun" // run up a wall too tall to leap, kick to the ledge
  | "roll" // absorb a hard drop with a forward shoulder roll
  | "slide" // duck under an overhang
  | "climb"; // ledge grab + mantle onto a higher roof

export type Prop = "none" | "box" | "crates" | "drum" | "generator" | "overhang" | "antenna" | "ac";

export type FeatureKind =
  | "plaque" // identity / closing — engraved on the roof
  | "billboard" // a kind of work he builds
  | "screen" // a project, shown like a live monitor
  | "blueprint" // process / how a project was solved
  | "graffiti"; // a belief, sprayed on a wall

export interface Feature {
  kind: FeatureKind;
  title: string;
  body?: string;
  tag?: string;
}

interface Seg {
  kind: "building" | "gap";
  w: number;
  elev: number; // rooftop elevation (px above base); for gaps = landing elev
  prop: Prop;
  skill: Skill;
  actNo?: string; // "01" — present on the first building of an act
  actTitle?: string; // "Who I am" — announced as a district title-card
  feature?: Feature; // discovered content sitting on this rooftop
}

/* ------------------------------- authoring -------------------------------- */
const B = (o: {
  elev: number;
  w: number;
  prop?: Prop;
  skill?: Skill;
  act?: { no: string; title: string };
  feature?: Feature;
}): Seg => ({
  kind: "building",
  w: o.w,
  elev: o.elev,
  prop: o.prop ?? "none",
  skill: o.skill ?? "run",
  actNo: o.act?.no,
  actTitle: o.act?.title,
  feature: o.feature,
});
const G = (o: { w: number; skill: Skill; elev: number }): Seg => ({
  kind: "gap",
  w: o.w,
  elev: o.elev,
  prop: "none",
  skill: o.skill,
});

/**
 * The world, authored as a journey. Elevations are chosen so the moves are
 * forced by the terrain: low→high needs a climb or wall-run, high→low needs a
 * roll, a narrow level gap is a precision jump, a wide one a committed leap.
 */
const WORLD: Seg[] = [
  /* ── ACT 1 · WHO I AM ─────────────────────────────────────────────────── */
  B({
    elev: 0,
    w: 3.4,
    act: { no: "01", title: "Who I am" },
    feature: {
      kind: "plaque",
      title: "Jignesh Raheja",
      body: "I build digital products that feel effortless.",
      tag: "Full-stack developer · product builder",
    },
  }),
  G({ w: 1.5, skill: "precision", elev: 18 }),
  B({
    elev: 18,
    w: 2.6,
    feature: {
      kind: "plaque",
      title: "Websites, web apps & AI tools",
      body: "Clear, fast, and genuinely worth remembering.",
      tag: "for founders who refuse to look generic",
    },
  }),

  /* ── ACT 2 · WHAT I BUILD ─────────────────────────────────────────────── */
  G({ w: 1.6, skill: "leap", elev: 18 }),
  B({
    elev: 18,
    w: 2.8,
    act: { no: "02", title: "What I build" },
    feature: {
      kind: "billboard",
      title: "Websites that earn trust",
      body: "Make people believe you before they ever pick up the phone.",
      tag: "marketing site",
    },
  }),
  G({ w: 1.4, skill: "precision", elev: 18 }),
  B({
    elev: 18,
    w: 2.6,
    prop: "crates",
    skill: "vault",
    feature: {
      kind: "billboard",
      title: "Web apps that feel simple",
      body: "Real architecture underneath, an interface people enjoy using.",
      tag: "saas / dashboards",
    },
  }),
  G({ w: 1.7, skill: "wallrun", elev: 92 }),
  B({
    elev: 92,
    w: 2.8,
    prop: "antenna",
    feature: {
      kind: "billboard",
      title: "AI tools that make sense",
      body: "Remove busywork instead of adding noise. The magic feels obvious.",
      tag: "llm features",
    },
  }),
  G({ w: 1.7, skill: "roll", elev: 24 }),
  B({
    elev: 24,
    w: 2.8,
    prop: "ac",
    feature: {
      kind: "billboard",
      title: "Redesigns that wake things up",
      body: "Dated and slow, turned modern, quick, and unmistakably yours.",
      tag: "rebuild",
    },
  }),

  /* ── ACT 3 · SELECTED WORK ────────────────────────────────────────────── */
  G({ w: 1.5, skill: "precision", elev: 24 }),
  B({
    elev: 24,
    w: 3.0,
    act: { no: "03", title: "Selected work" },
    feature: {
      kind: "screen",
      title: "The Quiet Dashboard",
      body: "Show the one number that changes a decision. Hide the rest until asked.",
      tag: "saas · concept",
    },
  }),
  G({ w: 2.2, skill: "climb", elev: 70 }),
  B({
    elev: 70,
    w: 3.0,
    feature: {
      kind: "screen",
      title: "First Impression",
      body: "Earn belief in the first three seconds — before a word is read.",
      tag: "brand site · concept",
    },
  }),
  G({ w: 1.7, skill: "leap", elev: 70 }),
  B({
    elev: 70,
    w: 3.0,
    prop: "generator",
    feature: {
      kind: "blueprint",
      title: "The Honest Machine",
      body: "Make every answer traceable — the magic stops feeling like a trick.",
      tag: "ai tool · concept",
    },
  }),
  G({ w: 1.8, skill: "roll", elev: 10 }),
  B({
    elev: 10,
    w: 3.0,
    prop: "overhang",
    skill: "slide",
    feature: {
      kind: "screen",
      title: "Common Ground",
      body: "One small system — type, space, rhythm — so everything finally agreed.",
      tag: "design system · concept",
    },
  }),

  /* ── ACT 4 · HOW I THINK ──────────────────────────────────────────────── */
  G({ w: 1.5, skill: "precision", elev: 10 }),
  B({
    elev: 10,
    w: 2.6,
    act: { no: "04", title: "How I think" },
    feature: {
      kind: "graffiti",
      title: "Good design disappears.",
      body: "If you notice it, it got in the way.",
    },
  }),
  G({ w: 1.4, skill: "vault", elev: 10 }),
  B({
    elev: 10,
    w: 2.6,
    prop: "drum",
    skill: "vault",
    feature: {
      kind: "graffiti",
      title: "Fast beats fancy.",
      body: "Nobody waits for a clever animation to load.",
    },
  }),
  G({ w: 1.6, skill: "wallrun", elev: 84 }),
  B({
    elev: 84,
    w: 2.6,
    feature: {
      kind: "graffiti",
      title: "Simple is the hard part.",
      body: "Subtraction is the most underrated skill there is.",
    },
  }),
  G({ w: 1.7, skill: "roll", elev: 20 }),
  B({
    elev: 20,
    w: 2.8,
    feature: {
      kind: "graffiti",
      title: "Experiences outlast features.",
      body: "People forget what you built. They remember how it felt.",
    },
  }),

  /* ── ACT 5 · LET'S WORK TOGETHER ──────────────────────────────────────── */
  G({ w: 2.2, skill: "climb", elev: 64 }),
  B({
    elev: 64,
    w: 3.6,
    act: { no: "05", title: "Let's work together" },
    feature: {
      kind: "plaque",
      title: "You made it to the top.",
      body: "Everything I build is meant to feel exactly like this — effortless, and worth the climb.",
      tag: "the proof & the conversation are just below ↓",
    },
  }),
];

const TOTAL = WORLD.reduce((s, b) => s + b.w, 0);

export interface Segment extends Seg {
  s: number; // start p
  e: number; // end p
  i: number;
  prevElev: number;
  nextElev: number;
}

export const segments: Segment[] = (() => {
  const out: Segment[] = [];
  let acc = 0;
  for (let i = 0; i < WORLD.length; i++) {
    const seg = WORLD[i];
    const s = acc / TOTAL;
    acc += seg.w;
    const prevElev = i > 0 ? WORLD[i - 1].elev : seg.elev;
    const nextElev = i < WORLD.length - 1 ? WORLD[i + 1].elev : seg.elev;
    out.push({ ...seg, i, s, e: acc / TOTAL, prevElev, nextElev });
  }
  return out;
})();

/** Act boundaries (start p of each act) for the atmosphere + title-cards. */
export const acts = segments
  .filter((s) => s.actTitle)
  .map((s) => ({ no: s.actNo!, title: s.actTitle!, s: s.s }));

function segAt(p: number) {
  const cp = Math.min(0.999999, Math.max(0, p));
  for (const sg of segments)
    if (cp >= sg.s && cp < sg.e) return { sg, t: (cp - sg.s) / (sg.e - sg.s) };
  const last = segments[segments.length - 1];
  return { sg: last, t: 1 };
}

/* ----------------------------- math helpers ------------------------------- */
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => t * t * (3 - 2 * t);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const para = (t: number) => 4 * t * (1 - t); // gravity parabola, peaks at t=0.5
const wrap = (a: number) => Math.atan2(Math.sin(a), Math.cos(a));
const gauss = (d: number, w: number) => Math.exp(-((d / w) * (d / w)));

/**
 * Real projectile motion. The runner leaves a roof at elevation `y0` and must
 * land on the next at `y1` exactly as it slides under him (normalised flight
 * time t = 0→1). Under constant gravity `g` (the "punch" of the take-off), the
 * launch velocity is fully determined — vy0 = (y1 − y0) + g/2 — so the arc is a
 * true parabola: it rises, decelerates to an apex, then *accelerates* down
 * (real gravity), landing precisely at y1. A bigger `g` is a snappier launch
 * and a faster fall. Returns the feet elevation and the signed vertical
 * velocity (>0 rising, <0 falling) so the body can react to where it is in the
 * arc rather than to a hand-tuned timeline.
 */
function ballistic(y0: number, y1: number, g: number) {
  const vy0 = y1 - y0 + g / 2;
  return {
    y: (t: number) => y0 + vy0 * t - 0.5 * g * t * t,
    vy: (t: number) => vy0 - g * t,
    impact: g - vy0, // downward speed at landing (t=1) — scales the absorb
  };
}

/* -------------------------------- the rig --------------------------------- */
export interface Pose {
  torso: number;
  head: number;
  auL: number;
  afL: number;
  auR: number;
  afR: number;
  luL: number;
  llL: number;
  luR: number;
  llR: number;
}

function legMech(φ: number) {
  const thigh = 40 * Math.cos(φ);
  const knee = 6 + 86 * gauss(wrap(φ - 4.7), 1.0) + 16 * gauss(wrap(φ), 0.6);
  return { thigh, shin: thigh - knee };
}
function armMech(φ: number) {
  const upper = -30 * Math.cos(φ);
  const elbow = 78 + 22 * Math.cos(φ);
  return { upper, fore: upper - elbow };
}
/** Continuous run gait. `lean` adds forward torso pitch (momentum). */
export function runPose(stride: number, lean = 0): Pose {
  const R = legMech(stride);
  const L = legMech(stride + Math.PI);
  const aR = armMech(stride + Math.PI);
  const aL = armMech(stride);
  return {
    torso: 180 - 17 - lean + 2.5 * Math.sin(stride),
    head: 180 - 21 - lean * 0.7 + 1.5 * Math.sin(2 * stride),
    auR: aR.upper,
    afR: aR.fore,
    auL: aL.upper,
    afL: aL.fore,
    luR: R.thigh,
    llR: R.shin,
    luL: L.thigh,
    llL: L.shin,
  };
}
function blend(a: Pose, b: Pose, t: number): Pose {
  const k = clamp(t);
  const o = {} as Pose;
  (Object.keys(a) as (keyof Pose)[]).forEach((key) => (o[key] = lerp(a[key], b[key], k)));
  return o;
}

/* Named poses — keyframes the moves blend through. */
// loaded crouch, weight back, arms cocked to spring
const COIL: Pose = { torso: 180 - 40, head: 180 - 46, auR: -36, afR: -96, auL: -40, afL: -100, luR: 50, llR: 120, luL: 54, llL: 124 };
// committed running-jump flight: legs split wide, arms thrown to drive & balance
const AIR: Pose = { torso: 180 - 16, head: 180 - 22, auR: -64, afR: -108, auL: 66, afL: 106, luR: 44, llR: 82, luL: -36, llL: 10 };
// precision flight: upright & balanced, arms thrown wide fore/aft like a
// rail-walker, knees lifted to tuck the feet up to the target
const PREC: Pose = { torso: 180 - 4, head: 180 - 10, auR: 94, afR: 100, auL: -94, afL: -100, luR: 40, llR: 80, luL: 32, llL: 66 };
// impact: deep knee absorb, torso forward, arms out to steady
const LAND: Pose = { torso: 180 - 32, head: 180 - 38, auR: -56, afR: -94, auL: 56, afL: 94, luR: 36, llR: 100, luL: -30, llL: 30 };
// tight ball for the roll
const TUCK: Pose = { torso: 180 - 30, head: 180 - 40, auR: 56, afR: 120, auL: 50, afL: 114, luR: 66, llR: 136, luL: 58, llL: 128 };
// kong vault: hands plant ahead, hips high, legs tuck through
const VAULT: Pose = { torso: 180 - 50, head: 180 - 56, auR: 98, afR: 98, auL: -54, afL: -80, luR: 76, llR: 142, luL: 68, llL: 134 };
// slide: reclined, body low, lead leg extended, trail leg folded
const SLIDE: Pose = { torso: 180 - 70, head: 180 - 76, auR: -118, afR: -150, auL: -110, afL: -142, luR: 80, llR: 66, luL: 92, llL: 80 };
// reach: extension at the top of a jump, arms up to catch a ledge
const REACH: Pose = { torso: 180 - 6, head: 180 - 12, auR: 150, afR: 158, auL: 142, afL: 150, luR: 20, llR: 44, luL: 8, llL: 24 };
// brace: falling fast, legs reaching down to meet the ground, arms out to balance
const BRACE: Pose = { torso: 180 - 8, head: 180 - 14, auR: -44, afR: -64, auL: 44, afL: 64, luR: 16, llR: 30, luL: -12, llL: 16 };
// dead hang: both hands gripping the ledge overhead, body hanging, legs loaded
const HANG: Pose = { torso: 180 + 3, head: 180 + 7, auR: 171, afR: 176, auL: 189, afL: 184, luR: 14, llR: 40, luL: -8, llL: 18 };
// dive: body thrown near-horizontal off the edge, arms reaching down, legs
// trailing high behind — the committed entry into a roll
const DIVE: Pose = { torso: 180 - 58, head: 180 - 64, auR: 104, afR: 118, auL: 92, afL: 106, luR: -34, llR: -66, luL: -44, llL: -76 };

export interface Sample {
  skill: Skill;
  lift: number; // feet height above base (foot screen-y = baseY - lift)
  ground: number; // rooftop height under the runner (for the planted shadow)
  rot: number;
  scaleX: number;
  pose: Pose;
}

export function sample(p: number): Sample {
  const { sg, t } = segAt(p);
  const stride = p * Math.PI * 2 * 30;
  let lift = sg.elev;
  let ground = sg.elev;
  let rot = 0;
  let scaleX = 1;
  let pose = runPose(stride);
  let skill: Skill = "run";

  if (sg.kind === "gap") {
    skill = sg.skill;
    const y0 = sg.prevElev;
    const y1 = sg.nextElev;
    const drop = y0 - y1; // +ve = descending

    if (skill === "wallrun") {
      // momentum carries the runner up a sheer wall; gravity bleeds it off
      // (a decelerating rise), then a kick converts what's left into the mantle.
      ground = y0;
      const top = y1 + 14;
      if (t < 0.14) {
        pose = runPose(stride, 8);
        lift = y0;
      } else if (t < 0.62) {
        const k = (t - 0.14) / 0.48;
        lift = lerp(y0, top, easeOut(k)); // easeOut == velocity bleeding off under gravity
        pose = runPose(stride, 30); // hard lean, feet driving into the wall
        rot = -16 + 5 * Math.sin(stride * 1.3);
        ground = lerp(y0, y1, k);
      } else {
        const k = (t - 0.62) / 0.38;
        lift = lerp(top, y1, ease(k));
        pose = blend(VAULT, runPose(stride), ease(k)); // mantle over the lip
        rot = lerp(-16, 0, ease(k));
        ground = y1;
      }
      return { skill, lift, ground, rot, scaleX, pose };
    }

    if (skill === "climb") {
      // jump for a platform ABOVE the current level, CATCH the ledge, hang a
      // beat, then mantle up — the run's one deliberate, slightly slower beat.
      const ledge = y1;
      // feet clear the takeoff and settle partway up the wall while the hands
      // grip the lip above (the HANG pose reaches up to the ledge).
      const hang = y0 + (ledge - y0) * 0.55;
      ground = lerp(y0, y1, easeOut(clamp(t / 0.5)));
      if (t < 0.26) {
        // explosive spring up to grip the ledge
        const k = t / 0.26;
        lift = lerp(y0, hang, easeOut(k));
        pose =
          t < 0.12
            ? blend(runPose(stride), COIL, ease(t / 0.12))
            : blend(COIL, REACH, ease((t - 0.12) / 0.14));
      } else if (t < 0.44) {
        // grip & HOLD — the hang
        lift = hang;
        pose = HANG;
      } else if (t < 0.88) {
        // mantle: chest to the lip, drive a knee over, rise to stand (the slow part)
        const k = (t - 0.44) / 0.44;
        lift = lerp(hang, ledge, ease(k));
        pose = k < 0.5 ? blend(HANG, VAULT, ease(k / 0.5)) : blend(VAULT, LAND, ease((k - 0.5) / 0.5));
      } else {
        const k = (t - 0.88) / 0.12;
        lift = ledge;
        pose = blend(LAND, runPose(stride), ease(k));
      }
      return { skill, lift, ground, rot, scaleX, pose };
    }

    if (skill === "roll") {
      // run off the edge and free-fall (Δy ∝ t² — real gravity), then dump the
      // momentum into a forward shoulder roll along the lower roof.
      const fallT = 0.58;
      if (t < fallT) {
        const k = t / fallT;
        lift = y0 - drop * (k * k); // free-fall from rest: distance grows with t²
        ground = lift;
        // throw a flat dive off the edge, then gather into the tuck as it falls
        pose = t < 0.22 ? blend(runPose(stride), DIVE, ease(t / 0.22)) : blend(DIVE, TUCK, ease((t - 0.22) / (fallT - 0.22)));
      } else if (t < 0.9) {
        const k = (t - fallT) / (0.9 - fallT);
        rot = 360 * easeOut(k); // one controlled rotation hugging the ground
        pose = TUCK;
        lift = y1 + 8 * Math.sin(Math.PI * k);
        ground = y1;
      } else {
        const k = (t - 0.9) / 0.1;
        pose = blend(LAND, runPose(stride), ease(k));
        lift = y1;
        ground = y1;
      }
      return { skill, lift, ground, rot, scaleX, pose };
    }

    // ── ballistic jumps: precision (tight) & leap (committed) ───────────────
    // one gravity law; the launch velocity is whatever lands him on the far
    // roof exactly as it arrives. precision = softer launch, leap = punchier.
    const g = skill === "precision" ? 470 : 760;
    const arc = ballistic(y0, y1, g);
    ground = lerp(y0, y1, ease(t));
    lift = arc.y(t);
    const airPose = skill === "precision" ? PREC : AIR;
    if (t < 0.14) {
      pose = blend(runPose(stride), COIL, ease(t / 0.14)); // load & drive off
    } else if (t < 0.8) {
      const desc = clamp(-arc.vy(t) / (g * 0.5)); // 0 rising → 1 falling fast
      pose = blend(airPose, BRACE, desc * 0.7); // legs reach for the ground as the fall accelerates
    } else {
      const k = (t - 0.8) / 0.2;
      pose = blend(LAND, runPose(stride), ease(k)); // absorb, recover to stride
    }
    return { skill, lift, ground, rot, scaleX, pose };
  }

  // ── building: run, with a vault/slide only inside the prop window ──────────
  lift = sg.elev - Math.abs(Math.sin(stride)) * 2;
  const inProp = t > 0.32 && t < 0.72;
  const active = sg.skill === "vault" || sg.skill === "slide";
  if (inProp && active) {
    const k = (t - 0.32) / 0.4; // 0..1 across the obstacle
    skill = sg.skill;
    if (sg.skill === "vault") {
      if (k < 0.32) pose = blend(runPose(stride), VAULT, ease(k / 0.32));
      else if (k < 0.68) pose = VAULT;
      else pose = blend(VAULT, runPose(stride), ease((k - 0.68) / 0.32));
      lift = sg.elev + 50 * para(k);
    } else {
      // slide: feet skid on the roof while the body ducks under the overhang
      if (k < 0.2) pose = blend(runPose(stride), SLIDE, ease(k / 0.2));
      else if (k < 0.78) pose = SLIDE;
      else pose = blend(SLIDE, runPose(stride), ease((k - 0.78) / 0.22));
      lift = sg.elev;
    }
  }

  return { skill, lift, ground, rot, scaleX, pose };
}

/* ----------------------- forward kinematics (drawing) --------------------- */
// Lean, athletic free-runner proportions (Vector-style): longer torso & arms,
// a smaller head, taller overall read. Leg length (thigh+shin) is kept at 60 so
// the foot-plant calibration in the renderers stays exact.
export const LIMB = { torso: 46, head: 24, uArm: 25, fArm: 24, thigh: 30, shin: 30 } as const;
const d2r = (d: number) => (d * Math.PI) / 180;
function fwd(x: number, y: number, len: number, deg: number) {
  const a = d2r(deg);
  return { x: x + Math.sin(a) * len, y: y + Math.cos(a) * len };
}
type Pt = { x: number; y: number };
export interface Joints {
  hip: Pt; neck: Pt; head: Pt; elbowL: Pt; handL: Pt; elbowR: Pt; handR: Pt;
  kneeL: Pt; footL: Pt; kneeR: Pt; footR: Pt;
}

export function kinematics(pose: Pose, rot: number, scaleX = 1): Joints {
  const hip = { x: 0, y: 0 };
  const neck = fwd(hip.x, hip.y, LIMB.torso, pose.torso);
  const head = fwd(neck.x, neck.y, LIMB.head, pose.head);
  const elbowR = fwd(neck.x, neck.y, LIMB.uArm, pose.auR);
  const handR = fwd(elbowR.x, elbowR.y, LIMB.fArm, pose.afR);
  const elbowL = fwd(neck.x, neck.y, LIMB.uArm, pose.auL);
  const handL = fwd(elbowL.x, elbowL.y, LIMB.fArm, pose.afL);
  const kneeR = fwd(hip.x, hip.y, LIMB.thigh, pose.luR);
  const footR = fwd(kneeR.x, kneeR.y, LIMB.shin, pose.llR);
  const kneeL = fwd(hip.x, hip.y, LIMB.thigh, pose.luL);
  const footL = fwd(kneeL.x, kneeL.y, LIMB.shin, pose.llL);
  const all: Joints = { hip, neck, head, elbowL, handL, elbowR, handR, kneeL, footL, kneeR, footR };
  if (rot === 0 && scaleX === 1) return all;
  const r = d2r(rot), cos = Math.cos(r), sin = Math.sin(r);
  const out = {} as Joints;
  (Object.keys(all) as (keyof Joints)[]).forEach((k) => {
    const x = all[k].x * scaleX, y = all[k].y;
    out[k] = { x: x * cos - y * sin, y: x * sin + y * cos };
  });
  return out;
}

/* --------------------- filled silhouette construction --------------------- */
const W = {
  thigh: 10.5, knee: 7.5, ankle: 5,
  shldr: 7, elbow: 5.6, wrist: 4,
  footW: 5.2, footTip: 2.8, footLen: 16,
  headR: 10.5, neck: 6, shoulder: 13.5, hipH: 9.5,
};
const f1 = (n: number) => n.toFixed(1);
function norm(ax: number, ay: number, bx: number, by: number) {
  const dx = bx - ax, dy = by - ay, L = Math.hypot(dx, dy) || 1e-6;
  return { ux: dx / L, uy: dy / L, nx: -dy / L, ny: dx / L };
}
/** tapered stadium (capsule) between a and b with end half-widths rA, rB */
export function cap(ax: number, ay: number, bx: number, by: number, rA: number, rB: number) {
  const { nx, ny } = norm(ax, ay, bx, by);
  const AL = [ax + nx * rA, ay + ny * rA], AR = [ax - nx * rA, ay - ny * rA];
  const BL = [bx + nx * rB, by + ny * rB], BR = [bx - nx * rB, by - ny * rB];
  return `M${f1(AL[0])},${f1(AL[1])} L${f1(BL[0])},${f1(BL[1])} A${f1(rB)},${f1(rB)} 0 0 1 ${f1(BR[0])},${f1(BR[1])} L${f1(AR[0])},${f1(AR[1])} A${f1(rA)},${f1(rA)} 0 0 1 ${f1(AL[0])},${f1(AL[1])} Z`;
}
export function disc(cx: number, cy: number, r: number) {
  return `M${f1(cx - r)},${f1(cy)} a${f1(r)},${f1(r)} 0 1 0 ${f1(2 * r)},0 a${f1(r)},${f1(r)} 0 1 0 ${f1(-2 * r)},0 Z`;
}

/**
 * Smooth tapered limb a→b→c (e.g. hip→knee→foot) as ONE filled ribbon that
 * bends at b with a width-preserving miter and rounds both ends.
 */
export function ribbon(ax: number, ay: number, bx: number, by: number, cx: number, cy: number, wa: number, wb: number, wc: number) {
  const s1 = norm(ax, ay, bx, by), s2 = norm(bx, by, cx, cy);
  let mx = s1.nx + s2.nx, my = s1.ny + s2.ny;
  const ml = Math.hypot(mx, my) || 1e-6;
  mx /= ml; my /= ml;
  const dotv = Math.max(0.45, Math.abs(mx * s1.nx + my * s1.ny));
  const wbm = wb / dotv;
  const aL = [ax + s1.nx * wa, ay + s1.ny * wa], aR = [ax - s1.nx * wa, ay - s1.ny * wa];
  const bL = [bx + mx * wbm, by + my * wbm], bR = [bx - mx * wbm, by - my * wbm];
  const cL = [cx + s2.nx * wc, cy + s2.ny * wc], cR = [cx - s2.nx * wc, cy - s2.ny * wc];
  return (
    `M${f1(aL[0])},${f1(aL[1])} Q${f1(bL[0])},${f1(bL[1])} ${f1(cL[0])},${f1(cL[1])} ` +
    `A${f1(wc)},${f1(wc)} 0 0 1 ${f1(cR[0])},${f1(cR[1])} ` +
    `Q${f1(bR[0])},${f1(bR[1])} ${f1(aR[0])},${f1(aR[1])} ` +
    `A${f1(wa)},${f1(wa)} 0 0 1 ${f1(aL[0])},${f1(aL[1])} Z`
  );
}

export interface Body { far: string; core: string; near: string; belt: string; edge: string }

/** Build a cohesive, SMOOTH, filled hooded silhouette from joints. */
export function buildBody(j: Joints): Body {
  const up = norm(j.hip.x, j.hip.y, j.neck.x, j.neck.y);
  const fx = -up.uy, fy = up.ux;

  const armSide = (e: Pt, h: Pt) =>
    ribbon(j.neck.x, j.neck.y, e.x, e.y, h.x, h.y, W.shldr, W.elbow, W.wrist) + disc(h.x, h.y, W.wrist + 0.8);
  const legSide = (k: Pt, f: Pt) => {
    const toe = [f.x + fx * W.footLen, f.y + fy * W.footLen];
    return ribbon(j.hip.x, j.hip.y, k.x, k.y, f.x, f.y, W.thigh, W.knee, W.ankle) +
      cap(f.x, f.y, toe[0], toe[1], W.footW, W.footTip);
  };

  const armNearR = j.handR.x >= j.handL.x;
  const legNearR = j.footR.x >= j.footL.x;
  const farArm = armNearR ? armSide(j.elbowL, j.handL) : armSide(j.elbowR, j.handR);
  const nearArm = armNearR ? armSide(j.elbowR, j.handR) : armSide(j.elbowL, j.handL);
  const farLeg = legNearR ? legSide(j.kneeL, j.footL) : legSide(j.kneeR, j.footR);
  const nearLeg = legNearR ? legSide(j.kneeR, j.footR) : legSide(j.kneeL, j.footL);

  const torso = cap(j.hip.x, j.hip.y, j.neck.x, j.neck.y, W.hipH, W.shoulder) +
    disc(j.hip.x, j.hip.y, W.hipH) + disc(j.neck.x, j.neck.y, W.shoulder);

  // bare athletic head on a neck — no hood (a free-runner, not a hoodie)
  const neck = cap(j.neck.x, j.neck.y, j.head.x, j.head.y, W.neck, W.neck * 0.92);
  const head = neck + disc(j.head.x, j.head.y, W.headR);

  const core = torso + head;

  const C = [j.hip.x + up.ux * (LIMB.torso * 0.34), j.hip.y + up.uy * (LIMB.torso * 0.34)];
  const ang = (Math.atan2(up.uy, up.ux) * 180) / Math.PI;
  const belt = `translate(${f1(C[0])},${f1(C[1])}) rotate(${f1(ang)})`;

  return { far: farArm + farLeg, core, near: nearLeg + nearArm, belt, edge: nearLeg + nearArm };
}
