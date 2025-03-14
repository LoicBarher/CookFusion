"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface ActiveLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
}

export default function ActiveLink({
  href,
  children,
  className = "",
  activeClassName = "",
  ...props
}: ActiveLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      {...props}
      className={`group ${className} ${isActive ? activeClassName : ""}`}
    >
      {children}
    </Link>
  );
}
