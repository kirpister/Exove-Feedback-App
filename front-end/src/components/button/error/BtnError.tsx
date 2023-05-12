import React from "react";
import styles from "./btnError.module.css";
interface PropsType {
  callBack: (e?: any) => void;
  name: string;
  data?: any;
}
function BtnError(props: PropsType) {
  const { callBack, name, data } = props;
  return (
    <button className={styles.btn} onClick={() => callBack(data)}>
      {name}
    </button>
  );
}

export default BtnError;
