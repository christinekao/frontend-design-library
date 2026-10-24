import type { Metadata } from "next";
import "./globals.css";
import "./style001.css";

export const metadata: Metadata = {
  title: "Design Archive — Frontend Design Library",
  description: "Your curated library of UI inspirations, styles and reusable patterns."
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body>{children}</body></html>;
}
