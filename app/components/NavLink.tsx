"use client";

import Link, { LinkProps } from "next/link";
import { forwardRef } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">, LinkProps {
    className?: string;
    activeClassName?: string;
    pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
    ({ className, activeClassName, pendingClassName, href, ...props }, ref) => {
        const pathname = usePathname();
        const isActive = pathname === href;
        const isPending = false;

        return (
            <Link
                ref={ref}
                href={href}
                className={cn(className, isActive && activeClassName, isPending && pendingClassName)}
                {...props}
            />
        );
    },
);

NavLink.displayName = "NavLink";

export { NavLink };
