"use client";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
const links = [{ href: "/", label: "Accueil" }, { href: "/services", label: "Services" }, { href: "/a-propos", label: "À propos" }, { href: "/contact", label: "Contact" }];
export function Header() { const [open, setOpen] = useState(false); return <header className="site-header"><Container className="header-inner"><Link className="brand" href="/" aria-label="Phil Multi-Services, accueil"><span className="brand-mark">PM</span><span className="brand-text">Phil Multi-Services<small>Saint-Amand-les-Eaux</small></span></Link><nav className="desktop-nav" aria-label="Navigation principale">{links.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}<ButtonLink href="/contact">Demander une réparation</ButtonLink></nav><button className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></Container><nav id="mobile-navigation" className={`mobile-menu${open ? " is-open" : ""}`} aria-label="Navigation mobile">{links.map((link) => <Link href={link.href} key={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}<ButtonLink href="/contact">Demander une réparation</ButtonLink></nav></header>; }
