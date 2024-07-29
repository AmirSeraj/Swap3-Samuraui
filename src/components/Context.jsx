import { useContext, useState } from "react";
import { createContext } from "react";
import { Trophies } from "../lib/data/data";

export const DataContext = createContext();

// eslint-disable-next-line react/prop-types
export const DataProvider = ({ children }) => {
  const [userid, setUserId] = useState(0);
  const [balance, setBalance] = useState(1);
  const [lastBalance, setLastBalance] = useState(0);
  const [league, setLeague] = useState(6);
  const [guru, setGuru] = useState(false);
  const [guruLeft, setGuruLeft] = useState(0);
  const [refillLeft, setRefillLeft] = useState(2);
  const [multiTap, setMultiTap] = useState(19);

  const [energy, setEnergy] = useState(30);
  const [energyLimit, setEnergyLimit] = useState(1);
  const [energySpeed, setEnergySpeed] = useState(1);
  const [autoBot, setAutoBot] = useState(false);
  const [statsTotal, setStatsTotal] = useState(0);
  const [statsTouch, setStatsTouch] = useState(0);
  const [statsTotalPlayer, setStatsTotalPlayer] = useState(0);
  const [statsDailyPlayer, setStatsDailyPlayer] = useState(0);
  const [statsOnline, setStatsOnline] = useState(0);

  const [referrals, setReferrals] = useState([]);
  const [friends, setFriends] = useState([]);
  const [amount, setAmount] = useState(0);
  const [taskClaimed, setTaskClaimed] = useState([]);
  const [fetched, setFetched] = useState(false);

  const [leagueClaimed, setLeagueClaimed] = useState([]);
  const [refClaimed, setRefClaimed] = useState([]);
  const [lastClick, setLastClick] = useState(0);
  const [loading, setLoading] = useState(true);

  const [earned, setEarned] = useState(10);

  const [imgLoad, setImgLoad] = useState(0);

  const [reward, setReward] = useState(0);
  const [updateTime, setUpdateTime] = useState(0);

  const energyInit = (energy_db, time_db, limit, speed) => {
    const now = Number(new Date());
    const diff = Math.trunc((now - time_db) / 1000);
    setEnergy(Math.min(limit * 500, diff * speed + energy_db));
    return Math.min(limit * 500, diff * speed + energy_db);
  };

  const MaxEnergy = () => {
    return Number(energyLimit * 500);
  };

  const LeagueClaimedByUser = (index) => {
    setLeagueClaimed([...leagueClaimed, index]);
  };

  const energyUp = () => {
    setEnergy((prev) => Math.min(MaxEnergy(), prev + getSpeed()));
  };

  const getSpeed = () => {
    return energySpeed;
  };

  const energyTransaction = (value) => {
    if (Number(energy + value) <= MaxEnergy() && Number(energy + value) >= 0) {
      setEnergy(Number(value + energy));
      return true;
    } else if (Number(energy + value) > MaxEnergy()) {
      setEnergy(500);
      return true;
    } else {
      return false;
    }
  };

  const clickValue = () => {
    if (!isGuru()) {
      return multiTap;
    } else {
      return multiTap * 5;
    }
  };

  const isGuru = () => {
    return guru;
  };

  const activateGuru = () => {
    if (guruLeft > 0) {
      setGuru(true);
      setGuruLeft(guruLeft - 1);
      setTimeout(() => setGuru(false), 20000);
    }
  };

  const activateRefill = () => {
    if (refillLeft > 0) {
      setRefillLeft(refillLeft - 1);
      setEnergy(MaxEnergy());
    }
  };

  const balanceUp = (value) => {
    let bl = balance;
    setLastBalance(bl);
    setBalance(value + bl);
  };

  const balanceDown = (value) => {
    setLastBalance(balance);
    setBalance(balance - value);
  };

  const balanceInit = (balance, time_db, bot, speed, energy, energyLimit) => {
    let valueEarned = 0;
    if (bot && energy === energyLimit * 500) {
      const now = Number(new Date());
      const diff = now - time_db;
      const max_earned = Math.trunc((diff * speed) / 1000);
      const maxim = 12 * 60 * 60 * speed;
      valueEarned = Math.min(max_earned, maxim);
    }
    setEarned(valueEarned);
    setBalance(balance + valueEarned);
    setLastBalance(balance + valueEarned);
  };

  const initUpdateTime = (uTime, gur, refi, rewarded) => {
    const c_time = Date.now();
    if (uTime < c_time / 1000) {
      setUpdateTime(
        Math.trunc(c_time / 1000 - ((c_time / 1000) % 86400) + 86400)
      );
      setGuruLeft(3);
      setRefillLeft(3);
      setReward(0);
    } else {
      setReward(rewarded);
      setUpdateTime(uTime);
      setGuruLeft(gur);
      setRefillLeft(refi);
    }
  };

  function tap() {
    if (isGuru()) {
      balanceUp(clickValue());
      const newAmount = amount + clickValue();
      setAmount(newAmount);
      if (newAmount > Trophies[league].threshold) {
        setLeague(league + 1);
      }
      setLastClick(Number(new Date()));
      return true;
    } else {
      if (energyTransaction(-clickValue())) {
        balanceUp(clickValue());
        const newAmount = amount + clickValue();
        setAmount(newAmount);
        if (amount > Trophies[league].threshold) {
          setLeague(league + 1);
        }
        setLastClick(Number(new Date()));
        return true;
      }
    }
    return false;
  }

  function botUp() {
    if (energyLimit * 500 === energy) {
      balanceUp(energySpeed);
      setAmount(amount + energySpeed);
    }
  }

  function upImgLoad() {
    setImgLoad(imgLoad + 1);
  }
  const [loaded, setLoaded] = useState(false);

  const values = {
    balanceUp,
    balanceDown,
    loaded,
    setLoaded,
    balanceInit,
    setGuruLeft,
    setRefillLeft,
    lastBalance,
    energyInit,
    balance,
    league,
    setLeague,
    userid,
    setUserId,
    isGuru,
    activateGuru,
    activateRefill,
    guruLeft,
    fetched,
    setFetched,
    setBalance,
    refillLeft,
    multiTap,
    earned,
    setEarned,
    setMultiTap,
    clickValue,
    energy,
    setEnergy,
    energyLimit,
    setEnergyLimit,
    energyTransaction,
    energySpeed,
    setEnergySpeed,
    tap,
    lastClick,
    setLastClick,
    MaxEnergy,
    imgLoad,
    setImgLoad,
    upImgLoad,
    autoBot,
    botUp,
    energyUp,
    setAutoBot,
    statsTotal,
    setStatsTotal,
    statsTouch,
    setStatsTouch,
    statsTotalPlayer,
    setStatsTotalPlayer,
    statsDailyPlayer,
    setStatsDailyPlayer,
    statsOnline,
    setStatsOnline,
    friends,
    referrals,
    setFriends,
    setReferrals,
    amount,
    setAmount,
    taskClaimed,
    setTaskClaimed,
    leagueClaimed,
    setLeagueClaimed,
    LeagueClaimedByUser,
    refClaimed,
    setRefClaimed,
    loading,
    setLoading,
    guru,
    initUpdateTime,
    reward,
    setReward,
    updateTime,
    setUpdateTime,
  };

  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
};

export const useData = () => {
  return useContext(DataContext);
};
