import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "Aircall",
  description: "Front-end challenge",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="absolute flex items-center justify-center inset-0">
        <div className="w-[376px] h-[666px] z-[100] bg-white rounded-[3px] shadow-[0_0_5px_0_rgba(0,0,0,0.9)]">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
