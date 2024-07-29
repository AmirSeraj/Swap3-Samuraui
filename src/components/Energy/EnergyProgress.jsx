/* eslint-disable react/prop-types */
import { Progress } from "@nextui-org/progress";
import TrophyLevel from "../TrophyLevel.jsx";
import { useData } from "../Context.jsx";

function EnergyProgress({
  topNotShow,
  energyNow,
  energyLimit,
  trophy,
  trophyPrice,
}) {
  const { balance } = useData();
  return (
    <div className={"flex flex-col gap-1 w-full"}>
      {!topNotShow && <TrophyLevel />}
      {trophy && (
        <div className="w-full flex justify-center gap-1 items-center text-slate-500 font-bold">
          <span>{balance}</span>
          <span>/</span>
          <span>{trophyPrice}</span>
        </div>
      )}
      <Progress
        size="md"
        radius="sm"
        classNames={{
          base: "max-w-md",
          track: "drop-shadow-md border border-default",
          indicator:
            "bg-gradient-to-r from-blue-300 via-purple-300 to-green-400",
          label: "tracking-wider font-medium text-default-600",
          value: "text-foreground/60",
        }}
        value={(energyNow / energyLimit) * 100}
        // value={60}
        color={"success"}
      />
    </div>
  );
}

export default EnergyProgress;
