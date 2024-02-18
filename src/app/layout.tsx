import type { Metadata } from "next";
import { Inter } from "next/font/google";
import favicon from "@app/favicon.ico";
import Head from 'next/head';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: {
    icon: '/app/favicon.ico'
  },
  title: "CampusCards",
  description: "Send your student an anonymous loving message",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Head>
        <title>CampusCards - Send your student an anonymous loving message</title>
        <meta name="description" content="Send your student an anonymous loving message" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={inter.className}>{children}</body>
    </>
  );
}
