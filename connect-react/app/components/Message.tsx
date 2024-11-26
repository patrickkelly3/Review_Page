import styles from "./Message.module.css";

interface MessageProps {
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