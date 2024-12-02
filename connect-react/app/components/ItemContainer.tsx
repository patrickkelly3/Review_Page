/*
import Image from 'next/image';
import styles from "./ItemContainer.module.css";

type Class = {
    image: string,
    name: string,
    crn: number,
    classmates: String[]
}

interface ClassProps {
    class: Class;
}

export default function ItemContainer(props: ClassProps) {
    return(
        <div className={styles.container}>
            <Image className={styles.image}
                src={props.class.image}
                alt={props.class.name} 
                width={100} 
                height={100}
                priority
            />
            <h1>{props.class.name} CRN#{props.class.crn}</h1>
            <header>Classmates:</header>
            <ul>
                {props.class.classmates.map((current, i) => <li key={i}>{current}</li>)}
            </ul>
        </div>
    );
}
*/
import Image from 'next/image';
import styles from "./ItemContainer.module.css";

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
interface ClassProps {
    class: Class;
}

export default function ItemContainer(props: ClassProps) {
    return(
        <div className={styles.container}>
            <Image className={styles.image}
                src={props.class.image}
                alt={props.class.name} 
                width={100} 
                height={100}
                priority
            />
            <h1>{props.class.name} Period: {props.class.period}</h1>
            <div>
                <header>Professor:</header>
                <p>{props.class.professor}</p>
            </div>
        </div>
    );
}