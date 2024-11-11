import Link from "next/link";
import styles from "./Item.module.css";

type Class = {
    image: string,
    name: string,
    crn: number,
    classmates: String[]
}
interface ClassProps {
    class: Class;
}

export default function Item(props: ClassProps) {
    return(
        <Link className={styles.link} href={"/"}>{props.class.name}</Link>
    );

}