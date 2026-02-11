"use client";

import Link from "next/link";

interface ExternalLinkProps {
  href: string;
  label: string;
  className: string;
}

export function ExternalLink({ href, label, className }: ExternalLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={(e) => e.stopPropagation()}
    >
      {label}
    </Link>
  );
}
