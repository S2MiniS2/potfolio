import type { Metadata } from "next";
import "./globals.css";
import { pretendard } from "@/styles/fonts";
import Navbar from "@/components/layout/navbar";

export const metadata = {
  title: "Mini | Frontend Developer",
  description:
    "React, Next.js 기반 프론트엔드 개발자 포트폴리오. 프로젝트와 개발 경험을 소개합니다.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} font-sans antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
