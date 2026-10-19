// Site-wide constants. Single source of truth for the Astro site.

export const SITE = {
  name: 'Joe Neiman',
  url: 'https://joeneiman.com',
  locale: 'en-US',
  // Flip to true at launch, after Joe approves the copy. While false, every
  // page carries noindex and the draft ribbon shows.
  launched: false,
  description:
    'Entrepreneur and pilot. Co-founder of ACV Auctions, founder of DealerClub. Buying and building dealerships, flying, and writing about what it all taught me.',
  // Profiles that belong to Joe, used for Person schema sameAs. Add only
  // ones Joe confirms.
  sameAs: [
    'https://www.linkedin.com/in/joe-neiman-577181aa/',
  ],
  analytics: {
    ga4Id: import.meta.env.PUBLIC_GA4_ID ?? '',
    gscVerification: import.meta.env.PUBLIC_GSC_VERIFICATION ?? '',
    indexNowKey: import.meta.env.PUBLIC_INDEXNOW_KEY ?? '',
  },
};

// Prefix a root-relative path with the build's base URL, so links work on
// the GitHub Pages preview (/joeneiman.com/...) and on the real domain.
export const url = (p: string): string => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return p === '/' ? (base || '/') : base + p;
};

export const NAV = [
  { label: 'About', href: '/about' },
  { label: 'Ventures', href: '/ventures' },
  { label: 'Advisory', href: '/advisory' },
  { label: 'Giving', href: '/giving' },
  { label: 'Speaking', href: '/speaking' },
  { label: 'Writing', href: '/writing' },
  { label: 'Contact', href: '/contact' },
];
