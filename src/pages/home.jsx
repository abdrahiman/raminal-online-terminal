import { React, useState, useEffect, useRef, useContext } from "react";
import { animate, motion } from "framer-motion";
import Terminal from "../components/Compiler";
import Bg1 from "../imgs/WallpaperDog-20557573.jpg";
import Bg4 from "../imgs/WallpaperDog-20557556.jpg";
import Bg from "../imgs/WallpaperDog-20557717.jpg";
import Bg3 from "../imgs/WallpaperDog-20557695.jpg";
import Bg2 from "../imgs/WallpaperDog-20557575.jpg";
import DiscContext from "../components/DiscDir";
export default function Home() {
  let { Tabs } = useContext(DiscContext);
  // let bgs = [Bg, Bg3, Bg2, Bg4, Bg1];
  // let [bg, setbg] = useState(Bg);
  // setInterval(() => setbg(bgs[Math.floor(Math.random() * bgs.length)]), 15000);

  return (
    <>
      <motion.div
        className="bg"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
      >
        <img src={Bg} alt="" />
      </motion.div>
      {/* {Tabs.map((t) => (
        <button>{t.id}</button>
      ))} */}
      <Terminal />
    </>
  );
}
