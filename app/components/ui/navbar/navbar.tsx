"use client"

import { Button } from "../../ui/button";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import Link from "next/link";
import { useAuth } from "../../../lib/hooks/useAuth";

const Navbar = () => {
  const { session, isAuthenticated, isLoading, logout } = useAuth();

  return (
    <div className="min-h-30 bg-muted">
      <nav className="fixed top-6 inset-x-4 h-16 bg-background border dark:border-slate-700/70 max-w-screen-xl !mx-auto rounded-full">
        <div className="h-full flex items-center justify-between mx-auto !px-4">
          <Logo />

          {/* Desktop Menu */}
          <NavMenu className="hidden md:block" />

          <div className="flex items-center gap-3">
            {isLoading ? (
              <div className="h-9 w-20 bg-muted animate-pulse rounded-full" />
            ) : isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  Welcome, {session?.user?.name}
                </span>
                <Button
                  variant="outline"
                  onClick={logout}
                  className="rounded-full !px-3"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button
                    variant="outline"
                    className="hidden sm:inline-flex rounded-full !px-3"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="rounded-full !px-3">Get Started</Button>
                </Link>
              </>
            )}

            {/* Mobile Menu */}
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
