import { useEffect } from "react";
import { useData } from "../components/Context";
import { TONConnect } from "../components/Ton/TONConnect";

const Stats = () => {
  const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const {
    statsTotal,
    statsTouch,
    statsTotalPlayer,
    statsDailyPlayer,
    statsOnline,
    setStatsTotal,
    setStatsTouch,
    setStatsTotalPlayer,
    setStatsDailyPlayer,
    setStatsOnline,
  } = useData();

  const totalPlayers = 445624 + Math.trunc(Date.now() / 1503680);
  const onlinePlayers = randomNumberInRange(66000, 75000);
  const dailyPlayers = Math.trunc(totalPlayers / 6.1414325);

  const totalTouchPlayers = Math.trunc(totalPlayers * 6069.7685945);
  const totalSharePlayers = Math.trunc(
    (totalTouchPlayers * 75896524) / 25987589
  );

  useEffect(() => {
    setStatsTotal(totalSharePlayers);
    setStatsTouch(totalTouchPlayers);
    setStatsTotalPlayer(totalPlayers);
    setStatsDailyPlayer(dailyPlayers);
    setStatsOnline(onlinePlayers);
  }, []);

  // eslint-disable-next-line react/prop-types
  const Item = ({ desc, number, icon }) => {
    return (
      <div
        className={
          "flex flex-col gap-2.5 items-center justify-center w-full p-3"
        }
      >
        <p className={"text-black text-sm text-center"}>{desc}</p>
        <div className={"flex justify-center items-center gap-2"}>
          {icon && <img src={"./coin.png"} alt="coin" className={"h-7 w-7"} />}
          <p className={"text-black text-xl"}>
            {Number(number).toLocaleString()}
          </p>
        </div>
      </div>
    );
  };
  return (
    <div
      className={
        "flex flex-col gap-2 w-full h-full pt-5 bg-grid-gray-700/[0.1] relative items-center"
      }
    >
      <TONConnect />
      <Item desc={"Total Share Balance"} number={statsTotal} icon={true} />
      <div className={"w-full h-[0.5px] bg-slate-600 mt-1 mb-2"} />
      <Item desc={"Total Touches"} number={statsTouch} />
      <Item desc={"Total Players"} number={statsTotalPlayer} />
      <Item desc={"Daily Players"} number={statsDailyPlayer} />
      <Item desc={"Players Online"} number={statsOnline} />
    </div>
  );
};

export default Stats;
