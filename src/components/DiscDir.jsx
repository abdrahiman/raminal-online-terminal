import { useEffect, useState } from "react";
import { createContext } from "react";

let DiscContext = createContext();
export function TabsProvider({ children }) {
  // let [Tabs, setTabs] = useState(
  //   JSON.parse(localStorage.getItem("Tabs")) !== null
  //     ? JSON.parse(localStorage.getItem("Tabs"))
  //     : [{ tab: [], id: 0 }]
  // );
  let [Tabs, setTabs] = useState([{ tab: [], id: 0 }]);
  let [Ids, setIds] = useState([0]);
  let [Id, setId] = useState(0);

  // Storage
  useEffect(() => {
    localStorage.setItem("Tabs", JSON.stringify(Tabs));
  }, [Tabs]);
  let addTabData = (tab) => {
    localStorage.setItem("Tabs", JSON.stringify(Tabs));
    Tabs[Id] = { tab, id: Id };
  };
  let addTab = () => {
    setIds((prev) => [...prev, +Ids.slice(-1) + 1]);
    setTabs((p) => [...p, { tab: [], id: +Ids.slice(-1) + 1 }]);
    console.log(Ids);
  };
  let deleteTab = (id) => {
    if (Ids.includes(+id)) {
      if (+id == 0) {
        return `you can delete the root tab`;
      }
      setIds(Ids.filter((i) => i != id));
      setTabs(Tabs.filter((el) => el.id != id));
      let nids = [];
      Ids.map((i) => {
        if (i > +id) {
          nids.push(i - 1);
        } else if (i < +id) nids.push(i);
      });
      setIds(nids);
      if (+id === Id) setId(+id - 1);
      Tabs.map((el) => (el.id > +id ? (el.id = el.id - 1) : false));
    } else {
      return `this tab does not exist ,your tabs are ${Ids.join(" : ")}`;
    }
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
    <DiscContext.Provider
      value={{ Tabs, deleteTab, addTabData, Id, addTab, selectTab }}
    >
      {children}
    </DiscContext.Provider>
  );
}
export default DiscContext;
