import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Catálogo de Produtos | Encontre os melhores produtos",
  description:
    "Explore nosso catálogo de produtos com filtros avançados, ordenação e visualização detalhada. Encontre os melhores produtos com facilidade.",
  keywords: "catálogo, produtos, e-commerce, compras online, filtros, ordenação",
  authors: [{ name: "Seu Nome" }],
  openGraph: {
    title: "Catálogo de Produtos | Encontre os melhores produtos",
    description: "Explore nosso catálogo de produtos com filtros avançados, ordenação e visualização detalhada.",
    url: "https://seu-site.com",
    siteName: "Catálogo de Produtos",
    images: [
      {
        url: "/images/screenshot.png",
        width: 1200,
        height: 630,
        alt: "Catálogo de Produtos",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Catálogo de Produtos | Encontre os melhores produtos",
    description: "Explore nosso catálogo de produtos com filtros avançados, ordenação e visualização detalhada.",
    images: ["/images/screenshot.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1f2937" },
  ],
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
