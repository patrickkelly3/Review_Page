"use client";
import { useState } from "react";
import Item from "./Item";


type Class = {
    image: string,
    name: string,
    crn: number,
    classmates: String[]
}

const DUMMY: Class = {
    image: "https://media.istockphoto.com/id/506670795/vector/red-apple.jpg?s=612x612&w=0&k=20&c=lF9vQ-kQPv3StsSFND4Okt1yqEO86q2XWFECgn0AqWU=",
    name: "Web Programming",
    crn: 363636,
    classmates: ["Tim", "Bobby", "Joanne"]
}
export default function Content() {
    const[currentClass, changeClass] = useState(DUMMY);

    return(
        <Item class={currentClass}/>
    );
}