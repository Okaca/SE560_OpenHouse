import { Nunito } from 'next/font/google';
import './globals.css'
import Navbar from './components/navbar/Navbar';
import ClientOnly from './components/ClientOnly';
import RegisterModal from './components/modals/RegisterModal';
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from './components/modals/LoginModal';
import getCurrentUser from './actions/getCurrentUser';
import RentModal from './components/modals/RentModal';
import SearchModal from './components/modals/SearchModal';
import AuthProvider from './providers/AuthProvider';

export const metadata = {
  title: 'Open House', // TODO: 
  description: 'SE560 Open House Web App', // TODO:
  // Lives in public/ rather than app/: Next 13.3's app/favicon.ico route breaks `next build` on Windows
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH}/favicon.ico` },
}

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <AuthProvider>
        <ClientOnly>
          <ToasterProvider />
          <SearchModal />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly> 
        <div className='pb-20 pt-28'>
          {children}
        </div>
        </AuthProvider>
        </body>
    </html>
  )
}
