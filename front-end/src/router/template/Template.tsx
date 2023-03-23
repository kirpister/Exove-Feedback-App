import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Outlet } from "react-router-dom";
import Header from "./header/Header";

const Template: React.FC = () => {
  return (
    <Container fluid>
      <Header />
      <Row>
        <Outlet />
      </Row>
      {/* <Footer /> */}
    </Container>
  );
};

export default Template;
