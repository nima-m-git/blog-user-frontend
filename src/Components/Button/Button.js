import { motion, useCycle } from "framer-motion";
import { useEffect, useState } from "react";

import "./Button.scss";

const Button = ({ button, setOrder }) => {
  const [buttonState, cycleButtonState] = useCycle(...button.states);
  const [isOn, setIsOn] = useState(false);

  const handleClick = () => {
    setIsOn(!isOn);
    cycleButtonState();
  };

  useEffect(() => {
    setOrder(buttonState);
  }, [buttonState, setOrder]);

  return (
    <motion.div
      layout
      className={`switch ${isOn ? "on" : "off"}`}
      onClick={handleClick}
    >
      <motion.button layout transition={{ ease: "easeOut" }}></motion.button>
      <motion.div
        layout
        transition={{ ease: "easeOut" }}
        className="toggle-text"
      >
        {buttonState}
      </motion.div>
    </motion.div>
  );
};

export default Button;
