import Head from 'next/head';
import styles from './../styles/Home.module.scss';
import Link from 'next/link';

const Header = ({settings, manual}) => {
    return (
        <div>
            <Head>
                <title>Scales Buddy - Master the Scales on Guitar or Bass</title>
                <meta name="description" content="Scales & Intervals" />
                <link rel="icon" href="/favicon.jpg" />
                <script async src="https://www.googletagmanager.com/gtag/js?id=UA-141668348-3"></script>
<script dangerouslySetInnerHTML={{
__html:`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'UA-141668348-3');`
}}/>
<script dangerouslySetInnerHTML={{
    __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-5526R3Q');`
}}/>
            </Head>
            <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5526R3Q"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
            <header className={styles.header}>
                <div>
                    <div />
                    <div className={styles.title_container}>
                        <Link href='/'><a title='Scales Buddy' className={styles.h1} style={{fontSize : !manual && !settings && '1px', height: !manual && !settings && '0' }}>
                            scales buddy</a>
                        </Link>
                    </div>
                    <div />
                </div>
            </header>
        </div>
    )
}

export default Header;