import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clinique de Totsi",
  description: "Bienvenue à la Clinique de Totsi",
  icons: {
    icon: '../imgs/Clinique - croix.png',
    shortcut: '../imgs/Clinique - croix.png',
    apple: '../imgs/Clinique - croix.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

// import type { Metadata } from "next";
// import { ReactNode } from "react";
// import Navigation from "../components/Navigation";
// import "./globals.css"; // si tu utilises Tailwind ou styles globaux

// export const metadata: Metadata = {
//   title: "Clinique de Totsi",
//   description: "Bienvenue à la Clinique de Totsi",
// };

// interface LayoutProps {
//   children: ReactNode;
//   header?: ReactNode;
// }

// export default function RootLayout({ children, header }: LayoutProps) {
//   return (
//     <html lang="fr">
//       <body className="min-h-screen bg-gray-100">
//         <Navigation />

//         {header && (
//           <header className="bg-white shadow">
//             <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//               {header}
//             </div>
//           </header>
//         )}

//         <main>{children}</main>
//       </body>
//     </html>
//   );
// }
