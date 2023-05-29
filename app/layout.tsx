
import { Metadata } from "next"
import "@/styles/globals.css"
// import { fontSans } from "@/lib/fonts"
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

interface RootLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Remindas',
  description: 'A simple reminder app built with Next.js and Tailwind CSS.',
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})


export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html className={inter.className} lang="en" suppressHydrationWarning>

        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased"
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <div className="flex-1">{children}</div>
            </div>
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
