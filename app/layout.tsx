import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextUIProvider from "./NextUIProvider";
import { Container } from "@/components/container";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pardy | The Event App",
  description: "Reserve your spot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-transparent`}>
        <NextUIProvider>
          <Container>{children}</Container>
        </NextUIProvider>
      </body>
    </html>
  );
}
