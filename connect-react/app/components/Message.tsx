import styles from "./Message.module.css";

interface MessageProps {
    sender: String,
    content: String,
    class: Class
}
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

export default function Message(props: MessageProps) {

    return (
        <div className={styles.container}>
            <p className={styles.text}>{props.sender}</p>
            <p className={styles.text}>{props.content}</p>
        </div>
    );
}