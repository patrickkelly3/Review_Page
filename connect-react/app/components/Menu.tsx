"use client";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa6";
import styles from "./Menu.module.css";
import Item from "./Item";
import Link from "next/link";

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

interface MenuProps {
    classes: Class[],
    handler: (newClass:Class) => void
}

export default function Menu(props: MenuProps) {
    const [isClicked, changeClick] = useState<Boolean>(false);

    const click = () => {
        changeClick((prev) => !prev);
    };

    console.log("Rendering Menu with items:", props.classes); // Debug: log all classes

    if (isClicked) {
        return (
            <div className={styles.clicked}>
                <FaBars className={styles.icon} onClick={click} />
                <ul className={styles.classList}>
                    {props.classes.map((current, i) => (
                        <li key={parseInt(current._id)}>
                            <Item 
                                class={current} handler={props.handler}
                            />
                        </li>
                    ))}
                    <li>
                        <Link className={styles.link} href={"/addItemComponent"}>
                            + Add New Class
                        </Link>
                    </li>
                </ul>
            </div>
        );
    } else {
        return (
            <div className={styles.clickedoff}>
                <FaBars className={styles.icon} onClick={click} />
            </div>
        );
    }
}



/*
"use client";
import styles from "./Menu.module.css";
import Item from "./Item";
import Link from "next/link";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

type Class = {
    image: string;
    name: string;
    crn: number;
    classmates: string[];
};


const DUMMY: Class[] = [
    {
        image: "https://media.istockphoto.com/id/506670795/vector/red-apple.jpg?s=612x612&w=0&k=20&c=lF9vQ-kQPv3StsSFND4Okt1yqEO86q2XWFECgn0AqWU=",
        name: "Introduction to Programming",
        crn: 363636,
        classmates: ["Tim", "Bobby", "Joanne"]
    },
    {
        image: "data:image/jpeg;base64,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",
        name: "Data Structures",
        crn: 636363,
        classmates: ["Bill", "Susan", "Timmy"]
    },
    {
        image: "data:image/png;base64,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",
        name: "Web Programming",
        crn: 463579,
        classmates: ["Ryan", "Olivia", "Lily"]
    },
]

export default function Menu() {
    const [isClicked, changeClick] = useState(false);
    const [items, setItems] = useState<Class[]>([]);

    async function getClasses() {
        try {
            const response = await fetch("../database_files/api/classes");
            if (!response.ok) {
                throw new Error(`Response Status: ${response.status}`);
            }

            const classes = await response.json();
            setItems(classes.items);
        } catch (error) {
            console.error("Error from getClasses", error);
        }
    }

    const click = () => {
        changeClick((prev) => !prev);
    };

    if (isClicked) {
        return (
            <div className={styles.clicked}>
                <FaBars className={styles.icon} onClick={click} />
                <nav>
                    <ul className={styles.classList}>
                        {DUMMY.map((current, i) => (
                            <li key={i}>
                                <Item
                                    class={current}
                                    click={() => console.log(`Clicked on ${current.name}`)}
                                />
                            </li>
                        ))}
                        <li>
                            <Link className={styles.link} href={"/addItemComponent"}>
                                + Add New Class
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    } else {
        return (
            <div className={styles.clickedoff}>
                <FaBars className={styles.icon} onClick={click} />
            </div>
        );
    }
}
*/