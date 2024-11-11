
import Link from "next/link";
import styles from "./Nav.module.css";

export default function Nav() {
    return(
    <div className={styles.container}>
        <p className={styles.title}>UGA Connect</p>
        <Link href={"/"}><button className={styles.button}>Log Out</button></Link>
    </div>
    );
}