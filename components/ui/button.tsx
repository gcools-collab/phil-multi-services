import Link from "next/link";
import type { ReactNode } from "react";
type Props = { href: string; children: ReactNode; variant?: "primary" | "secondary" | "light"; className?: string };
export function ButtonLink({ href, children, variant = "primary", className = "" }: Props) { const classes = `button ${variant === "primary" ? "" : `button-${variant}`} ${className}`.trim(); return href.startsWith("/") ? <Link href={href} className={classes}>{children}</Link> : <a href={href} className={classes}>{children}</a>; }
