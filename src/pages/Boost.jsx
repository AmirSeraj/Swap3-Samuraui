/* eslint-disable no-unused-vars */
import Balance from "../components/Balance/Balance";
import Card from "../components/Card/Card";
import { FaRegHandPeace } from "react-icons/fa";
import { IoMdBatteryCharging } from "react-icons/io";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { useState } from "react";
import { useDisclosure } from "@nextui-org/modal";
import ModalComponent from "../components/ModalComponent";
import { PiRobotBold } from "react-icons/pi";
import { VscFlame } from "react-icons/vsc";
import { useData } from "../components/Context";
import { useNavigate } from "react-router-dom";
import AdsModal from "../components/AdsModal";

export const upgradeMultiPriceList = [
  200, 500, 1000, 5000, 8000, 10000, 25000, 40000, 75000, 100000, 200000,
  300000, 400000, 500000, 700000, 900000, 1000000, 1200000, 1500000, 2000000,
];
export const upgradeLimitPriceList = [
  100, 300, 1000, 3000, 5000, 10000, 15000, 75000, 190000, 225000, 400000,
  700000, 1000000,
];
export const upgradeSpeedPriceList = [5000, 30000, 150000, 400000];
export const upgradeAutoPriceList = [200000];

const Boost = () => {
  const [boostInfo, setBoostInfo] = useState([]);
  const {
    guruLeft,
    refillLeft,
    activateGuru,
    activateRefill,
    multiTap,
    energyLimit,
    energySpeed,
    autoBot,
    setMultiTap,
    setEnergyLimit,
    setEnergySpeed,
    setAutoBot,
    balanceDown,
    balance,
  } = useData();
  const [list, setList] = useState(null);
  const [level, setLevel] = useState(null);
  // const levelRef = useRef(multiTap);

  // const multiListRef = useRef(upgradeMultiPriceList);
  // const energyLimitList = useRef(upgradeLimitPriceList);
  const { onOpen, isOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();

  const handleOpenModal = (boost) => {
    if (boost === "multitap") {
      setLevel(multiTap);
      setList(upgradeMultiPriceList);
      setBoostInfo({
        title: "Upgrading Multi-Tap",
        icon_lg: <FaRegHandPeace size={60} color={"yellow"} />,
        reward: upgradeMultiPriceList[multiTap],
        desc: "Gain +1 point per tap! Upgrade now to increase your coin tapping power!",
        btn_text:
          balance < upgradeMultiPriceList[multiTap]
            ? "Insufficient balance"
            : "Enable now",
        btn_disable: balance < upgradeMultiPriceList[multiTap],
        boost: true,
      });
    }
    if (boost === "energy") {
      setLevel(energyLimit);
      setList(upgradeLimitPriceList);
      setBoostInfo({
        title: "Energy Limit",
        icon_lg: <IoMdBatteryCharging size={60} color={"yellow"} />,
        reward: upgradeLimitPriceList[energyLimit],
        desc: "Increase our energy limit by +500! Upgrade now to expand your energ bank!",
        btn_text:
          balance < upgradeLimitPriceList[energyLimit]
            ? "Insufficient balance"
            : "Enable now",
        btn_disable: balance < upgradeLimitPriceList[energyLimit],
        boost: true,
      });
    }
    if (boost === "recharging_speed") {
      setLevel(energySpeed);
      setList(upgradeSpeedPriceList);
      setBoostInfo({
        title: "Recharging Speed",
        icon_lg: <BsFillLightningChargeFill size={60} color={"yellow"} />,
        reward: upgradeSpeedPriceList[energySpeed],
        desc: `Gain +${energySpeed} energy per second! Upgrade now to boost your energ speed!`,
        btn_text:
          balance < upgradeSpeedPriceList[energySpeed]
            ? "Insufficient balance"
            : "Enable now",
        btn_disable: balance < upgradeSpeedPriceList[energySpeed],
        boost: true,
      });
    }
    if (boost === "bot") {
      setLevel(0);
      setList(upgradeAutoPriceList);
      setBoostInfo({
        title: "Tap Bot",
        icon_lg: <PiRobotBold size={60} color={"yellow"} />,
        reward: upgradeAutoPriceList[0],
        desc: `Gain profit even offline for 12 hours! Confirm to activate and boost our earnings!`,
        btn_text:
          balance < upgradeAutoPriceList[0]
            ? "Insufficient balance"
            : "Enable now",
        btn_disable: balance < upgradeAutoPriceList[0],
        boost: true,
      });
    }
    onOpen();
  };

  const handleDailyBoosters = (daily_booster) => {
    if (daily_booster === "guru") {
      setBoostInfo({
        title: "Guru",
        icon_lg: <VscFlame color={"yellow"} size={60} />,
        desc: "Your taps are worth 5x for 20 seconds!",
        btn_text:
          guruLeft === 0
            ? "Not available now, comeback tomorrow "
            : "Enable now",
        btn_disable: guruLeft === 0,
        reward: "Free",
        boost: true,
      });
      // send and update guru data....
    } else {
      setBoostInfo({
        title: "Refill Tank",
        icon_lg: <BsFillLightningChargeFill color={"yellow"} size={60} />,
        desc: "Instantly fill your energy bar! Upgrade now for a full energy!",
        btn_text:
          guruLeft === 0
            ? "Not available now, comeback tomorrow "
            : "Enable now",
        btn_disable: guruLeft === 0,
        reward: "Free",
        boost: true,
      });
      // send and update full_tank data....
    }
    onOpen();
  };

  const handleActiveBoost = (data) => {
    if (data.title === "Guru") {
      activateGuru();
      navigate("/");
    }
    if (data.title === "Refill Tank") {
      activateRefill();
      navigate("/");
    }
    if (balance >= list[level]) {
      if (data.title === "Upgrading Multi-Tap") {
        balanceDown(list[level]);
        setMultiTap(level + 1);
        setLevel((prevState) => prevState + 1);
      } else if (data.title === "Energy Limit") {
        balanceDown(list[level]);
        setEnergyLimit(level + 1);
      } else if (data.title === "Recharging Speed") {
        balanceDown(list[level]);
        setEnergySpeed(level + 1);
      } else if (data.title === "Tap Bot") {
        balanceDown(list[level]);
        setAutoBot(true);
      }
    }
  };

  return (
    <div className="xs:px-10 px-5 pb-5 pt-14 flex flex-col w-full h-full">
      <AdsModal />
      <Balance />
      <h1 className="text-white mt-6 mb-3 font-bold text-2xl">
        Daily Boosters
      </h1>
      <div className="flex justify-between items-center gap-1">
        {/* Guru */}
        <div
          onClick={() => handleDailyBoosters("guru")}
          className={`${
            guruLeft === 0
              ? "bg-gray-500"
              : "bg-gradient-to-r from-slate-700 to-slate-500"
          } w-1/2 py-1 px-1.5 flex gap-2 border border-slate-600 rounded-lg items-center h-14`}
        >
          <VscFlame color={guruLeft === 0 ? "#ccc" : "yellow"} size={30} />
          <div className="flex flex-col">
            <span
              className={`${
                guruLeft === 0 ? "text-gray-400" : "text-gray-100"
              }`}
            >
              Taping Guru
            </span>
            <span
              className={`${
                guruLeft === 0 ? "text-gray-400 text-sm" : "text-gray-100"
              }`}
            >
              {guruLeft !== 0 && guruLeft + " / " + 3}
            </span>
          </div>
        </div>
        {/* FUll Tank */}
        <div
          onClick={() => handleDailyBoosters("refill_tank")}
          className={`${
            refillLeft === 0
              ? "bg-gray-500"
              : "bg-gradient-to-r from-slate-700 to-slate-500"
          } w-1/2 py-1 px-1.5 flex gap-2 border border-slate-600 rounded-lg items-center h-14`}
        >
          <BsFillLightningChargeFill
            size={30}
            color={refillLeft === 0 ? "#ccc" : "yellow"}
          />
          <div className="flex flex-col">
            <span
              className={`${
                refillLeft === 0 ? "text-gray-400" : "text-gray-100"
              }`}
            >
              Full Tank
            </span>
            <span
              className={`${
                refillLeft === 0 ? "text-gray-400 text-sm" : "text-gray-100"
              }`}
            >
              {refillLeft !== 0 && refillLeft + " / " + 3}
            </span>
          </div>
        </div>
      </div>

      <h1 className="text-white mt-6 mb-3 font-bold text-2xl">Boosters :</h1>

      <div className="flex flex-col gap-1 items-center justify-center w-full">
        {/* Multitap */}

        <Card
          onClick={
            multiTap >= upgradeMultiPriceList.length
              ? () => {}
              : () => handleOpenModal("multitap")
          }
          icon={
            <FaRegHandPeace
              size={28}
              color={
                multiTap >= upgradeMultiPriceList.length ? "#ccc" : "yellow"
              }
            />
          }
          title={"Multitap"}
          reward={
            multiTap === upgradeMultiPriceList.length
              ? upgradeMultiPriceList[multiTap - 1]
              : upgradeMultiPriceList[multiTap]
          }
          claimed={multiTap >= upgradeMultiPriceList.length}
          boosterLevel={
            multiTap === upgradeMultiPriceList.length ? multiTap : multiTap + 1
          }
        />

        {/* Energy limit */}
        <Card
          onClick={
            energyLimit >= upgradeLimitPriceList.length
              ? () => {}
              : () => handleOpenModal("energy")
          }
          icon={
            <IoMdBatteryCharging
              size={28}
              color={
                energyLimit >= upgradeLimitPriceList.length ? "#ccc" : "yellow"
              }
            />
          }
          title={"Energy Limit"}
          reward={
            energyLimit === upgradeLimitPriceList.length
              ? upgradeLimitPriceList[energyLimit - 1]
              : upgradeLimitPriceList[energyLimit]
          }
          claimed={energyLimit >= upgradeLimitPriceList.length}
          boosterLevel={
            energyLimit === upgradeLimitPriceList.length
              ? energyLimit
              : energyLimit + 1
          }
        />

        {/* Recharging Speed */}
        <Card
          onClick={
            energySpeed >= upgradeSpeedPriceList.length
              ? () => {}
              : () => handleOpenModal("recharging_speed")
          }
          icon={
            <BsFillLightningChargeFill
              size={28}
              color={
                energySpeed >= upgradeSpeedPriceList.length ? "#ccc" : "yellow"
              }
            />
          }
          title={"Recharging Speed"}
          reward={
            energySpeed === upgradeSpeedPriceList.length
              ? upgradeSpeedPriceList[energySpeed - 1]
              : upgradeSpeedPriceList[energySpeed]
          }
          claimed={energySpeed >= upgradeSpeedPriceList.length}
          boosterLevel={
            energySpeed === upgradeSpeedPriceList.length
              ? energySpeed
              : energySpeed + 1
          }
        />

        {/* Tap Bot */}
        <Card
          onClick={autoBot ? () => {} : () => handleOpenModal("bot")}
          icon={<PiRobotBold size={28} color={autoBot ? "#ccc" : "yellow"} />}
          title={"Tap Bot"}
          reward={upgradeAutoPriceList[0]}
          claimed={autoBot}
        />
      </div>

      {/* Modal for tasks(special) */}
      <ModalComponent
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        cardInfo={boostInfo}
        onClick={() => handleActiveBoost(boostInfo)}
        isDisabledCheck={boostInfo.btn_disable}
      />
    </div>
  );
};

export default Boost;
