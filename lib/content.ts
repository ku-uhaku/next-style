export type Mood = "predawn" | "morning" | "midday" | "dusk" | "night";

export const MOODS: Mood[] = [
  "predawn",
  "morning",
  "midday",
  "dusk",
  "night",
];

export const nav = [
  { label: "The hours", href: "#hours" },
  { label: "The formula", href: "#formula" },
  { label: "The ritual", href: "#ritual" },
  { label: "Join the list", href: "#join" },
];

export const hero = {
  title: ["Skin keeps", "the hours", "of light."],
  lead: "Five formulas, each made for one hour of the day. The day starts at 04:00, when the air is driest and skin is at its thinnest.",
  hour: "04:00",
  cue: "Scroll to move the sun",
};

export const manifesto = {
  statement:
    "Your skin at four in the morning is not the skin you wash at night. It loses water in the cold, swells in the heat, repairs itself in the dark.",
  coda: "One formula cannot keep all of those hours. So we stopped making one.",
};

export type Hour = {
  time: string;
  name: string;
  kind: string;
  blurb: string;
  size: string;
  price: string;
  tint: string;
};

export const hours: Hour[] = [
  {
    time: "04:00",
    name: "Dew",
    kind: "Water essence",
    blurb:
      "The hour the air is driest and skin is thinnest. Mostly water, held with glycerin and beta-glucan, so there is something to lose other than your own moisture.",
    size: "30 ml",
    price: "£48",
    tint: "#7d8ce8",
  },
  {
    time: "09:00",
    name: "Light",
    kind: "Morning serum",
    blurb:
      "Daylight starts the damage before you can feel it. Fifteen percent vitamin C, buffered to pH 3.4, which works without the sting.",
    size: "30 ml",
    price: "£72",
    tint: "#f2b457",
  },
  {
    time: "13:00",
    name: "Shade",
    kind: "Mineral shield",
    blurb:
      "The sun sits at its steepest angle now. Zinc oxide only, tinted warm, ground fine enough to leave no cast on any skin.",
    size: "50 ml",
    price: "£44",
    tint: "#fff4dc",
  },
  {
    time: "18:00",
    name: "Ember",
    kind: "Facial oil",
    blurb:
      "Skin is warmest and most permeable at the end of the day. Six pressed oils, nothing volatile, nothing that oxidises by morning.",
    size: "30 ml",
    price: "£65",
    tint: "#e86fa0",
  },
  {
    time: "22:00",
    name: "Repair",
    kind: "Night balm",
    blurb:
      "Repair runs on its own schedule while you sleep. Retinal at 0.1 percent, slowed with squalane, so you wake up calm instead of raw.",
    size: "50 ml",
    price: "£88",
    tint: "#a98be8",
  },
];

export const formula = {
  title: "What is actually in it",
  lead: "Every ORA formula is built on the same five-part structure. Only the actives change with the hour.",
  layers: [
    {
      pct: "68%",
      name: "Water phase",
      note: "Distilled and deionised. The only ingredient that does nothing on its own.",
    },
    {
      pct: "14%",
      name: "Lipids",
      note: "Squalane and pressed seed oils. They hold everything else against the skin.",
    },
    {
      pct: "12%",
      name: "Humectants",
      note: "Glycerin and beta-glucan, which pull water up toward the surface.",
    },
    {
      pct: "4.5%",
      name: "Actives",
      note: "Whatever the hour calls for, never above the dose it was tested at.",
    },
    {
      pct: "1.5%",
      name: "Preservation",
      note: "Enough to keep the formula safe for twelve months open. No more than that.",
    },
  ],
};

export type RitualStep = {
  time: string;
  title: string;
  steps: string[];
  tint: string;
};

export const ritual = {
  title: "A day, in order",
  lead: "Turn the dial. Each hour is one step, and no step takes longer than a minute.",
  steps: [
    {
      time: "04:00",
      title: "Before the room is light",
      steps: [
        "One press of Dew onto dry skin.",
        "Nothing on top of it for sixty seconds.",
        "Go back to sleep.",
      ],
      tint: "#7d8ce8",
    },
    {
      time: "09:00",
      title: "Before you leave",
      steps: [
        "Light first, on skin still damp from washing.",
        "Shade over it, two fingers' worth.",
        "The back of the neck counts.",
      ],
      tint: "#f2b457",
    },
    {
      time: "13:00",
      title: "Over the top of the day",
      steps: [
        "Shade again, straight over makeup.",
        "No need to wash anything off first.",
        "Hands, if they have been out in it.",
      ],
      tint: "#fff4dc",
    },
    {
      time: "18:00",
      title: "When you get in",
      steps: [
        "Warm Ember between your palms first.",
        "Press it in. Do not rub it in.",
        "Collarbones last.",
      ],
      tint: "#e86fa0",
    },
    {
      time: "22:00",
      title: "Last thing",
      steps: [
        "Repair on dry skin, a pea for the whole face.",
        "Three nights a week to begin with.",
        "Then every night, once it stops tingling.",
      ],
      tint: "#a98be8",
    },
  ] satisfies RitualStep[],
};

export const testament = {
  quote: [
    "A well-made formula,",
    "put on at the wrong",
    "hour, is still the",
    "wrong formula.",
  ],
  attribution: "Hélène Marchand, who formulates all five",
};

export const closing = {
  title: "The first batch is poured at 04:00 in March.",
  lead: "Five hundred of each. We write once, when they are ready.",
  success: "You're on the list. We'll write when the first batch is poured.",
  error: "That address looks incomplete. Check it and try again.",
};

export const footerLinks = [
  {
    heading: "Read",
    links: [
      { label: "The hours", href: "#hours" },
      { label: "The formula", href: "#formula" },
      { label: "The ritual", href: "#ritual" },
    ],
  },
  {
    heading: "Ask",
    links: [
      { label: "What is in each formula", href: "#formula" },
      { label: "How the hours work", href: "#hours" },
      { label: "Join the list", href: "#join" },
    ],
  },
];
