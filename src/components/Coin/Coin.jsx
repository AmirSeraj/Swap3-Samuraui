import { motion } from "framer-motion";
import { useData } from "../Context.jsx";
import { useState } from "react";
import { useEffect } from "react";

function Coin() {
  const { isGuru, clickValue, tap, league } = useData();
  const [texts, setTexts] = useState([]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTexts((prevItems) => {
        return prevItems
          .map((item) => ({
            ...item,
            position: {
              ...item.position,
              y: item.position.y - 8,
            },
            opacity: item.opacity - 0.02,
          }))
          .filter((item) => item.opacity > 0);
      });
    }, 30);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTexts((prevTexts) => prevTexts.slice(1));
    }, 1000);
    return () => clearTimeout(timer);
  }, [texts.length > 0]);

  useEffect(() => {
    setTexts((prevTexts) => prevTexts.slice(1));
  }, [texts.length > 24]);

  return (
    <div
      className={`${
        isGuru() && "animate-gradient"
      } w-[38vh] h-[38vh] bg-slate-400 rounded-full z-40 flex justify-center items-center`}
    >
      <div
        className={
          "w-[35vh] h-[35vh] relative bg-gray-300 rounded-full z-20 flex justify-center items-center " +
          `${
            league === 1
              ? "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#F2D2BD] to-[#FBCEB1]"
              : league === 2
              ? "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#DAA06D] to-[#CD7F32]"
              : league === 3
              ? "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#F88379] to-[#FF7F50]"
              : league === 4
              ? "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#F28C28] to-[#E3963E]"
              : league === 5
              ? "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#ff7400] to-[#ffb805]"
              : "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#ffb805] to-[#ffa505]"
          }`
        }
      >
        <motion.div
          className="w-full h-full flex justify-center items-center"
          whileFocus={{ scale: 1.1 }}
          whileTap={{ scale: 0.85 }}
        >
          <img
            className={"bg-transparent scale-75 z-10"}
            src={
              league === 1
                ? "./trophy/wood.png"
                : league === 2
                ? "./trophy/metal.png"
                : league === 3
                ? "./trophy/bronz.png"
                : league === 4
                ? "./trophy/silver.png"
                : league === 5
                ? "./trophy/gold.png"
                : league === 6 && "./trophy/diamond.png"
            }
          />
          <div
            id="LinkArea"
            onTouchStart={(ev) => {
              ev.preventDefault();
              for (let i = 0; i < ev.targetTouches.length; i++) {
                const tapStatus = tap();
                if (tapStatus) {
                  const { pageX, pageY } = ev.changedTouches[i];
                  const newText = {
                    value: `+${clickValue()}`,
                    position: { x: pageX, y: pageY },
                    opacity: 1,
                  };
                  setTexts((old) => [...old, newText]);
                }
              }
            }}
            className="absolute w-full h-full rounded-full bg-transparent z-20 top-0 right-0"
          />
        </motion.div>
      </div>

      {texts.map((text, index) => (
        <div
          key={index}
          style={{
            color: "#e9e2fb",
            fontSize: "8vw",
            fontWeight: "bold",
            position: "absolute",
            top: text.position.y - 30,
            left: text.position.x,
            padding: "5px",
            zIndex: 9999,
            pointerEvents: "none",
            transition: "opacity 0.5s ease", // Add a smooth fading transition
            opacity: text.opacity,
          }}
        >
          {text.value}
        </div>
      ))}
    </div>
  );
}

export default Coin;
