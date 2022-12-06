import React, { useEffect, useRef } from "react";

export default function Input(UserComand, StopInp, hanlde, setUserComand) {
  const inputRef = useRef(null);

  // Focus the input field when the component mounts
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <input
      type="text"
      id="com"
      autoFocus
      ref={inputRef}
      readOnly={StopInp ? "readOnly" : ""}
      value={UserComand}
      onKeyDown={(ev) => hanlde(ev)}
      onChange={(event) => setUserComand(event.target.value)}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      aria-label="prompt"
    />
  );
}
