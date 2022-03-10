import Head from 'next/head';
import styles from './../../styles/Home.module.scss';

const Header = ({settings, manual}) => {
    return (
        <div>
            <Head>
                <title>Scales Buddy - Master the scales on guitar or bass</title>
                <meta name="description" content="Scales & Intervals" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className={styles.header}>
                <div>
                    <div />
                    <div className={styles.title_container}>
                        <a href='/' title='Scales Buddy' className={styles.h1} style={{fontSize : !manual && !settings && '1px', height: !manual && !settings && '0' }}>
                            scales buddy
                        </a>
                    </div>
                    <div />
                </div>
            </header>
        </div>
    )
}

export default Header;