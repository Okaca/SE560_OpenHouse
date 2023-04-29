import { Nunito } from 'next/font/google';
import './globals.css'
import Navbar from './components/navbar/Navbar';
import ClientOnly from './components/ClientOnly';
import Modal from './components/models/Modal';

export const metadata = {
  title: 'Open House', // TODO: 
  description: 'SE560 Open House Web App', // TODO: 
}

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <Modal actionLabel="Submit" title='Hello world' isOpen/> 
          <Navbar />
        </ClientOnly> 
        {children}
        </body>
    </html>
  )
}
