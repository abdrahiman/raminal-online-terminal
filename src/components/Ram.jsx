const Ram = (
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
) => {
  if (ev.key === "Enter") {
    if (!UserComand) return;
    if (document.querySelector(".autFeild .gold")) {
      setUserComand(
        document.querySelector(".autFeild .gold").textContent + " "
      );
      setAuto(-1);
      return;
    }
    setAuto(-1);
    setHistory((prev) => [...prev, UserComand]);
    setUserComand("");
    setHistoryLast(1);
    if (
      chat !== false &&
      UserComand.toLowerCase().includes("say") === false &&
      UserComand.toLowerCase().includes("chat close") === false
    ) {
      addCompilerData(
        UserComand,
        "please close the chat for acess to more commands by type 'chat close'"
      );
      return;
    }
    Compiler(UserComand);
  } else if (ev.key === "l" && ev.ctrlKey) {
    ev.preventDefault();
    setUserComand("");
    setCompilerData([]);
  } else if (ev.key === "ArrowUp") {
    ev.preventDefault();
    if (document.querySelectorAll(".autFeild button").length === 0) {
      if (!history.length || HistoryLast > history.length) {
        return;
      }
      let last = history.slice(-HistoryLast)[0];
      setUserComand(last);
      setHistoryLast(HistoryLast + 1);
    } else {
      if (auto !== 0) {
        setAuto(auto - 1);
      }
    }
  } else if (ev.key === "ArrowDown") {
    ev.preventDefault();
    if (document.querySelectorAll(".autFeild button").length === 0) {
      if (!history.length || HistoryLast <= 2) {
        if (HistoryLast <= 2) {
          setUserComand("");
        }
        return;
      }
      setUserComand(history.slice(-(HistoryLast - 2))[0]);
      setHistoryLast(HistoryLast - 1);
    } else {
      if (auto + 2 <= document.querySelectorAll(".autFeild button").length) {
        setAuto(auto + 1);
      }
    }
  }
};

export default Ram;
