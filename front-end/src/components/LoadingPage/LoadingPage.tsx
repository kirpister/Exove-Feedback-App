import React from "react";
import Spinner from "react-bootstrap/Spinner";

const LoadingPage: React.FC = () => {
  return (
    <Spinner animation="border" role="status" className="center" variant="info">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default LoadingPage;
