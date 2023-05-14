import React from "react";
import styles from "./btnSucces.module.css";
interface PropsType {
  callBack: (e?: any) => void;
  name: string;
  data?: any;
  width?: string;
  disabled?: boolean;
}
function BtnSuccess(props: PropsType) {
  const { callBack, name, data, width, disabled } = props;
  return (
    <button
      className={styles.btn}
      onClick={() => callBack(data)}
      style={{
        width: `${width ? width + "" : ""}`,
      }}
      disabled={disabled}
    >
      {name}
    </button>
  );
}

export default BtnSuccess;
