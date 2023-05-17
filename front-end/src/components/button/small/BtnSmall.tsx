import React from "react";
import styles from "./btnSmall.module.css";
interface PropsType {
  callBack: (e?: any) => void;
  name: any;
  data?: any;
  disabled?: boolean;
}

function BtnSmall(props: PropsType) {
  const { callBack, data, name, disabled } = props;
  return (
    <button
      className={styles.btn}
      onClick={() => callBack(data)}
      disabled={disabled}
    >
      {" "}
      {name}
    </button>
  );
}

export default BtnSmall;
