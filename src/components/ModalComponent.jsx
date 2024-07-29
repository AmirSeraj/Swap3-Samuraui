/* eslint-disable react/prop-types */
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import CustomButton from "./NextUi/CustomBtn";

const ModalComponent = ({
  isOpen,
  onOpenChange,
  cardInfo,
  onClick,
  isDisabledGo,
  isDisabledCheck,
  handleClickGo,
  size
}) => {
  const handlePress = (onClose) => {
    onClose();
    onClick();
  };

  const handlePressGo = (onClose) => {
    handleClickGo();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      size={size}
      onOpenChange={onOpenChange}
      className="bg-slate-400 rounded-t-3xl border-t-4 border-yellow-300 [box-shadow:5px_3px_25px_4px_rgba(247,255,0,1)]"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex justify-center border-b border-slate-500">
              {cardInfo.icon_lg}
            </ModalHeader>
            <ModalBody>
              <h1 className="text-center font-bold text-2xl">
                {cardInfo.title}
              </h1>
              {!cardInfo.boost && (
                <div className="w-full flex justify-center">
                  <CustomButton
                    className="w-1/3 py-4.5"
                    size="lg"
                    color="primary"
                    onClick={() => handlePressGo(onClose)}
                    radius={"lg"}
                    variant={"shadow"}
                    isDisabled={isDisabledGo}
                  >
                    Go
                  </CustomButton>
                </div>
              )}
              <p className="w-full text-center">{cardInfo.desc}</p>
              <div className="flex items-center justify-center gap-2">
                <img className="w-10 h-10" src="./coin.png" alt="coin" />
                <span className="text-black text-2xl font-bold">
                  {cardInfo.reward === "Free"
                    ? "Free"
                    : Number(cardInfo.reward).toLocaleString()}
                </span>
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
                isDisabled={isDisabledCheck}
              >
                {cardInfo.btn_text}
              </CustomButton>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;
