import React from "react";
import styles from "./btnSucces.module.css";
interface PropsType {
  callBack: (e: any) => void;
  name: string;
  data:any
}
function BtnSuccess(props: PropsType) {
  const { callBack, name,data } = props;
  return (
    <button className={styles.btn} onClick={()=>callBack(data)}>
      {name}
    </button>
  );
}

export default BtnSuccess;
