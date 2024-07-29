import { BsCopy } from "react-icons/bs";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import CustomButton from "../components/NextUi/CustomBtn.jsx";
import { motion } from "framer-motion";
import { useData } from "../components/Context.jsx";
import { useState } from "react";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { BsPersonHearts } from "react-icons/bs";
import { TONConnect } from "../components/Ton/TONConnect.jsx";
import AdsModal from "../components/AdsModal.jsx";

const Friends = () => {
  const { referrals } = useData();
  // const initData = useInitData();
  // const refLink = "t.me/spacexswapbot?start=" + initData.user.id;
  const refLink = "t.me/spacexswapbot?start=";
  const [copy, setCopy] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(refLink).then(() => {
      setCopy(true);
    });
  };
  return (
    <div
      className={
        "flex flex-col p-5 gap-2 items-center w-full h-full min-h-[100%] relative"
      }
    >
      <TONConnect />
      <h1 className={"text-white font-bold text-3xl mt-2"}>Invite friends!</h1>
      <p className={"text-sm text-white mt-2"}>
        You and your friend will receive bonuses.
      </p>

      <p className="text-sm text-black mt-5 text-center">
        {"As they join the game, you'll be rewarded with "}
        <b>25K Tokens</b> and{" "}
        <i>2% of their tapping income without any limitation</i>
      </p>

      <div className="flex flex-col items-center gap-3 w-[75%] max-w-screen-md mt-5">
        <span className="text-white text-center font-bold w-auto">
          {referrals === 0
            ? "You Have 0 Friends!!!"
            : "You Have Successfully Invited " + referrals + " Friends"}
        </span>
        <span className="text-white text-center font-bold w-auto">
          {referrals === 0
            ? "Invite your friends and family to earn 25k"
            : "Keep up the good work!!"}
        </span>
        <span className="text-white text-center font-normal w-auto">
          Your Total Referral Rewards:{" "}
          {Number(referrals * 25000).toLocaleString()}
        </span>
      </div>

      {/* <div className={"flex flex-col w-full"}>
        <h1 className={"text-white text-left text-xl mb-2"}>
          List of your friends ({referrals.length})
        </h1>
        <div
          className={
            "flex flex-col gap-1 w-full h-[calc(100vh-440px)] py-1 overflow-scroll"
          }
        >
          {referrals?.map((item) => (
            <div
              key={item.id}
              className={
                "flex items-center gap-3 py-1.5 px-3 rounded-2xl border border-slate-500 shadow-amber-950 shadow-sm bg-gradient-to-r from-slate-500 to-slate-600"
              }
            >
              <BsPersonHearts color={"yellow"} size={28} />
              <div className={"flex flex-col gap-1 justify-center"}>
                <p className={"text-white text-sm"}>{item.name}</p>
                <div className={"flex items-center gap-1"}>
                  <span className={"text-sm text-white"}>{item.league}</span>
                  <span
                    className={
                      "text-sm w-1 h-1 mx-1 rounded-full flex items-center bg-slate-700"
                    }
                  />
                  <div className={"flex items-center gap-2"}>
                    <img
                      src={"./coin.png"}
                      alt={"coin"}
                      className={"w-4 h-4"}
                    />
                    <span className={"text-white text-sm"}>
                      {Number(item.balance).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      <div className={"absolute w-full bottom-2 flex gap-1 px-2"}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className={
            "invitation_link bg-blue-600 flex justify-center gap-2 items-center rounded-xl w-3/4 text-white p-5 h-[60px]"
          }
        >
          <span>Invite a friend</span> <MdOutlinePersonAddAlt color={"white"} />
        </motion.div>
        <CustomButton
          onClick={handleCopy}
          color={"primary"}
          size={"lg"}
          className={
            "bg-blue-600 py-3 flex justify-center items-center rounded-xl w-1/4 h-[60px]"
          }
        >
          {copy ? (
            <IoCheckmarkDoneSharp color={"#000"} size={28} />
          ) : (
            <BsCopy color={"white"} size={30} />
          )}
        </CustomButton>
      </div>
    </div>
  );
};

export default Friends;
