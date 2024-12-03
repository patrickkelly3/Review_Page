import { FormEvent, useState, useEffect } from "react";
import Message from "./Message";
import styles from "./Chat.module.css";

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

interface ClassProps {
    class: Class;
}


export default function Chat(props: ClassProps) {
    const[messages, addMessage] = useState<Message[]>(props.class.chat?.messages || []);
    const[textarea, changeText] = useState<string>("");

    const handleChange = (event: FormEvent) => {
        event.preventDefault();
        changeText((event.target as HTMLTextAreaElement).value)
    };

    const handleSubmit= async (e: FormEvent) => {
        e.preventDefault();
        const newMessage = {
            sender: "Current User", 
            content: textarea
        }
        const response = await fetch(`/api/classes/${props.class._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMessage)
        });
        console.log(response)
        addMessage((current) => {
            return [...current, newMessage]
        })
        changeText("")
    }

    return (
        <div className={styles.chat}>
            <div className={styles.messages}>
                {messages.map((current, i) => <Message sender={current.sender} content={current.content} key={i} classChat={props.class}></Message>)}
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <textarea className={styles.text} value={textarea} onChange={handleChange}></textarea>
                <button type="submit" className={styles.submit}>Send</button>
            </form>
        </div>
    );
}