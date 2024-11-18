import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Aircall",
  description: "Front-end challenge",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="absolute flex items-center justify-center inset-0">
        <main className="relative w-[376px] h-[666px] z-[100] bg-white rounded-[3px] shadow-[0_0_5px_0_rgba(0,0,0,0.9)]">
          <Header />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
