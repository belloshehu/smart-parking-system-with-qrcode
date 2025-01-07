import "./globals.css";
import type { Metadata } from "next";
import { Alegreya } from "next/font/google";
import { Providers } from "./GlobalRedux/provider";
import { Header } from "./components/Header";
import ToasterContext from "./context/ToasterContext";
import Footer from "./components/Footer";
const algereya = Alegreya({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Smart-parking-system",
  description: "Platform to reserve parking space before your arrival.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`overflow-x-clip ${algereya.className}`}>
        <Providers>
          <Header />
          <ToasterContext />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
