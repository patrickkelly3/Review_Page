"use client";
import Nav from "../components/Nav";
import Menu from "../components/Menu";
import Content from "../components/Content"
import { useState, useEffect } from "react";

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

const DEFAULT: Class ={
    _id: "0",
    name: "",
    title: "",
    professor: "",
    period: "",
    image: "",
    list: [],
}

export default function Home() {
    const[classes, setClasses] = useState<Class[]>([DEFAULT]);


    useEffect(() => {
      const fetchClasses = async () => {
          try {
            const response = await fetch("/api/classes");
            if(!response.ok) {
                throw new Error("Network response was not ok");
            }
            const items = await response.json();
            console.log(items.classes)
            setClasses(items.classes)
          } catch(error) {
            console.log("Error from retrieving classes.")
          }
      }
      fetchClasses();
  }, []);

    return (
      <div>
        <Menu classes={classes}/>
        <Nav/>
        <Content classes={classes}/>
      </div>
    );
  }
  