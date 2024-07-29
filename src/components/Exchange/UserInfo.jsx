import { PiUserCircleCheck } from "react-icons/pi";
import { useData } from "../Context";

const UserInfo = () => {
  const data = useData();
  data.username = 'Mohamad Automation'
  return (
    <div className="w-full flex gap-2 items-center mt-2">
      <PiUserCircleCheck color="#000" size={30} />
      <p className="text-black">{data.username}</p>
    </div>
  );
};

export default UserInfo;
