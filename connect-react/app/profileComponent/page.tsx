"use client";
import Nav from "../components/Nav";
import Menu from "../components/Menu";
import Content from "../components/Content"
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();
  const user = session?.user;
  const[classes, setClasses] = useState<Class[]>([DEFAULT]);
  const[currentClass, changeClass] = useState<Class>(DEFAULT);
  console.log(user)
  
  useEffect(() => {
    const fetchClasses = async () => {
        try {
          const response = await fetch(`/api/users/${user?.email}`);
          if(!response.ok) {
              throw new Error("Network response was not ok");
          }
          const items = await response.json();
          let classList = items.results[0].list;
          classList = await Promise.all(classList.map(async (current: string) => {
            try {
              const response = await fetch(`/api/classes/${current}`);
              if(!response.ok) {
                  throw new Error("Network response was not ok");
              }
              const items = await response.json();
              return items.results[0]
            } catch(error) {
              console.log("Error from retrieving class.")
            }
          }));
          classList = classList.filter(function(element) {
            return element !== undefined;
         });
          console.log("Classlist", classList)
          setClasses(classList || [])
          changeClass(classList[0])
        } catch(error) {
          console.log("Error from retrieving classes.")
        }
    }
    if(user) {
      fetchClasses();
    }
  }, [user]);

    const handler = (newClass: Class) => {
      changeClass(newClass)
    }
  
    return (
      <div>
        <Menu classes={classes} handler={handler}/>
        <Nav/>
        <Content current={currentClass}/>
      </div>
    );
  }
  