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
            </Head>
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