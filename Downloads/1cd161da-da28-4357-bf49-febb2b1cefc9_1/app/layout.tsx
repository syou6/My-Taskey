import type { Metadata } from "next";
import { Geist, Geist_Mono, Pacifico } from "next/font/google";
import "./globals.css";

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI House Dev - AI活用で住宅業界の開発コストを1/3に | フリーランスエンジニア",
  description: "最新AIツールを駆使して一人で効率的に開発。住宅業界特化のHP制作・アプリ開発・業務システムを従来の1/3のコストで提供。無料相談受付中。",
  keywords: "AI開発,住宅業界,フリーランス,ホームページ制作,アプリ開発,業務システム,低コスト,短納期",
  openGraph: {
    title: "AI House Dev - AI活用で住宅業界の開発コストを1/3に",
    description: "最新AIツールを駆使して一人で効率的に開発。住宅業界特化のシステム開発を従来の1/3のコストで提供。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
