import React, { useEffect, useState, useContext } from "react";
import { LoginAcc, addAcc, auth, googleMe, app } from "./auth";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import Ram from "./Ram";
import Gui from "./Gui";
import DiscContext from "./DiscDir";

const db = getFirestore(app);

const colRef = collection(db, "chat");
const colTodo = collection(db, "todos");
let q = query(colRef, orderBy("createdAt", "asc"), limit(50));
export default function Terminal() {
  let [UserData, setUserData] = useState({ displayName: "...", uid: "geust" });
  let qt = query(colTodo, where("user", "==", UserData.uid));
  let { Tabs, addTab, addTabData, selectTab, Id, deleteTab } =
    useContext(DiscContext);
  let [history, setHistory] = useState([]);
  let [CompilerData, setCompilerData] = useState(Tabs[0].tab);
  let [UserComand, setUserComand] = useState("");
  let [HistoryLast, setHistoryLast] = useState(1);
  let [chat, setChat] = useState(false);
  let [LocaleTodo, setLocaleTodo] = useState(
    JSON.parse(localStorage.getItem("todos")) !== null
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  let [istodo, setshowtodo] = useState(false);
  let [UserTodo, setUserTodo] = useState(false);
  let [auto, setAuto] = useState(-1);
  let [StopInp, setInpStop] = useState(false);
  let [CommandList] = useState([
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
    {
      c: "delete tab",
      des: "delete a tab......(delete tab number:2,0...) ",
    },
  ]);
  useEffect(
    () => localStorage.setItem("todos", JSON.stringify(LocaleTodo)),
    [LocaleTodo]
  );
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(user);
      } else {
        setUserData({ displayName: "geust", uid: "geust" });
      }
    });
  }, [auth]);
  useEffect(() => {
    addTabData(CompilerData);
  }, [CompilerData]);
  let addCompilerData = (p, va) => {
    setCompilerData((prev) => [
      ...prev,
      {
        c: p,
        res: va,
      },
    ]);
  };
  let Compiler = async (v) => {
    setUserComand("Running ...");
    setInpStop(true);
    // space
    if (v.toLowerCase().trim() === "banner") {
      addCompilerData(
        v,
        `
        ██████╗░░█████╗░███╗░░░███╗██╗███╗░░██╗░█████╗░██╗░░░░░
        ██╔══██╗██╔══██╗████╗░████║██║████╗░██║██╔══██╗██║░░░░░
        ██████╔╝███████║██╔████╔██║██║██╔██╗██║███████║██║░░░░░
  ██╔══██╗██╔══██║██║╚██╔╝██║██║██║╚████║██╔══██║██║░░░░░
  ██║░░██║██║░░██║██║░╚═╝░██║██║██║░╚███║██║░░██║███████╗
  ╚═╝░░╚═╝╚═╝░░╚═╝╚═╝░░░░░╚═╝╚═╝╚═╝░░╚══╝╚═╝░░╚═╝╚══════╝`
      );
    }
    // space
    else if (v.toLowerCase().trim() === "help") {
      addCompilerData(v, "");
    }
    // space
    else if (v.toLowerCase().trim() === "auth") {
      addCompilerData(v, UserData.displayName);
    }
    // space
    else if (v.toLowerCase().includes("login")) {
      if (v.split(" ").length === 3) {
        let mes = await LoginAcc(v.split(" ")[1], v.split(" ")[2]);
        addCompilerData(
          v,
          mes.includes("Firebase") ? "⚠️ " + mes.slice(10) : mes
        );
      } else {
        addCompilerData(
          v,
          "⚠️ the syntacs is not correct. login (email.com) (Mypassword)"
        );
      }
    }
    // space
    else if (v.toLowerCase().includes("join")) {
      if (v.split(" ").length === 3) {
        let mes = await addAcc(v.split(" ")[1], v.split(" ")[2]);
        addCompilerData(
          v,
          mes.includes("Firebase") ? "⚠️ " + mes.slice(10) : mes
        );
      } else {
        addCompilerData(
          v,
          "⚠️ the syntacs is not correct. login (email.com) (Mypassword)"
        );
      }
    }
    // space
    else if (v.toLowerCase().trim() === "signout") {
      await signOut(auth);
      addCompilerData(v, "you have signed Out");
      setUserData({ displayName: "guest", uid: "geust" });
      setUserTodo(false);
    }
    // space
    else if (v.toLowerCase().trim() === "chat") {
      let GetData = async () => {
        setChat([{ message: "..." }]);
        try {
          await onSnapshot(q, (snapshot) => {
            let d = [];
            snapshot.docs.map((doc) => {
              return d.push({ ...doc.data(), id: doc.id });
            });
            setChat(d);
          });
        } catch (er) {
          setCompilerData(v, "there an erore please refrech");
        }
      };
      GetData();
      addCompilerData(v, "");
    }
    // space
    else if (v.toLowerCase().trim() === "chat close") {
      setChat(false);
    }
    // space
    else if (v.toLowerCase().trim() === "todos close") {
      setshowtodo(false);
      setUserTodo(false);
    }
    // space
    else if (v.toLowerCase().includes("say")) {
      if (chat) {
        addDoc(colRef, {
          message: v.slice(3),
          createdAt: serverTimestamp(),
          user:
            UserData.displayName !== "geust" ? UserData.displayName : "geust",
        });
      } else {
        addCompilerData(
          v,
          "please open the chat before send a message by type 'chat'"
        );
      }
    }
    // space
    else if (
      v.toLowerCase().includes("todo") &&
      !v.toLowerCase().includes("delete todo") &&
      v.toLowerCase().trim() !== "todos"
    ) {
      if (UserData.uid !== "geust") {
        setshowtodo(false);
        addDoc(colTodo, {
          todo: v.slice(4),
          createdAt: serverTimestamp(),
          user: UserData.uid,
        });
      } else {
        setLocaleTodo((prev) => [
          ...prev,
          {
            todo: v.slice(4),
            createdAt: Date.now(),
            user: 0,
          },
        ]);
      }
      addCompilerData(v, "this todo is added");
      setUserComand("");
    }
    // space
    else if (v.toLowerCase().includes("delete todo")) {
      if (UserData.uid !== "geust") {
        if (
          parseInt(v.split(" ")[2]) <= UserTodo.length &&
          typeof parseInt(v.split(" ")[2]) === "number"
        ) {
          let docRef = doc(db, "todos", UserTodo[+v.split(" ")[2]].id);
          deleteDoc(docRef)
            .then(() => addCompilerData(v, "this todo is deleted"))
            .catch((er) => addCompilerData(v, er.message));
        } else addCompilerData(v, "this number is not valid");
      } else {
        if (
          parseInt(v.split(" ")[2]) <= LocaleTodo.length &&
          typeof parseInt(v.split(" ")[2]) === "number"
        ) {
          setLocaleTodo(
            LocaleTodo.filter((e, i) => i !== parseInt(v.split(" ")[2]))
          );
          addCompilerData(v, "this todo is deleted");
          console.log(LocaleTodo);
        } else addCompilerData(v, "this number is not valid");
      }
    }
    // space
    else if (v.toLowerCase().trim() === "todos") {
      if (UserData.uid !== "geust") {
        let GetData = async () => {
          setUserTodo([{ todo: "..." }]);
          if (LocaleTodo.length !== 0) {
            LocaleTodo.map((t) => {
              addDoc(colTodo, {
                todo: t.todo,
                createdAt: serverTimestamp(),
                user: UserData.uid,
              });
            });
          }
          onSnapshot(qt, (snapshot) => {
            let d = [];
            snapshot.docs.map((doc) => {
              return d.push({ ...doc.data(), id: doc.id });
            });
            setLocaleTodo([]);
            setUserTodo(d);
          });
        };
        GetData();
        addCompilerData(v, "");
      } else {
        setshowtodo(true);
        addCompilerData(v, "");
      }
    }
    // space
    else if (v.toLowerCase().trim() === "do") {
      let res = await fetch("https://www.boredapi.com/api/activity")
        .then((data) => data.json())
        .catch((error) => {
          return {
            activity: error.message,
          };
        });
      addCompilerData(v, res.activity);
    }
    // space
    else if (v.toLowerCase().trim() === "add tab") {
      addTab();
      addCompilerData(v, "the tab was added");
    }
    // space
    else if (v.toLowerCase().includes("select tab")) {
      if (v.split(" ")[2] && typeof parseInt(v.split(" ")[2]) === "number") {
        let mes = selectTab(v.split(" ")[2]);
        setCompilerData([]);
        if (typeof mes === "string") addCompilerData(v, mes);
        else setCompilerData(mes || []);
      } else {
        addCompilerData(v, "please enter a valid number");
      }
    } else if (v.toLowerCase().includes("delete tab")) {
      if (v.split(" ")[2] && typeof parseInt(v.split(" ")[2]) === "number") {
        let mes = deleteTab(v.split(" ")[2]);
        setCompilerData([]);
        if (typeof mes === "string") addCompilerData(v, mes);
        else setCompilerData(mes || []);
      } else {
        addCompilerData(v, "please enter a valid number");
      }
    }
    // space
    else if (v.toLowerCase().trim() === "google") {
      let mes = await googleMe();
      addCompilerData(v, mes);
    }
    // space
    else if (v.toLowerCase().includes("translate")) {
      if (v.split(" ")[2] && v.split(" ")[1]) {
        window.open(
          `https://translate.google.com/?sl=auto&tl=${
            v.split(" ")[2]
          }&tCompilerDatat=${v.split(" ")[1]}&op=translate`,
          "_blank",
          "noopener,noreferrer"
        );
        addCompilerData(v, "the translte page is oppennig ...");
      } else
        addCompilerData(
          v,
          "⚠️ the syntacs is incorrect. translate (tCompilerDatat) (languaege: en,ar...)"
        );
    }
    // space
    else {
      CommandList.filter((c) => c.c.includes(v)).length !== 0
        ? CommandList.filter((c) => c.c.includes(v))[0].c == v
          ? addCompilerData(
              v,
              `the syntacs is incorrect: '${
                CommandList.filter((c) => c.c.includes(v))[0].des
              }' ⚠️`
            )
          : addCompilerData(
              v,
              `Command not found: '${v}' . Did you min '${
                CommandList.filter((c) => c.c.includes(v))[0].c
              } ⚠️'`
            )
        : addCompilerData(
            v,
            `Command not found: '${v}'. Try 'help' to get started. ⚠️`
          );
    }
    setInpStop(false);
    setUserComand("");
  };
  let hanlde = (ev) => {
    Ram(
      ev,
      UserComand,
      setUserComand,
      setAuto,
      history,
      setHistory,
      setHistoryLast,
      addCompilerData,
      HistoryLast,
      chat,
      setCompilerData,
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
      UserData={UserData}
      CommandList={CommandList}
      CompilerData={CompilerData}
      istodo={istodo}
      LocaleTodo={LocaleTodo}
      chat={chat}
      UserTodo={UserTodo}
      UserComand={UserComand}
      setUserComand={setUserComand}
      hanlde={hanlde}
      StopInp={StopInp}
      Tabs={Tabs}
      Id={Id}
      Compiler={Compiler}
    />
  );
}
