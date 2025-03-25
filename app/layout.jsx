import { Quicksand } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const quicksand = Quicksand({ subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
 });

export const metadata = {
  title: "Kobby's Portfolio",
  description: "About Gideon and his projects",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Toaster position="top-right" />
      <body className={`${quicksand.variable} antialiased`}>{children}</body>
    </html>
  );
}
