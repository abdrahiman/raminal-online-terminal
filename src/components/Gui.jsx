import { FcRight } from "react-icons/fc";
import { AiFillPlusCircle } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import Bg from "../imgs/WallpaperDog-20557717.jpg";
import { motion } from "framer-motion";

export default function Gui({
  UserData,
  CommandList,
  CompilerData,
  istodo,
  LocaleTodo,
  chat,
  Input,
  UserTodo,
  UserComand,
  setUserComand,
  hanlde,
  isDark,
  StopInp,
  Tabs,
  Id,
  Compiler,
}) {
  return (
    <div className="Tab" id={isDark ? "" : "light"}>
      <nav>
        <div className="btns">
          <button
            className="plus flex items-center justify-center"
            onClick={() => Compiler("add tab")}
          >
            <AiFillPlusCircle />
          </button>
          {Tabs.map((t) => (
            <div
              className={
                t.id === Id
                  ? "gold flex items-center flex-row justify-between px-2"
                  : "flex items-center flex-row justify-between px-2"
              }
              id={t.id}
              onClick={(e) => Compiler("select tab " + e.target.id)}
              key={t.id}
            >
              <button className="w-full h-full  pointer-events-none">
                Tab {t.id}
              </button>
              {t.id !== 0 && (
                <button
                  className="delt flex items-center justify-center"
                  onClick={(ev) =>
                    Compiler("delete tab " + ev.target.parentNode.id)
                  }
                >
                  <IoCloseOutline className=" pointer-events-none" />
                </button>
              )}
            </div>
          ))}
        </div>
      </nav>
      <div className="terminal" style={{ overflowY: "auto" }}>
        {/* <div
          className="bg"
        >
          <img src={Bg} alt="" />
        </div> */}
        <div className="comands">
          {CompilerData &&
            CompilerData.map((ob) => (
              <div key={Math.random()}>
                <div key={Math.random()}>
                  <span>{UserData.displayName}</span>
                  <p className="inline">@raminal.com:$ ~ </p>
                  {ob.c}
                </div>
                <div
                  className="px-2"
                  style={
                    ob.c.trim() === "banner"
                      ? { width: "80%", letterSpacing: "0.2rem" }
                      : {}
                  }
                  key={Math.random()}
                >
                  {" "}
                  {ob.c.trim() === "help" && (
                    <div className="help">
                      <h6>Command</h6>
                      <ul>
                        {CommandList.map((c, i) => (
                          <>
                            <li
                              className=" px-4 flex items-center py-2"
                              key={Math.random()}
                            >
                              <FcRight /> {c.c}......{c.des} (
                              <span className=" contents">{i + 1}</span>/
                              {CommandList.length})
                            </li>
                          </>
                        ))}
                      </ul>
                    </div>
                  )}
                  {ob.c.trim() === "banner" && (
                    <>
                      <p
                        className="px-2 bigText"
                        style={{
                          minWidth: "52rem",
                          letterSpacing: "0.2rem",
                          fontSize: "2.5rem",
                        }}
                      >
                        █▀█ ▄▀█ █▀▄▀█ █ █▄░█ ▄▀█ █░░
                        █▀▄ █▀█ █░▀░█ █ █░▀█ █▀█ █▄▄
                        <small
                          style={{
                            fontSize: "1rem",
                          }}
                        >
                          {"   "} v-0.1
                        </small>
                      </p>
                      <div>
                        Type 'help' to see list of available commands.
                        <br /> -- <br />
                        The project is open-source 🎉 type 'repo' to check out
                        the repository.
                        <br /> New 🎉: Try out the new 'theme' command. <br />{" "}
                        --
                      </div>
                    </>
                  )}
                  {ob.res}
                </div>
              </div>
            ))}
        </div>
        {chat && (
          <div className="chat">
            <div>
              {chat.map((c) => (
                <div key={Math.random()}>
                  <span className="user">{c.user}</span> {" : "}
                  {c.message}
                </div>
              ))}
            </div>
          </div>
        )}
        {UserTodo && (
          <div className="todo">
            <div>
              {UserTodo.map((t, i) => (
                <div key={Math.random()}>
                  <span>{i}</span>: {t.todo}
                </div>
              ))}
            </div>
          </div>
        )}
        {istodo && (
          <div className="todo">
            <div>
              {LocaleTodo.map((t, i) => (
                <div key={Math.random()}>
                  {" "}
                  <span>{i}:</span> {t.todo}
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="input flex items-center justify-start flex-row ">
          <label htmlFor="com" className="flex flex-row">
            <span className="">{UserData.displayName}</span>
            @raminal.com:$ <span className="px-2"> ~</span>
          </label>
          <div className="">
            <input
              type="text"
              id="com"
              autoFocus
              ref={Input}
              readOnly={StopInp ? "readOnly" : ""}
              value={UserComand}
              onKeyDown={(ev) => hanlde(ev)}
              onChange={(event) => setUserComand(event.target.value)}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              aria-label="prompt"
            />
            <div className="autFeild flex flex-row gap-4">
              {UserComand
                ? CommandList.filter((c) =>
                    c.c.includes(UserComand.toLowerCase())
                  ).map((el) => (
                    <button
                      key={Math.random() * 2}
                      onClick={(e) => setUserComand(e.target.textContent + " ")}
                    >
                      {el.c}
                    </button>
                  ))
                : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
