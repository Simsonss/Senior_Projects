import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import  Providers from '@/app/providers';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ENVIRONMENT DETECTION SYSTEM",
  description: "Wiress Enviroment detection system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Providers>
        <body className={`${inter.className} antialiased`}>{children}</body>  
      </Providers>
    </html>
  );
}
