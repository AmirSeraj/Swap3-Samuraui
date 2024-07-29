import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useData } from "../../components/Context";

export const Refs = [
  {
    title: "invite 1 ",
    reward: 15000,
    threshold: 1,
  },
  {
    title: "invite 3 ",
    reward: 75000,
    threshold: 3,
  },
  {
    title: "invite 10 ",
    reward: 2000000,
    threshold: 10,
  },
  {
    title: "invite 25 ",
    reward: 7500000,
    threshold: 25,
  },
  {
    title: "invite 100 ",
    reward: 20000000,
    threshold: 100,
  },
  {
    title: "invite 250 ",
    reward: 50000000,
    threshold: 250,
  },
  {
    title: "invite 999 ",
    reward: 999999999,
    threshold: 999,
  },
];

export const Trophies = [
  {
    title: "Wood",
    src: "./Wood.png",
    reward: 5000,
    threshold: 1,
  },
  {
    title: "Metal",
    src: "./Metal.png",
    reward: 50000,
    threshold: 5000,
  },
  {
    title: "Bronze",
    src: "./Bronze.png",
    reward: 10000,
    threshold: 75000,
  },
  {
    title: "Silver",
    src: "./Silver.png",
    reward: 15000,
    threshold: 500000,
  },
  {
    title: "Gold",
    src: "./Gold.png",
    reward: 25000,
    threshold: 2500000,
  },
  {
    title: "Diamond",
    src: "./Diamond.png",
    reward: 35000,
    threshold: 10000000,
  },
];

function ArrowRight() {
  return <MdOutlineKeyboardArrowRight size={24} />;
}

export const Trophy = () => {
  const { league } = useData();
  return (
    <Link
      className="flex flex-row justify-center items-center gap-2"
      to={"/trophy"}
    >
      <div className="w-6 h-6">
        <img
          src={Trophies[league]?.src}
          alt={Trophies[league].title}
          className="object-fill"
        />
      </div>
      {Trophies[league].title}
      <ArrowRight size={24} />
    </Link>
  );
};
