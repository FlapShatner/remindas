import Link from "next/link"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { dark } from "@clerk/themes"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

import SignedOutPlaceholder from "./signed-out"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <ThemeToggle />
            <SignedIn>
              <UserButton
                afterSignOutUrl="/"
                userProfileMode="navigation"
                userProfileUrl="/user-profile"
                appearance={{
                  baseTheme: dark,
                  elements: {
                    userButtonPopoverCard: cn(
                      "border border-border bg-card text-foreground"
                    ),
                    userButtonPopoverActionButtonText: cn(
                      "text-sm text-foreground"
                    ),
                    userButtonPopoverActionButtonIcon: cn(
                      "h-4 w-4 text-foreground"
                    ),
                    userButtonPopoverFooterText: cn("text-foreground"),
                  },
                }}
              />
            </SignedIn>
            <SignedOut>
              <SignedOutPlaceholder />
            </SignedOut>
          </nav>
        </div>
      </div>
    </header>
  )
}
