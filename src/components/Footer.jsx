import { MdCurrencyExchange } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { PiHandCoinsFill } from "react-icons/pi";
import { RiSpeedUpLine } from "react-icons/ri";
import { IoStatsChartOutline } from "react-icons/io5";
import CustomButton from "./NextUi/CustomBtn";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const links = [
  {
    title: "Earn",
    icon: <PiHandCoinsFill size={24} />,
    href: "/earn",
  },
  {
    title: "Exchange",
    icon: <MdCurrencyExchange size={24} />,
    href: "/exchange",
  },
  {
    title: "Friends",
    icon: <FaUserFriends size={24} />,
    href: "/friends",
  },
  {
    title: "Boost",
    icon: <RiSpeedUpLine size={24} />,
    href: "/boost",
  },
  {
    title: "Stats",
    icon: <IoStatsChartOutline size={24} />,
    href: "/stats",
  },
];

const Footer = () => {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  if (path === "/") {
    navigate("/exchange");
  }
  return (
    <div className="w-full h-full place-content-center grid grid-cols-5 xs:gap-0.5 gap-[1px] bg-gradient-to-b border border-gray-200 rounded-xl xs:p-1 p-0.5 items-center">
      {links.map((item, index) => {
        return (
          <Link
            to={item.href}
            key={index}
            className="flex justify-center items-center"
          >
            <CustomButton
              size="sm"
              variant="shadow"
              color={path === item.href ? "primary" : "default"}
              className={
                "flex flex-col items-center justify-center gap-1 h-16 text-xs w-16"
              }
            >
              {item.icon}
              <span className="font-semibold text-[0.8rem]">{item.title}</span>
            </CustomButton>
          </Link>
        );
      })}
    </div>
  );
};

export default Footer;
