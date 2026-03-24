"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/65 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        <Link href="/" className="text-lg font-semibold">
          Mini
        </Link>

        <nav className="hidden gap-6 text-sm md:flex">
          <a href="#about" className="hover:text-primary">
            About
          </a>
          <a href="#projects" className="hover:text-primary">
            Projects
          </a>
          <a href="#experience" className="hover:text-primary">
            Experience
          </a>
          <a href="#contact" className="hover:text-primary">
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/your-github-id"
            target="_blank"
            className="text-sm hover:text-primary"
          >
            GitHub
          </Link>

          <button className="rounded-md bg-primary px-3 py-1 text-sm text-primary-foreground">
            Ask Mini
          </button>
        </div>

      </div>
    </header>
  );
}
