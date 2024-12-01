/*
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
    click: (now: Class) => void;
}

export default function Item(props: ClassProps) {
    let handler = () => {
        props.click(props.class);
    }

    return(
        
        <button onClick={handler}>{props.class.name}</button>
    );

}
*/
import Link from "next/link";
import styles from "./Item.module.css";
import Image from "next/image";

type Class = {
    image: string,
    name: string,
    crn: number,
    classmates: String[]
}
type ClassProps = {
    class: Class;
    click?: () => void;
};

export default function Item({ class: cls, click }: ClassProps) {
    return (
        <div className={styles.itemContainer} onClick={click}>
            <img
                src={cls.image}
                alt={`${cls.name} thumbnail`}
                className={styles.classImage}
            />
            <h3>{cls.name}</h3>
            <p>CRN: {cls.crn}</p>
            <p>Classmates: {cls.classmates.join(", ")}</p>
        </div>
    );
}

