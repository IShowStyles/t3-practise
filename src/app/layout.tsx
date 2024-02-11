import '~/styles/globals.css';

import { Inter } from 'next/font/google';

import { TRPCReactProvider } from '~/trpc/react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'LikePizza ',
  description: 'Like Pizza',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta name='google-site-verification' content='WQCEkvzvRCZ1IFQfHuvJ0pkyF5ANkeJViDJJxepIbrU' />
      </head>
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>
          <main>{children}</main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
