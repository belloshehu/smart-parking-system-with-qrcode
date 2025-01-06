import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "payment",
  description: "Space reservation payment.",
};

export default function PaymentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="p-5 md:px-40 pb-10">{children}</div>;
}
