import Terminal from "../components/Compiler";
import Bg1 from "../imgs/WallpaperDog-20557573.jpg";
import Bg4 from "../imgs/WallpaperDog-20557556.jpg";
import Bg from "../imgs/WallpaperDog-20557717.jpg";
import Bg3 from "../imgs/WallpaperDog-20557695.jpg";
import Bg2 from "../imgs/WallpaperDog-20557575.jpg";

export default function Home() {
  return (
    <>
      <div className="bg">
        <img src={Bg2} alt="" />
      </div>
      <Terminal />
    </>
  );
}
