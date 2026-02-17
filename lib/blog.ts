import type { BlogPost, BlogMeta } from "@/types/blog";

export const posts: BlogPost[] = [
  {
    slug: "nixos-distro",
    title: "WHY I THINK NIXOS IS OG FOR PRODUCTION AND DEVELOPMENT",
    excerpt: "In meme lang: The ultimate boss of distro fight. A deep dive into why Nix is changing the game.",
    date: "2025-12-08",
    readTime: 6,
    tags: ["NIX", "NIXOS", "LINUX"],
    published: true,
    content: `## NixOS: A Purely Functional Linux Distribution\n\nHey, glad you found this blog — it is a good one. Let me start with a quick story about how I discovered this absolute banger of a distro.\n\nBack in college, we had a Linux course. Around that time, one of my classmates told me to dual boot Linux. At first, I had no clue what "dual boot" even meant.\n\n## The Arch Detour\n\nI already knew Linux had a ton of distributions, and eventually I landed on **Arch Linux**. Yes, I tried to install Arch on my first attempt at dual booting.\n\nAfter failing three times, I finally managed to install Arch Linux with KDE Plasma on my fourth try. It worked, but my system kept freezing.\n\n## Discovering NixOS\n\nDuring that desperate web search phase, I stumbled upon **NixOS**.\n\nI dual booted it, started using it, and instantly fell in love: an immutable, declarative distro where everything is configured in one file. You can roll back, rebuild, and do anything you want.\n\n## The Academic Foundation\n\nNixOS is based on the PhD thesis of Eelco Dolstra: **The Purely Functional Software Deployment Model**.\n\n- **Eelco's thesis** = Nix\n- **Nix** = NixOS\n- **NixOS** = declarative Linux on steroids\n\n## Why NixOS Wins\n\n- **Reproducibility** — same config, same system, every time\n- **Atomic rollbacks** — if something breaks, roll back in one command\n- **Declarative** — entire system described in one file\n- **No dependency hell** — Nix isolates packages so they never conflict`,
  },
  {
    slug: "cloudflared-tunnel",
    title: "CLOUDFLARE TUNNEL: A SECURE WAY TO CONNECT YOUR RESOURCES",
    excerpt: "A deep dive into how Cloudflare Tunnel works and how you can use it to secure your resources.",
    date: "2026-01-30",
    readTime: 10,
    tags: ["CLOUDFLARE", "NETWORKING", "SELF-HOSTING", "NIXOS"],
    published: true,
    content: `## The Old Way\n\nIf you have ever exposed a service from home, you know the classic approach: open a port, point DNS at your public IP, hope your firewall is tight.\n\nCloudflare Tunnel flips that entire model.\n\n## How It Works\n\nInstead of allowing inbound connections, you run \`cloudflared\` inside your network making outbound-only connections to Cloudflare's edge.\n\nThis gives you two big wins:\n\n- **No inbound ports** on your router\n- **Your origin stays hidden** behind Cloudflare's WAF/DDoS protection\n\n## Why This Beats Port Forwarding\n\n- **No inbound ports** — firewall stays closed\n- **Hidden origin IP** — your public IP is not revealed\n- **WAF and DDoS protection** — Cloudflare absorbs attacks\n- **CGNAT friendly** — works without a real public IP\n\n## Quickstart\n\nInstall \`cloudflared\`, authenticate, create a tunnel, configure ingress rules mapping hostnames to local services, route DNS, and run.\n\n## NixOS Integration\n\nOn NixOS, manage the connector as a systemd service — fully declarative, just like everything else in your config.`,
  },
];

export function getAllPosts(): BlogMeta[] {
  return posts
    .filter((p) => p.published)
    .map(({ content, ...meta }) => meta)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug && p.published);
}

export function getAllPostSlugs(): string[] {
  return posts.filter((p) => p.published).map((p) => p.slug);
}
