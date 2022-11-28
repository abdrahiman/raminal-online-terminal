import { FcRight } from "react-icons/fc";

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
}) {
  return (
    <div className="Tab">
      <div className="terminal" style={{ overflowY: "auto" }}>
        <div className="comands">
          {CompilerData &&
            CompilerData.map((ob) => (
              <div key={Math.random()}>
                <div key={Math.random()}>
                  <span>{UserData.displayName}</span>
                  <p className="text-green-700 inline">@raminal.com:$ ~ </p>
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
        {chat != 0 && (
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
          <label htmlFor="com" className="flex flex-row text-green-800">
            <span className="text-green-400">{UserData.displayName}</span>
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
