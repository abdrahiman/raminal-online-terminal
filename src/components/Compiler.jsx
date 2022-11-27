import React, { useContext, useEffect, useRef, useState } from "react";
import { LoginAcc, addAcc, auth, googleMe, app } from "./auth";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { motion } from "framer-motion";
import Ram from "./Ram";
import Gui from "./Gui";
import DiscContext from "./DiscDir";

const db = getFirestore(app);

const colRef = collection(db, "chat");
const colTodo = collection(db, "todos");
let q = query(colRef, orderBy("createdAt", "asc"), limit(50));
export default function Terminal() {
  let { Tabs, addTab, addTabData, selectTab } = useContext(DiscContext);
  let [history, setHistory] = useState([]);
  let [Ex, setEx] = useState(Tabs[0].tab);
  let [Comand, setComand] = useState("");
  let [Last, setLast] = useState(1);
  let [chat, setChat] = useState(false);
  let [todos, settodos] = useState([]);
  let [istodo, setshowtodo] = useState(false);
  let [todo, setTodo] = useState(false);
  let [auto, setAuto] = useState(-1);
  let [User, setUser] = useState({ displayName: "...", uid: "geust" });
  let [Cms] = useState([
    { c: "auth", des: "return the username if is login.... (auth)" },
    {
      c: "do",
      des: "return a random activity to do if you boring (: ...... (do)",
    },
    {
      c: "delete todo",
      des: "delete a specific todo list ...... (delete todo number:2,0...)",
    },
    {
      c: "translate",
      des: "translte text to any languaege......( translate text:hi languaege:en,es...)",
    },
    { c: "banner", des: "return the banner of the terminal......(banner) " },
    { c: "join", des: "create an account ......(join email.com password) " },
    {
      c: "login",
      des: "login to your account ......(join email.com password) ",
    },
    {
      c: "signout",
      des: "signout from your account ......(signout) ",
    },
    {
      c: "google",
      des: "login or sign up with google ......(google) ",
    },
    {
      c: "todo",
      des: "add a todo list ......(todo text:i will do somthing) ",
    },
    {
      c: "todos",
      des: "show all todo lists ......(todos) ",
    },
    {
      c: "chat",
      des: "show chat messages ......(chat) ",
    },
    {
      c: "chat close",
      des: "hide chat messages ......(chat close) ",
    },
    {
      c: "todos close",
      des: "hide todo lists ......(todos close) ",
    },
    {
      c: "say",
      des: "add a message in the chat ......(say text:hello everyone) ",
    },
    {
      c: "help",
      des: "show commands list ......(help) ",
    },
    {
      c: "add tab",
      des: "add a terminal tab ......(add tab) ",
    },
    {
      c: "select tab",
      des: "navigate to a specific tab ......(select number : 0) ",
    },
    {
      c: "repo",
      des: "navigate to my github reposotory ......(repo) ",
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({ displayName: "geust", uid: "geust" });
      }
    });
  }, [auth]);
  useEffect(() => {
    addTabData(Ex);
  }, [Ex]);
  let addEx = (p, va) => {
    setEx((prev) => [
      ...prev,
      {
        c: p,
        res: va,
      },
    ]);
  };
  let Compiler = async (v) => {
    setComand("Running ...");
    if (v.toLowerCase().trim() === "banner") {
      addEx(
        v,
        `
  ██████╗░░█████╗░███╗░░░███╗██╗███╗░░██╗░█████╗░██╗░░░░░
  ██╔══██╗██╔══██╗████╗░████║██║████╗░██║██╔══██╗██║░░░░░
  ██████╔╝███████║██╔████╔██║██║██╔██╗██║███████║██║░░░░░
  ██╔══██╗██╔══██║██║╚██╔╝██║██║██║╚████║██╔══██║██║░░░░░
  ██║░░██║██║░░██║██║░╚═╝░██║██║██║░╚███║██║░░██║███████╗
  ╚═╝░░╚═╝╚═╝░░╚═╝╚═╝░░░░░╚═╝╚═╝╚═╝░░╚══╝╚═╝░░╚═╝╚══════╝`
      );
    } else if (v.toLowerCase().trim() === "help") {
      addEx(v, "");
    } else if (v.toLowerCase().trim() === "auth") {
      addEx(v, User.displayName);
    } else if (v.toLowerCase().includes("login")) {
      if (v.split(" ").length === 3) {
        let mes = await LoginAcc(v.split(" ")[1], v.split(" ")[2]);
        addEx(v, mes.includes("Firebase") ? "⚠️ " + mes.slice(10) : mes);
      } else {
        addEx(
          v,
          "⚠️ the syntacs is not correct. login (email.com) (Mypassword)"
        );
      }
    } else if (v.toLowerCase().includes("join")) {
      if (v.split(" ").length === 3) {
        let mes = await addAcc(v.split(" ")[1], v.split(" ")[2]);
        addEx(v, mes.includes("Firebase") ? "⚠️ " + mes.slice(10) : mes);
      } else {
        addEx(
          v,
          "⚠️ the syntacs is not correct. login (email.com) (Mypassword)"
        );
      }
    } else if (v.toLowerCase().trim() === "signout") {
      await signOut(auth);
      addEx(v, "you have signed Out");
      setUser({ displayName: "guest", uid: "geust" });
      setTodo(false);
    } else if (v.toLowerCase().trim() === "chat") {
      let GetData = async () => {
        setChat([{ message: "..." }]);
        await onSnapshot(q, (snapshot) => {
          let d = [];
          snapshot.docs.map((doc) => {
            return d.push({ ...doc.data(), id: doc.id });
          });
          setChat(d);
        });
      };
      GetData();
      addEx(v, "");
    } else if (v.toLowerCase().trim() === "chat close") {
      setChat(false);
    } else if (v.toLowerCase().trim() === "todos close") {
      setshowtodo(false);
      setTodo(false);
    } else if (v.toLowerCase().includes("say")) {
      if (chat) {
        addDoc(colRef, {
          message: v.slice(3),
          createdAt: serverTimestamp(),
          user: User.displayName !== "geust" ? User.displayName : "geust",
        });
      } else {
        addEx(v, "please open the chat before send a message by type 'chat'");
      }
    } else if (
      v.toLowerCase().includes("todo") &&
      !v.toLowerCase().includes("delete todo") &&
      v.toLowerCase().trim() !== "todos"
    ) {
      if (User.uid !== "geust") {
        setshowtodo(false);
        addDoc(colTodo, {
          todo: v.slice(4),
          createdAt: serverTimestamp(),
          user: User.uid,
        });
      } else {
        settodos((prev) => [
          ...prev,
          {
            todo: v.slice(4),
            createdAt: Date.now(),
            user: 0,
          },
        ]);
      }
      addEx(v, "this todo is added");
      setComand("");
    } else if (v.toLowerCase().includes("delete todo")) {
      console.log(todos[parseInt(v.split(" ")[2])]);
      if (
        parseInt(v.split(" ")[2]) <= todos.length &&
        typeof parseInt(v.split(" ")[2]) === "number"
      ) {
        settodos(todos.filter((e, i) => i !== parseInt(v.split(" ")[2])));
        addEx(v, "this todo is deleted");
        console.log(todos);
      } else addEx(v, "this number is not valid");
    } else if (v.toLowerCase().trim() === "todos") {
      if (User.uid !== "geust") {
        let GetData = async () => {
          setTodo([{ todo: "..." }]);
          onSnapshot(colTodo, (snapshot) => {
            let d = [];
            snapshot.docs.map((doc) => {
              return d.push({ ...doc.data(), id: doc.id });
            });
            if (todos.length !== 0) {
              todos.map((t) => {
                addDoc(colTodo, {
                  todo: t.todo,
                  createdAt: serverTimestamp(),
                  user: User.uid,
                });
              });
            }
            settodos([]);
            setTodo(d.filter((t) => t.user == User.uid));
          });
        };
        GetData();
        console.log("kk");
        addEx(v, "");
      } else {
        setshowtodo(true);
        addEx(v, "");
      }
    } else if (v.toLowerCase().trim() === "do") {
      let res = await fetch("https://www.boredapi.com/api/activity")
        .then((data) => data.json())
        .catch((error) => {
          return {
            activity: error.message,
          };
        });
      addEx(v, res.activity);
    } else if (v.toLowerCase().trim() === "add tab") {
      addTab();
      addEx(v, "the tab was added");
    } else if (v.toLowerCase().includes("select tab")) {
      if (v.split(" ")[2] && typeof parseInt(v.split(" ")[2]) === "number") {
        let mes = selectTab(v.split(" ")[2]);
        setEx([]);
        if (typeof mes === "string") addEx(v, mes);
        else setEx(mes || []);
      } else {
        addEx(v, "please enter a valid number");
      }
    } else if (v.toLowerCase().trim() === "google") {
      let mes = await googleMe();
      addEx(v, mes);
    } else if (v.toLowerCase().includes("translate")) {
      if (v.split(" ")[2] && v.split(" ")[1]) {
        window.open(
          `https://translate.google.com/?sl=auto&tl=${v.split(" ")[2]}&text=${
            v.split(" ")[1]
          }&op=translate`,
          "_blank",
          "noopener,noreferrer"
        );
        addEx(v, "the translte page is oppennig ...");
      } else
        addEx(
          v,
          "⚠️ the syntacs is incorrect. translate (text) (languaege: en,ar...)"
        );
    } else {
      Cms.filter((c) => c.c.includes(v)).length !== 0
        ? Cms.filter((c) => c.c.includes(v))[0].c == v
          ? addEx(
              v,
              `the syntacs is incorrect: '${
                Cms.filter((c) => c.c.includes(v))[0].des
              } ⚠️'`
            )
          : addEx(
              v,
              `Command not found: '${v}' . Did you min '${
                Cms.filter((c) => c.c.includes(v))[0].c
              } ⚠️'`
            )
        : addEx(v, `Command not found: '${v}'. Try 'help' to get started. ⚠️`);
    }
    setComand("");
  };
  let hanlde = (ev) => {
    Ram(
      ev,
      Comand,
      setComand,
      setAuto,
      history,
      setHistory,
      setLast,
      addEx,
      Last,
      chat,
      setEx,
      auto,
      Compiler
    );
  };
  useEffect(() => {
    if (document.querySelectorAll(".autFeild button")[auto]) {
      let b = document.querySelectorAll(".autFeild button")[auto];
      b.classList.add("gold");
    }
  }, [auto]);
  return (
    <Gui
      User={User}
      Cms={Cms}
      Ex={Ex}
      istodo={istodo}
      todos={todos}
      chat={chat}
      todo={todo}
      Comand={Comand}
      setComand={setComand}
      hanlde={hanlde}
    />
  );
}
