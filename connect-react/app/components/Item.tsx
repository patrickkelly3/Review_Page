import Link from "next/link";
import styles from "./Item.module.css";
import Image from "next/image";

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
        <div>
            <Image src={props.class.image} alt={props.class.name} height={32} width={32}></Image>
            <Link className={styles.link} href={"/"}>{props.class.name}</Link>
        </div>
    );

}