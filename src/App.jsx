import { useEffect } from "react";
import ScreenLoad from "./components/ScreenLoad";
import HeroSlider from "./components/website/HeroSlider/HeroSlider";
import NavberWeb from "./components/website/Navber/NavberWeb";
import useWebUtils from "./hooks/web/useWebUtils";

const App = () => {
  const webUtils = useWebUtils();
  console.log(webUtils);

  const isScreenLoadVisible =
    webUtils?.loading || webUtils?.data === null || webUtils?.error;

  useEffect(() => {
    if (isScreenLoadVisible) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Cleanup function to ensure no-scroll class is removed when the component unmounts
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isScreenLoadVisible]);

  return (
    <>
      {isScreenLoadVisible && <ScreenLoad />}
      <NavberWeb></NavberWeb>
      <div className="px-2 pt-24">
        <HeroSlider
          data={webUtils?.data?.result}
          categorys={webUtils?.data?.categorys}
          products={webUtils?.data?.products}></HeroSlider>
      </div>
    </>
  );
};

export default App;
