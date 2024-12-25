import Announcement from '@/components/Announcement';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Poppins } from 'next/font/google';
const poppins = Poppins({ weight: ['300', '400', '500', '800'], subsets: ['latin'] });
import "./globals.css";

export const metadata = {
  title: "Experienced Web Developer | Marios Sofokleous",
  description: "Crafting tailored web solutions with a blend of technical expertise in HTML, CSS, JavaScript, and PHP, and a deep understanding of WordPress.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased text-gray-500 text-base`}>
        <Announcement />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
