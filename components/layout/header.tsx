"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header">
      <Container className="header-inner">
        <Link className="brand" href="/" aria-label="Phil Multi-Services, accueil" onClick={closeMenu}>
          <span className="brand-mark" aria-hidden="true">PM</span>
          <span className="brand-text">Phil Multi-Services<small>Saint-Amand-les-Eaux</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="Navigation principale">
          {links.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}
          <ButtonLink href="/contact">Demander une réparation</ButtonLink>
        </nav>
        <button ref={toggleRef} className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} onClick={() => setOpen((value) => !value)}>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </Container>
      <nav id="mobile-navigation" className={`mobile-menu${open ? " is-open" : ""}`} aria-label="Navigation mobile" aria-hidden={!open}>
        {links.map((link) => <Link href={link.href} key={link.href} onClick={closeMenu} tabIndex={open ? 0 : -1}>{link.label}</Link>)}
        <Link href="/contact" className="button" onClick={closeMenu} tabIndex={open ? 0 : -1}>Demander une réparation</Link>
      </nav>
    </header>
  );
}
