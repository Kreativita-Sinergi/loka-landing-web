import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';

import '../../globals.css';

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta', display: 'swap' });

export const metadata: Metadata = {
  title: 'Tanya Loka',
  robots: { index: false, follow: false },
};

export default function ChatEmbedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className={`${jakarta.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
