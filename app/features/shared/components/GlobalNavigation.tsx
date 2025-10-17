import { Link } from "react-router";
import { useState } from "react";
import { Banknote, User, LogIn, UserPlus, Menu, X } from "lucide-react";
import { cn } from "~/features/shared/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/features/shared/components/ui/navigation-menu";
import { Button } from "~/features/shared/components/ui/button";
import { useAuthStore } from "~/features/auth/store/useAuthStore";

const aboutLinks = [
  { href: "/about", title: "About Us", description: "Learn more about our mission to provide comprehensive economic education." },
  { href: "/about/team", title: "Team", description: "Meet the people behind Econodictionary" },
  { href: "/about/contact", title: "Contact", description: "Get in touch with our team" },
  { href: "/about/faq", title: "FAQ", description: "Frequently asked questions" },
  { href: "/privacy", title: "Privacy Policy", description: "How we protect your data" },
  { href: "/terms-of-service", title: "Terms of Service", description: "Our terms and conditions" },
];

export function GlobalNavigation() {
  const { isAuthenticated, user } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Navigation Left - Bank Icon */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
              <Banknote className="h-6 w-6 text-zinc-900 dark:text-zinc-50" />
              <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Econodictionary
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-4 md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/terms"
                      className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                    >
                      Terms
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>About</NavigationMenuTrigger>
                  <NavigationMenuContent className="left-auto right-0">
                    <ul className="grid w-[280px] gap-2 p-3 md:w-[300px] md:grid-cols-1 lg:grid-cols-2 lg:w-[375px]">
                      {aboutLinks.map((link) => (
                        <li key={link.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              to={link.href}
                              onClick={closeMobileMenu}
                            >
                              <div className="text-sm font-medium leading-none">{link.title}</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{link.description}</p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link to="/profile" onClick={closeMobileMenu}>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">{user?.name || "Profile"}</span>
                  </Button>
                </Link>
                <Link to="/auth/sign-out" onClick={closeMobileMenu}>
                  <Button variant="outline" size="sm" className="gap-2">
                    <LogIn className="h-4 w-4" />
                    <span className="hidden sm:inline">Sign Out</span>
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="auth/sign-in" onClick={closeMobileMenu}>
                  <Button variant="ghost" size="sm">
                    <LogIn className="mr-2 h-4 w-4" />
                    <span className="hidden lg:inline">Sign In</span>
                  </Button>
                </Link>
                <Link to="auth/sign-up" onClick={closeMobileMenu}>
                  <Button size="sm">
                    <UserPlus className="mr-2 h-4 w-4" />
                    <span className="hidden lg:inline">Sign Up</span>
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile navigation */}
        <div
          className={cn(
            "md:hidden",
            isMobileMenuOpen ? "max-h-screen pb-4" : "max-h-0 overflow-hidden"
          )}
        >
          <div className="flex flex-col gap-3 border-t border-zinc-200 pt-4 dark:border-zinc-800">
            <Link
              to="/terms"
              onClick={closeMobileMenu}
              className="rounded-md px-3 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-900"
            >
              Terms
            </Link>
            <div className="rounded-md border border-zinc-200 p-3 dark:border-zinc-800">
              <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                About
              </div>
              <div className="flex flex-col gap-2">
                {aboutLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={closeMobileMenu}
                    className="rounded-md px-2 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>

            {isAuthenticated ? (
              <div className="flex flex-col gap-2">

                <Link
                  to="/profile"
                  onClick={closeMobileMenu}
                  className="rounded-md px-3 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-900"
                >
                  <span className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {user?.name || "Profile"}
                  </span>
                </Link>
                <div className="mt-2">
                  <Link to="/auth/sign-out" onClick={closeMobileMenu}>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <LogIn className="h-4 w-4" />
                      Sign Out
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link to="auth/sign-in" onClick={closeMobileMenu}>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
                <Link to="auth/sign-up" onClick={closeMobileMenu}>
                  <Button className="w-full justify-start gap-2">
                    <UserPlus className="h-4 w-4" />
                    Create account
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
