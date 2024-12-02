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

type User ={
    id: string,
    username: string,
    email: string,
    password: string,
}

type Class = {
    _id: string,
    name: string,
    title: string,
    professor: string,
    period: string,
    image: string,
    list: User[],
}

type ClassProps = {
    class: Class;
    handler: (newClass:Class) => void;
};

export default function Item({ class: cls, handler }: ClassProps) {
    return (
        <div className={styles.itemContainer} onClick={()=>handler(cls)}>
            <img
                src={cls.image}
                alt={`${cls.name} thumbnail`}
                className={styles.classImage}
            />
            <h3>{cls.name}</h3>
            <p>Period: {cls.period}</p>
        </div>
    );
}

