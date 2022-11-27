const Ram = (
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
) => {
  if (ev.key === "Enter") {
    if (!Comand) return;
    if (document.querySelector(".autFeild .gold")) {
      setComand(document.querySelector(".autFeild .gold").textContent + " ");
      setAuto(-1);
      return;
    }
    setAuto(-1);
    setHistory((prev) => [...prev, Comand]);
    setComand("");
    setLast(1);
    if (
      chat !== false &&
      Comand.toLowerCase().includes("say") === false &&
      Comand.toLowerCase().includes("chat close") === false
    ) {
      addEx(
        Comand,
        "please close the chat for acess to more commands by type 'chat close'"
      );
      return;
    }
    Compiler(Comand);
  } else if (ev.key === "l" && ev.ctrlKey) {
    ev.preventDefault();
    setComand("");
    setEx([]);
  } else if (ev.key === "ArrowUp") {
    ev.preventDefault();
    if (!Comand) {
      if (!history.length || Last > history.length) {
        return;
      }
      let last = history.slice(-Last)[0];
      setComand(last);
      setLast(Last + 1);
    } else {
      if (auto != 0) {
        setAuto(auto - 1);
      }
    }
  } else if (ev.key === "ArrowDown") {
    ev.preventDefault();
    if (!Comand) {
      if (!history.length || Last <= 2) {
        if (Last <= 2) {
          setComand("");
        }
        return;
      }
      setComand(history.slice(-(Last - 2))[0]);
      setLast(Last - 1);
    } else {
      if (auto + 2 <= document.querySelectorAll(".autFeild button").length) {
        setAuto(auto + 1);
      }
    }
  }
};

export default Ram;
