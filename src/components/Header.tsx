import Head from 'next/head'
import { Archivo_Black } from 'next/font/google';

const archivo_black = Archivo_Black({ subsets: ['latin'], weight: '400' });
const Header = () => {
  return (
    <>
      <Head>
        <title>Scales Buddy - Learn the notes on the fretboard</title>
        <meta name="description" content="Master the scales on the fretboard. Scale Buddy is here to help you learn the scales in your bass or guitar." />
        <meta property="og:description" content="Master the scales on the fretboard. Scale Buddy is here to help you learn the scales in your bass or guitar." />
        <meta property="twitter:description" content="Master the scales on the fretboard. Scale Buddy is here to help you learn the scales in your bass or guitar." />
        <meta property="og:title" content="Scales Buddy | Master the Scales on Guitar or Bass"></meta>
        <meta property="twitter:title" content="Scales Buddy | Master the Scales on Guitar or Bass"></meta>
        <link rel="icon" href="/favicon.jpg" />
      </Head>
      <header className={`${archivo_black.className} text-gray-900 mb-8 ml-4 mt-4 text-2xl md:text-4xl text-center lg:text-left`}>
        scales buddy
      </header>
    </>
  )
}

export default Header;