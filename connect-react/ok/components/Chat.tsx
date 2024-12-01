import { FormEvent, useState } from "react";
import Message from "./Message";
import styles from "./Chat.module.css";

type Class = {
    image: string,
    name: string,
    crn: number,
    classmates: String[]
}

interface ClassProps {
    class: Class;
}
type Message = {
    sender: String,
    content: String
}

const DUMMY_MESSAGES = [
    {
        sender: "Tim",
        content: "My name is Tim"
    },
    {
        sender: "Bobby",
        content: "Jet fuel can't melt steel beams"
    }
]

export default function Chat(props: ClassProps) {
    const[messages, addMessage] = useState<Message[]>(DUMMY_MESSAGES);
    const[textarea, changeText] = useState<string>("");

    const handleChange = (event: FormEvent) => {
        event.preventDefault();
        changeText((event.target as HTMLTextAreaElement).value)
    };

    const handleSubmit= (e: FormEvent) => {
        e.preventDefault();
        const newMessage = {
            sender: "Current User",
            content: textarea
        }
        addMessage((current) => {
            return [...current, newMessage]
        })
        changeText("")
    }

    return (
        <div className={styles.chat}>
            {messages.map((current, i) => <Message sender={current.sender} content={current.content} key={i}></Message>)}
            <form className={styles.form} onSubmit={handleSubmit}>
                <textarea className={styles.text} value={textarea} onChange={handleChange}></textarea>
                <button type="submit" className={styles.submit}>Send</button>
            </form>
        </div>
    );
}