/* eslint-disable react/prop-types */
import { cn } from "../../lib/utils/cn.js";
import EnergyProgress from "../Energy/EnergyProgress.jsx";
import CustomButton from "../NextUi/CustomBtn.jsx";
import { Button } from "../ui/MovingBorders.jsx";

function CardLeagRef({
  key,
  icon,
  title,
  price,
  league_img,
  isLoading,
  onClick,
  claimed,
  energyNow,
  energyLimit,
  loading,
}) {
  return (
    <Button
      key={key}
      borderRadius="1.75rem"
      duration={8000}
      containerClassName={cn(
        `w-full rounded-lg h-30 bg-gradient-to-r from-gray-700 via-gray-600 to-transparent`,
        claimed && 'hidden'
      )}
      className={`w-full flex flex-col justify-between p-2 gap-1 rounded-lg overflow-hidden bg-transparent`}
      claimed={claimed}
    >
      <div className={"w-full px-2 flex gap-1 justify-between items-center"}>
        <div className={"flex items-center gap-2"}>
          {league_img ? (
            <img className={"w-10"} src={icon} alt={title} />
          ) : (
            icon
          )}
          <div className={"flex flex-col justify-center gap-1"}>
            <span className={"text-white text-sm"}>{title}</span>
            <div className={"flex justify-center items-center gap-1"}>
              <img src={"./coin.png"} className={"w-5 h-5"} alt={title} />
              <span className={"text-white"}>
                {Number(price).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        <CustomButton
          size={"sm"}
          onClick={onClick}
          isLoading={isLoading}
          variant={"shadow"}
          color={energyNow < energyLimit ? "default" : "primary"}
          isDisabled={energyNow < energyLimit}
        >
          {loading ? <span className="text-xs">Loading...</span> : "Claim"}
        </CustomButton>
      </div>
      <EnergyProgress
        energyNow={energyNow}
        energyLimit={energyLimit}
        topNotShow={true}
      />
    </Button>
  );
}

export default CardLeagRef;
