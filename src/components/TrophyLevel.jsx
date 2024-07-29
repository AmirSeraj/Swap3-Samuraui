import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { useData } from "./Context";
import { Trophies } from "../lib/data/data";

function TrophyLevel() {
  const { league } = useData();

  return (
    <div className={"flex justify-between items-center"}>
      <Link to={"/trophy"} className={"flex justify-center items-center gap-1"}>
        {Trophies[league - 1].title}
        <IoIosArrowForward />
      </Link>
      <div className={"flex justify-center items-center gap-2"}>
        <span className={"text-black"}>Level</span>
        <span className={"text-white"}>
          {league}/{Trophies.length}
        </span>
      </div>
    </div>
  );
}

export default TrophyLevel;
