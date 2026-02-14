export interface Project {
  title: string;
  category: string;
  image: string;
  description: string;
  href?: string;
}

export interface NavLink {
  title: string;
  href: string;
}

export interface SocialLink {
  title: string;
  href: string;
  ariaLabel: string;
}

export interface FooterLinkGroup {
  label: string;
  links: { title: string; href: string }[];
}
