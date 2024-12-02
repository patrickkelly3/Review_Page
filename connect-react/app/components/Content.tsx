"use client";
import { useState } from "react";
import ItemContainer from "./ItemContainer";
import Chat from "./Chat";

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

interface ContentProps {
    current: Class,
}
const DEFAULT: Class ={
    _id: "0",
    name: "",
    title: "",
    professor: "",
    period: "",
    image: "",
    list: [],
}

export default function Content(props: ContentProps) {
    return(
        <div>
            <ItemContainer class={props.current}/>
            <Chat class={props.current}/>
        </div>
    );
}
/*
"use client";
import { useState } from "react";
import ItemContainer from "./ItemContainer";


type Class = {
    image: string,
    name: string,
    crn: number,
    classmates: String[]
}

interface ContentProps {
    currentClass: Class;
}

export default function Content(props: ContentProps) {
    return(
        <ItemContainer class={props.currentClass}/>
    );
}
*/