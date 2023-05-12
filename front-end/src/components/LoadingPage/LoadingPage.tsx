import React from "react";
import Spinner from "react-bootstrap/Spinner";
import { useAppSelector } from "../../app/hooks";

const LoadingPage: React.FC = () => {
  const { show } = useAppSelector((state) => state.loading);
  return (
    <div
      style={{
        position: "fixed",
        zIndex: 100,
        top:0,
        height: "100vh",
        width: `100vw`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "var(--pale-pink-color)",
        opacity: 0.5,
        visibility:`${show?'visible':'hidden'}`
      }}
    >
      <Spinner animation="border" role="status" className="center" variant="info">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default LoadingPage;
