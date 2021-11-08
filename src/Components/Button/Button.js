import { motion, useCycle } from "framer-motion";
import { useState } from "react";

import "./Button.scss";

const Button = ({ button, handleToggle, id = null }) => {
  const [buttonState, cycleButtonState] = useCycle(...button.states);
  const [isOn, setIsOn] = useState(false);

  const handleClick = () => {
    setIsOn(!isOn);
    cycleButtonState();
    handleToggle(buttonState, id);
  };

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
