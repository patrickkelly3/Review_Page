"use client";
import { useState } from "react";
import { FaBars } from "react-icons/fa6";
import styles from "./Menu.module.css";

export default function Menu() {
    const[isClicked, changeClick] = useState<Boolean>(false);

    const click = () => {
        changeClick((prev) => !prev);
    }

    const CLASSES = ["Web Programming"];

    if(isClicked) {
        return(
            <div className={styles.clicked}>
                <FaBars className={styles.icon} onClick={click}/>
                <ul className={styles.classList}>
                    {CLASSES.map((current, i) => <li>{current}</li>)}
                    <li>+ Add New Class</li>
                </ul>    
            </div>
        );
    } else {
        return(
            <div className={styles.clickedoff}>
                <FaBars className={styles.icon} onClick={click}/>
            </div>
        );
    }
}