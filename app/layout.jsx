import { Sora } from 'next/font/google';
const sora = Sora({ subsets: ['latin'] });
import "./globals.css";

export const metadata = {
  title: "Experienced Web Developer | Marios Sofokleous",
  description: "Crafting tailored web solutions with a blend of technical expertise in HTML, CSS, JavaScript, and PHP, and a deep understanding of WordPress.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${sora.className} antialiased text-neutral-500 text-base`}>
        {children}
      </body>
    </html>
  );
}
