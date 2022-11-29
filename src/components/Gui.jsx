import { FcRight } from "react-icons/fc";
import Bg from "../imgs/WallpaperDog-20557717.jpg";
import { motion } from "framer-motion";

export default function Gui({
  UserData,
  CommandList,
  CompilerData,
  istodo,
  LocaleTodo,
  chat,
  UserTodo,
  UserComand,
  setUserComand,
  hanlde,
  StopInp,
  Tabs,
  Id,
  Compiler,
}) {
  return (
    <div className="Tab">
      <nav>
        <div className="btns">
          <button onClick={() => Compiler("add tab")}>add tab</button>
          {Tabs.map((t) => (
            <button
              className={t.id === Id ? "gold" : ""}
              onClick={(e) => Compiler("select tab" + " " + e.target.id)}
              id={t.id}
              key={t.id}
            >
              Tab {t.id}
            </button>
          ))}
        </div>
      </nav>
      <div className="terminal" style={{ overflowY: "auto" }}>
        <motion.div
          className="bg"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
        >
          <img src={Bg} alt="" />
        </motion.div>
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
                  style={{
                    // fontSize: "18px",
                    letterSpacing: "0.1rem",
                    paddingLeft: "0.4rem",
                  }}
                  key={Math.random()}
                >
                  {" "}
                  {ob.c.trim() === "help" ? (
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
                  ) : (
                    ob.res
                  )}
                </div>
              </div>
            ))}
        </div>
        {/* {chat != 0 && ( */}
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
