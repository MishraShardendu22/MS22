"use client";

import Link from "next/link";
import type { MouseEvent } from "react";

interface ExternalLinkProps {
  href: string;
  label: string;
  className: string;
}

export function ExternalLink({ href, label, className }: ExternalLinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={handleClick}
    >
      {label}
    </Link>
  );
}
