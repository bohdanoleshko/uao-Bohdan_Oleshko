import styles from './Header.module.css'

function Header() {
    return (
        <div className={styles.header_container}>
            <h1 className={styles.header_title}>Event Calendar</h1>
        </div>
    )
}

export default Header
