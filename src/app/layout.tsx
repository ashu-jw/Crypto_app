import './globals.css';
import Providers from '.././providers';

export const metadata = {
  title: 'My Stock Crypto App',
  description: 'Collect and display real-time price data',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
