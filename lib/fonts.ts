import {
  JetBrains_Mono as FontMono,
  Inter as FontSans,
  Overpass,
} from "next/font/google"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const fontOverpass = Overpass({
  subsets: ["latin"],
  variable: "--font-overpass",
})
