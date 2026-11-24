// Everything on the site comes from this file: your name, collections, photos,
// services and prices. Photos live in src/assets/photos; refer to them by file name.

export const site = {
  name: "Maren Ashby",
  title: "Maren Ashby Photography",
  role: "Photographer",
  description:
    "Maren Ashby is a landscape and portrait photographer working in natural light. Editorial, commercial and personal commissions.",
  location: "Based in Halden Bay, working everywhere",
  email: "studio@marenashby.example",
  phone: "(555) 018-4471",
  social: [
    { label: "Instagram", url: "https://instagram.com/" },
    { label: "Behance", url: "https://www.behance.net/" },
  ],
};

export const home = {
  intro: "Quiet pictures of light, land and the people in it.",
  text: "I make photographs for magazines, brands and families who want images that feel calm, honest and a little unhurried.",
  // The collection shown full-bleed at the top of the home page.
  heroPhoto: "coast-1.jpg",
  heroAlt: "Pale sun low over a still gray sea at dawn",
};

export type Photo = {
  file: string;
  alt: string;
  caption?: string;
};

export type Collection = {
  slug: string;
  title: string;
  year: string;
  summary: string;
  cover: string;
  photos: Photo[];
};

export const collections: Collection[] = [
  {
    slug: "coastlines",
    title: "Coastlines",
    year: "2026",
    summary:
      "Six mornings on the northern shore, waiting for the moment the sea and sky agree on a color.",
    cover: "coast-2.jpg",
    photos: [
      { file: "coast-1.jpg", alt: "Pale sun low over a still gray sea at dawn", caption: "First light, Gull Point" },
      { file: "coast-2.jpg", alt: "Peach sun glowing through haze above a dark sea", caption: "Haze lifting, 6:12am" },
      { file: "coast-3.jpg", alt: "Almost white sky meeting a silver sea", caption: "White morning" },
      { file: "coast-4.jpg", alt: "Moon above a dark blue sea at night", caption: "Moonset over the channel" },
      { file: "coast-5.jpg", alt: "Rose-colored sky over a warm brown sea", caption: "Rose tide" },
      { file: "coast-6.jpg", alt: "Soft sun above a blue-gray horizon", caption: "The long calm" },
    ],
  },
  {
    slug: "desert-studies",
    title: "Desert Studies",
    year: "2025",
    summary: "Layers of sand and shadow from a month on the high plains, shot only in the first and last hour of the day.",
    cover: "desert-1.jpg",
    photos: [
      { file: "desert-1.jpg", alt: "Layered dunes in cream, ochre and rust tones", caption: "Ridge lines" },
      { file: "desert-2.jpg", alt: "Tall view of soft pink and clay colored dunes", caption: "Clay hour" },
      { file: "desert-3.jpg", alt: "Violet dusk sky over warm dune layers", caption: "Dusk, Sable Flats" },
      { file: "desert-4.jpg", alt: "Pale sand ridges in muted beige", caption: "Bleached" },
      { file: "desert-5.jpg", alt: "Deep orange dunes falling into brown shadow", caption: "Last warmth" },
    ],
  },
  {
    slug: "quiet-interiors",
    title: "Quiet Interiors",
    year: "2025",
    summary: "Window light moving across rooms in an old farmhouse, over the course of one slow autumn.",
    cover: "interior-2.jpg",
    photos: [
      { file: "interior-1.jpg", alt: "Tall shaft of window light falling across a beige wall", caption: "Afternoon, east room" },
      { file: "interior-2.jpg", alt: "Window light on a warm gray wall with a round vase in shadow", caption: "The vase" },
      { file: "interior-3.jpg", alt: "Bright window shape on a cream wall above a wooden floor", caption: "Noon" },
      { file: "interior-4.jpg", alt: "Golden light patch on a dark taupe wall", caption: "Lamp hour" },
      { file: "interior-5.jpg", alt: "Soft daylight across a pale wall with a terracotta pot", caption: "Kitchen, October" },
    ],
  },
  {
    slug: "in-shadow",
    title: "In Shadow",
    year: "2024",
    summary: "Portraits made almost entirely of darkness, where the face is only suggested by the light.",
    cover: "shadow-2.jpg",
    photos: [
      { file: "shadow-1.jpg", alt: "Soft gray shapes emerging from a black background", caption: "Study I" },
      { file: "shadow-2.jpg", alt: "Warm blurred forms against deep shadow", caption: "Study II" },
      { file: "shadow-3.jpg", alt: "Cool blue-gray shape lit from one side in darkness", caption: "Study III" },
      { file: "shadow-4.jpg", alt: "Two pale blurred forms side by side in a dark room", caption: "Study IV" },
      { file: "shadow-5.jpg", alt: "Faint silver glow in a near black frame", caption: "Study V" },
    ],
  },
];

export const about = {
  portrait: "interior-3.jpg",
  portraitAlt: "Window light on a cream wall, standing in for a portrait of Maren",
  paragraphs: [
    "I grew up on a fishing island where the weather decided everything, so I learned early to wait for the light rather than chase it.",
    "For the last ten years I've photographed landscapes, interiors and people for magazines, architects, small brands and families. I work mostly in natural light, with a small kit and a lot of patience.",
    "My pictures have appeared in travel and design publications, and my series Coastlines was shown at the Halden Bay Arts House in 2026.",
  ],
  clients: ["North Meridian Magazine", "Fieldhouse Architects", "Alder & Pine Goods", "The Coastal Review", "Wildgrass Studio"],
};

export type Service = {
  name: string;
  price: string;
  unit?: string;
  description: string;
  includes: string[];
  featured?: boolean;
};

export const services: Service[] = [
  {
    name: "Portrait session",
    price: "$450",
    unit: "per session",
    description: "An unhurried hour outdoors or at home, for individuals, couples and small families.",
    includes: ["One hour, one location", "25 edited images", "Private online gallery", "Print release"],
  },
  {
    name: "Editorial and brand",
    price: "$1,800",
    unit: "per day",
    description: "For magazines, products and teams who need a consistent, calm visual story.",
    includes: ["Up to eight hours", "Shot list and mood board", "60 edited images", "Commercial license"],
    featured: true,
  },
  {
    name: "Interiors and architecture",
    price: "$1,200",
    unit: "per half day",
    description: "Spaces photographed in their best natural light, for architects, hosts and makers.",
    includes: ["Up to four hours", "Light planning visit", "20 edited images", "Web and print use"],
  },
];

export const booking = {
  title: "Book a session",
  text: "Tell me a little about what you have in mind. I reply to every inquiry within two working days, usually with a few questions and some dates.",
  sessionTypes: ["Portrait session", "Editorial and brand", "Interiors and architecture", "Something else"],
};
