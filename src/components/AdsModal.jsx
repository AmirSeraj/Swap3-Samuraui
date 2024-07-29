/* eslint-disable react/prop-types */
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import CustomButton from "./NextUi/CustomBtn";
import { FcLike } from "react-icons/fc";
import { useState } from "react";
import { useEffect } from "react";

const AdsModal = () => {
  const [open, setOpen] = useState(true);
  const handlePress = (onClose) => {
    onClose();
  };

  useEffect(() => {
    setTimeout(() => {
        setOpen(false)
    }, 3000);
  }, 3000);

  return (
    <Modal
      placement="center"
      isOpen={open}
      size={"sm"}
      className="bg-slate-400 rounded-t-3xl border-t-4 border-yellow-300 [box-shadow:5px_3px_25px_4px_rgba(247,255,0,1)]"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex justify-center border-b border-slate-500">
              <FcLike color="red" size={58} />
            </ModalHeader>
            <ModalBody>
              <h1 className="text-center font-bold text-2xl">
                Click on Ads to earn +5000 additional coins
              </h1>

              <div className="flex items-center justify-center gap-2">
                <img className="w-10 h-10" src="./coin.png" alt="coin" />
                <span className="text-black text-2xl font-bold">+ 5000</span>
              </div>
            </ModalBody>
            <ModalFooter className="flex flex-col gap-2 justify-center items-center">
              <CustomButton
                className="w-full py-9"
                size="lg"
                color="primary"
                onClick={() => handlePress(onClose)}
                radius={"lg"}
                variant={"shadow"}
              >
                let's click on Ads from now on
              </CustomButton>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AdsModal;
