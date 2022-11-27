import { useEffect, useState } from "react";
import { createContext } from "react";

let DiscContext = createContext();
export function TabsProvider({ children }) {
  let [Tabs, setTabs] = useState(
    JSON.parse(localStorage.getItem("Tabs")) !== null
      ? JSON.parse(localStorage.getItem("Tabs"))
      : [{ tab: [], id: 0 }]
  );
  let [Ids, setIds] = useState([0]);
  let [Id, setId] = useState(0);

  // Storage
  useEffect(() => {
    localStorage.setItem("Tabs", JSON.stringify(Tabs));
    console.table("i set", JSON.parse(localStorage.getItem("Tabs")));
  }, [Tabs]);
  let addTabData = (tab) => {
    localStorage.setItem("Tabs", JSON.stringify(Tabs));
    Tabs[Id] = { tab, id: Id };
  };
  let addTab = () => {
    setIds((prev) => [...prev, +Ids.slice(-1) + 1]);
    console.log(Ids);
    setTabs((p) => [...p, { tab: [], id: +Ids.slice(-1) + 1 }]);
  };
  let selectTab = (id) => {
    if (Ids.includes(+id)) {
      setId(+id);
      console.log(Tabs[+id].tab);
      return Tabs[+id].tab;
    } else {
      return `this tab does not exist ,your tabs are ${Ids.join(" : ")}`;
    }
  };

  return (
    <DiscContext.Provider value={{ Tabs, addTabData, Id, addTab, selectTab }}>
      {children}
    </DiscContext.Provider>
  );
}
export default DiscContext;
