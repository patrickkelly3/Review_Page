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
    chat?: Chat,
    list: User[],
}
type Chat = {
    id: string;
    class: Class;
    messages: Message[];
}

type Message = {
    sender: String,
    content: String
}
  

interface ContentProps {
    current: Class,
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