import { Metadata } from "next"

// import "@/styles/globals.css"
import "@/styles/purple.css"
import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"

import { fontOverpass } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { SiteHeader } from "@/components/header/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

interface RootLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: "Remindas",
  description: "A simple reminder app built with Next.js and Tailwind CSS.",
}

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <ClerkProvider
        appearance={{
          baseTheme: dark,
          variables: {
            colorPrimary: "#6d28d9",
          },
        }}
      >
        <html
          className={fontOverpass.className}
          lang="en"
          suppressHydrationWarning
        >
          <body className={cn("min-h-screen bg-background antialiased")}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <div className="relative flex flex-col">
                <SiteHeader />
                {children}
              </div>
              {/* <TailwindIndicator /> */}
            </ThemeProvider>
            <Toaster />
          </body>
        </html>
      </ClerkProvider>
    </>
  )
}
