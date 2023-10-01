import "./globals.css";
import type { Metadata } from "next";
import { Inter, Alegreya } from "next/font/google";
import { Providers } from "./GlobalRedux/provider";
import { Header } from "./components/Header";
import { usePathname } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });
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
      <Providers>
        <body className={`overflow-x-clip ${algereya.className}`}>
          <Header />
          {children}
        </body>
      </Providers>
    </html>
  );
}
