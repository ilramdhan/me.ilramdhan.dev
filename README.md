# Ilramdhan.dev — Creative Fullstack Developer Portfolio

> High-end scrollytelling personal portfolio built with **Next.js 16**, **Motion**, **Lenis**, and **HTML5 Canvas**.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06b6d4?logo=tailwindcss)

---

## ✨ Features

- **Scrollytelling Animation** — 192-frame image sequence synced to scroll using HTML5 Canvas
- **Progressive Loading** — Batch-loaded frames (30 initial + 20 batches) with loading indicator
- **WebP Optimization** — Auto-detects WebP support and loads optimized images (~13% smaller)
- **Smooth Scrolling** — Lenis integration with custom `useLenis` hook
- **Custom Cursor** — GPU-powered cursor using Motion values (zero re-renders)
- **Grain Texture** — Subtle CSS noise overlay for premium feel
- **Skip Navigation** — Accessible skip-to-content link
- **SEO Ready** — Open Graph, Twitter Cards, sitemap.xml, robots.txt, PWA manifest
- **Security Headers** — HSTS, CSP, X-Frame-Options, and more

---

## 🏗️ Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata & fonts
│   ├── page.tsx            # Home page (client component)
│   ├── globals.css         # Global styles, grain, cursor
│   └── sitemap.ts          # Auto-generated sitemap
├── components/
│   ├── layout/             # Layout components
│   │   ├── Navbar.tsx      # Fixed nav with animated mobile menu
│   │   ├── Footer.tsx      # Staggered links + large text reveal
│   │   ├── Preloader.tsx   # Loading progress screen
│   │   └── MouseCursor.tsx # Custom cursor (motion values)
│   ├── sections/           # Page sections
│   │   ├── SequenceScroll.tsx  # Scroll-linked canvas animation
│   │   ├── Projects.tsx    # Featured project grid
│   │   ├── About.tsx       # Text reveal + services/stack
│   │   └── Contact.tsx     # CTA + contact info
│   └── ui/                 # Reusable UI components
│       └── InfiniteMarquee.tsx
├── data/
│   └── site.ts             # Centralized site data & config
├── hooks/
│   ├── index.ts            # Barrel exports
│   └── useLenis.ts         # Lenis smooth scroll hook
├── lib/
│   └── cn.ts               # Tailwind class merge utility
└── types/
    └── index.ts            # Shared TypeScript interfaces

public/
├── icons/                  # Favicon set (16/32/180/192/512)
├── sequence/               # Original JPG frames (192 files)
│   └── webp/               # WebP optimized frames
├── favicon.ico
├── manifest.json
├── og-image.png
└── robots.txt
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
git clone https://github.com/ilramdhan/me.ilramdhan.dev.git
cd me.ilramdhan.dev
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

---

## 🛠️ Tech Stack

| Technology                                  | Purpose                            |
| ------------------------------------------- | ---------------------------------- |
| [Next.js 16](https://nextjs.org)            | React framework with App Router    |
| [React 19](https://react.dev)               | UI library                         |
| [TypeScript](https://typescriptlang.org)    | Type safety                        |
| [Tailwind CSS 4](https://tailwindcss.com)   | Utility-first styling              |
| [Motion](https://motion.dev)                | Animations & scroll tracking       |
| [Lenis](https://lenis.darkroom.engineering) | Smooth scrolling                   |
| [Sharp](https://sharp.pixelplumbing.com)    | Image processing (WebP conversion) |

---

## 🔒 Security

The following headers are configured in `next.config.ts`:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` (camera, mic, geolocation disabled)
- `Strict-Transport-Security` (HSTS with 1-year max-age)

---

## 📊 Performance

- **Progressive image loading** — First 30 frames load immediately, rest in batches of 20
- **WebP auto-detection** — 13% bandwidth savings on supported browsers
- **Motion values** — Mouse cursor uses `useMotionValue` + `useSpring` (no React re-renders)
- **Aggressive caching** — 1-year immutable cache on icons and sequence assets
- **Compression** — gzip enabled via Next.js

---

## 📄 License

MIT License — feel free to use as inspiration for your own portfolio.

---

Built with ❤️ by [Ilramdhan](https://ilramdhan.dev)
