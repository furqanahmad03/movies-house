"use client"

import { Button } from "../../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import { Menu } from "lucide-react";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import Link from "next/link";
import { useAuth } from "../../../lib/hooks/useAuth";

export const NavigationSheet = () => {
  const { session, isAuthenticated, isLoading, logout } = useAuth();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <Logo />
        <NavMenu orientation="vertical" className="mt-12" />
        
        {/* Authentication Section */}
        <div className="mt-8 pt-8 border-t">
          {isLoading ? (
            <div className="h-10 bg-muted animate-pulse rounded-md" />
          ) : isAuthenticated ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Welcome, {session?.user?.name}
              </p>
              <Button
                variant="outline"
                onClick={logout}
                className="w-full"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <Link href="/auth/signin" className="block">
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup" className="block">
                <Button className="w-full">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
