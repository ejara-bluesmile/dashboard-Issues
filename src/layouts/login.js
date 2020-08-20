import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import MainSidebar from "../components/layout/MainSidebar/MainSidebar";
import LoginFooter from "../components/layout/FooterLogin";

const Login = ({ children, noNavbar, noFooter }) => (
  <Container fluid>
    <Row>
      <Col className="main-content p-0" lg="12" md="12" sm="12" tag="main">
        {!noNavbar}
        {children}
        {!noFooter && <LoginFooter />}
      </Col>
    </Row>
  </Container>
);

Login.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool
};

Login.defaultProps = {
  noNavbar: false,
  noFooter: false
};

export default Login;
