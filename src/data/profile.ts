export const profile = {
  name: "Kittygot",
  monogram: "KG",
  portrait: "portrait.jpg",
  tagline: "A gothic corner for links and sets",
  bio: "Mexican girl with gothic alternative vibes. I create gaming and nude content, and a girlfriend experience to make your days better.",
};

export type SocialLink = {
  id: string;
  label: string;
  handle: string;
  href: string;
};

export const socialLinks: SocialLink[] = [
  {
    id: "instagram",
    label: "Instagram",
    handle: "@kitty_gott",
    href: "https://www.instagram.com/kitty_gott",
  },
  {
    id: "fansly",
    label: "Fansly",
    handle: "Private chatting and content",
    href: "https://fansly.com/kittygot",
  },
  {
    id: "manyvids",
    label: "ManyVids",
    handle: "Custom content and girlfriend experience",
    href: "https://www.manyvids.com/Profile/1011418574/programmer51/Store/Videos",
  },
];
