import type { Project, NavLink, SocialLink, FooterLinkGroup } from '@/types';

export const siteConfig = {
  name: 'Ilramdhan.dev',
  title: 'Ilramdhan.dev — Creative Fullstack Developer',
  description:
    'High-end Scrollytelling Personal Portfolio of Ilramdhan, a Creative Fullstack Developer specializing in Next.js, Motion, and immersive Web Interactions.',
  url: 'https://ilramdhan.dev',
  author: 'Ilramdhan',
  email: 'hello@ilramdhan.dev',
  whatsapp: '+6285723458828',
  location: 'Based in Indonesia',
} as const;

export const navLinks: NavLink[] = [
  { title: 'Home', href: '/' },
  { title: 'Projects', href: '#projects' },
  { title: 'About', href: '#about' },
  { title: 'Contact', href: '#contact' },
];

export const socialLinks: SocialLink[] = [
  {
    title: 'LinkedIn',
    href: 'https://linkedin.com/in/ilramdhan',
    ariaLabel: 'Visit LinkedIn profile',
  },
  {
    title: 'Instagram',
    href: 'https://instagram.com/ilramdhan',
    ariaLabel: 'Visit Instagram profile',
  },
  {
    title: 'Twitter',
    href: 'https://twitter.com/ilramdhan',
    ariaLabel: 'Visit Twitter profile',
  },
];

export const projects: Project[] = [
  {
    title: 'E-Commerce Rebrand',
    category: 'Web Design & Development',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
    description:
      'A complete overhaul of a fashion retailer\'s online presence, resulting in a 40% increase in conversion.',
  },
  {
    title: 'Fintech Dashboard',
    category: 'Product Design',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
    description:
      'Streamlining complex financial data into an intuitive interface for enterprise users.',
  },
  {
    title: 'Luxury Real Estate',
    category: 'Web Development',
    image:
      'https://images.unsplash.com/photo-1600596542815-2a4d04774c77?q=80&w=2670&auto=format&fit=crop',
    description: 'Immersive 3D experiences for high-end property listings.',
  },
  {
    title: 'AI Creative Tool',
    category: 'Fullstack Engineering',
    image:
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop',
    description:
      'Building the next generation of generative AI tools for artists.',
  },
];

export const footerLinkGroups: FooterLinkGroup[] = [
  {
    label: 'Socials',
    links: socialLinks.map((s) => ({ title: s.title, href: s.href })),
  },
  {
    label: 'Legal',
    links: [
      { title: 'Privacy Policy', href: '#' },
      { title: 'Terms of Service', href: '#' },
    ],
  },
];

export const aboutText =
  'I am a creative developer with a passion for building immersive web experiences. I specialize in Next.js, Motion, and WebGL to bring ideas to life.';

export const services = ['Web Design', 'Web Development', 'Creative Implementation', 'SEO Optimization'];

export const awards = [
  'Awwwards - Site of the Day',
  'CSS Design Awards - UI/UX',
  'FWA - Site of the Day',
];

export const stack = ['Next.js / React', 'TypeScript', 'Tailwind CSS', 'WebGL / Three.js'];
