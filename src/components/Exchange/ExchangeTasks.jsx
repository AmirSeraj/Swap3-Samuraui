import { useData } from "../Context";
import SquareItem from "./SquareItem";
import { FaTasks } from "react-icons/fa";
import { VscFlame } from "react-icons/vsc";
import { BsFillLightningChargeFill } from "react-icons/bs";

const ExchangeTasks = () => {
    const data = useData();
    data.taskLeft = false;
    
  return (
    <div className="w-full grid grid-cols-3 gap-1 justify-center items-center">
        <SquareItem href={'/earn'} itemLeft={data.taskLeft} icon={<FaTasks size={28} color={!data.taskLeft ? 'blue' : '#fff'} />} title={'Tasks'} />
        <SquareItem href={'/boost'} itemLeft={data.guruLeft} icon={<VscFlame size={28} color={data.guruLeft === 0 ? 'blue' : '#fff'} />} title={'Guru'} timeLeft={'11h:18m:38s'} />
        <SquareItem href={'/boost'} itemLeft={data.refillLeft} icon={<BsFillLightningChargeFill size={28} color={data.refillLeft === 0 ? 'blue' : '#fff'} />} title={'Full Tank'} timeLeft={'11h:18m:38s'} />
    </div>
  );
};

export default ExchangeTasks;
