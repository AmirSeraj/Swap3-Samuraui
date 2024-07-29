import CountUp from "react-countup";
import "./Balance.css"
import {useData} from "../Context.jsx";

export default function Balance() {
    const {balance, lastBalance} = useData();

    return (
        <div className="flex gap-2 items-center justify-center text-black">
            <img className={'w-10'} src={"./coin.png"} alt="coin"/>
            <CountUp duration={0.2} start={lastBalance} className="counter text-black" end={balance}/>
        </div>
    );
}
