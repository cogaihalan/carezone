import type { Metadata } from "next";
import { Poppins, Nunito_Sans } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Carezone - Không gian an toàn cho sinh viên",
  description:
    "Trang web hỗ trợ sinh viên giảm căng thẳng học tập với âm thanh thư giãn và các hoạt động giải tỏa áp lực",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${poppins.variable} ${nunitoSans.variable} antialiased bg-cream-50`}
      >
        {children}
      </body>
    </html>
  );
}
