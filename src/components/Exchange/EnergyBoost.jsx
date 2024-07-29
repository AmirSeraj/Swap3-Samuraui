import { useData } from "../Context";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { GiSubmarineMissile } from "react-icons/gi";
import { Link } from "react-router-dom";

const EnergyBoost = () => {
  const { energy, MaxEnergy } = useData();
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex gap-1 items-center">
        <BsFillLightningChargeFill color="yellow" size={22} />
        <div className="flex gap-0.5">
          <span>{energy}</span>
          <span>/</span>
          <span>{MaxEnergy()}</span>
        </div>
      </div>
      <div className="flex gap-1 items-center">
        <GiSubmarineMissile color="yellow" size={22} />
        <Link to={'/boost'}>Boost</Link>
      </div>
    </div>
  );
};

export default EnergyBoost;
