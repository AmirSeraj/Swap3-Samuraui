import Balance from "../components/Balance/Balance.jsx";
import EnergyProgress from "../components/Energy/EnergyProgress.jsx";
import Coin from "../components/Coin/Coin.jsx";
import { useData } from "../components/Context.jsx";
import { useDisclosure } from "@nextui-org/modal";
import { useEffect } from "react";
import ModalComponent from "../components/ModalComponent.jsx";
import { useState } from "react";
import { FcLike } from "react-icons/fc";
import ExchangeTasks from "../components/Exchange/ExchangeTasks.jsx";
import UserInfo from "../components/Exchange/UserInfo.jsx";
import EnergyBoost from "../components/Exchange/EnergyBoost.jsx";
import AdsModal from "../components/AdsModal.jsx";

const Exchange = () => {
  const { earned, setEarned, loaded } = useData();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [cardInfo, setCardInfo] = useState([]);
  const { energy, energyLimit } = useData();

  useEffect(() => {
    if (earned !== 0 && !loaded) {
      setCardInfo({
        title: `While you were out, Bot generated for you`,
        reward: earned,
        icon_lg: <FcLike color="red" size={58} />,
        boost: true,
        btn_text: "Get Coins",
      });
      onOpen();
    }
  }, [earned, loaded]);

  return (
    <>
      <AdsModal />
      <ModalComponent
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClick={() => setEarned(0)}
        cardInfo={cardInfo}
      />
      <div
        className={
          "xs:px-11 px-6 pb-3 pt-2 flex flex-col justify-evenly gap-3 items-center w-full h-full"
        }
      >
        <UserInfo />
        <ExchangeTasks />
        <Balance />
        <EnergyProgress energyNow={energy} energyLimit={energyLimit * 500} />
        <Coin />
        <EnergyBoost />
      </div>
    </>
  );
};

export default Exchange;
