import './globals.css'
import RootLayout from './rootLayout';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  )
}
